import axios, { AxiosInstance } from 'axios';
import { promises as fs } from 'fs';
import { join } from 'path';
import { config } from '../config/env';
import { Auth } from '../types/types';

export class AuthController {
  private httpClient: AxiosInstance;
  private authFile: string = join(__dirname, '../../auth.json');

  constructor() {
    this.httpClient = axios.create({
      baseURL: config.baseUrl,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async login(): Promise<string> {
    try {
      const response = await this.httpClient.post('/login', {
        email: config.email,
        password: config.password,
      });
      const token: string = response.data.token || response.headers['set-cookie']?.[0];
      if (!token) throw new Error('No token received');
      await fs.writeFile(this.authFile, JSON.stringify({ token }, null, 2));
      return token;
    } catch (error: any) {
      throw new Error(`Login failed: ${error.message}`);
    }
  }

  async getAuthToken(): Promise<string> {
    try {
      const authData: Auth = JSON.parse(await fs.readFile(this.authFile, 'utf-8'));
 
      await this.httpClient.get('/settings', {
        headers: { Authorization: `Bearer ${authData.token}` },
      });
      return authData.token;
    } catch (error: any) {
      console.log('Invalid or missing token, re-authenticating...');
      return await this.login();
    }
  }
}