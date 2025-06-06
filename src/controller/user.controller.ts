import axios, { AxiosInstance } from 'axios';
import { User } from '../types/types';
import { config } from '../config/env';

export class UserController {
  private httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: config.baseUrl,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async getUsers(token: string): Promise<User[]> {
    const response = await this.httpClient.get<User[]>('/api/users', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  async getAuthenticatedUser(token: string): Promise<User> {
    const response = await this.httpClient.get<User>('/settings', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
}