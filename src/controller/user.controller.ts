import axios, { AxiosInstance } from 'axios';
import { User } from '../types/types';
import { config } from '../config/env';
// import qs from 'qs';

export class UserController {
  private httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: config.baseUrl,
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
  }

  async getUsers(token: string): Promise<User[]> {
    const response = await this.httpClient.post<User[]>('/api/users', {}, {
      headers: { Cookie: token },
    });
    return response.data;
  }
}