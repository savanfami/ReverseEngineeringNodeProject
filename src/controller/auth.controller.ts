import axios, { AxiosInstance } from 'axios';
import { config } from '../config/env';



export class AuthController {
  private httpClient: AxiosInstance;


  constructor() {
    this.httpClient = axios.create({
      baseURL: config.baseUrl,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      withCredentials: true,
    });
  }


async login(): Promise<string | undefined> {
  try {
    console.log('Login process started');
    console.log('Using config:', config);

    const loginPage = await this.httpClient.get('/login');
    const nonce = loginPage.data;

    const formData = {
      nonce,
      username: 'demo@example.org',
      password: 'test',
    };

    const response = await this.httpClient.post('/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Referer: `${config.baseUrl}/login`,
        Origin: config.baseUrl,
      },
    });

  
    const cookieHeader = response.headers['set-cookie'];

    if (cookieHeader) {
      const sessionCookie = cookieHeader.find(cookie => cookie.includes('JSESSIONID'));
      if (sessionCookie) {
        const token = sessionCookie.split(';')[0];
        return token; 
      } else {
        console.error('Session cookie (JSESSIONID) not found');
      }
    } else {
      console.error('No set-cookie header received');
    }
  } catch (err: any) {
    console.error('Login failed ',err);
  }

  return undefined; // fallback if token not returned
}

  // async getAuthenticatedUser(token: string): Promise<User> {
  //   try {

  //     console.log('herererrrrrrrrrrrrrrrrrrrrr')
  //     const getResponse = await this.httpClient.get('/settings/tokens', {
  //       headers: {
  //         Cookie: token,
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //         'Accept': '*/*',
  //       },
  //     });

  //     const $ = load(getResponse.data);
  //     const authData = {
  //       token: token,
  //       access_token: $('input#access_token').val() as string,
  //       openId: $('input#openId').val() as string,
  //       userId: $('input#userId').val() as string,
  //       apiuser: $('input#apiuser').val() as string,
  //       operateId: $('input#operateId').val() as string,
  //       language: $('input#language').val() as string,
  //     };
  //     const timestamp = Math.floor(Date.now() / 1000).toString();
  //     const formData = {
  //       access_token: authData.access_token,
  //       apiuser: authData.apiuser,
  //       language: authData.language,
  //       openId: authData.openId,
  //       operateId: authData.operateId,
  //       timestamp,
  //       userId: authData.userId,
  //       // checkcode
  //     };

  //     const postResponse = await axios.post<User>('https://api.challenge.sunvoy.com/api/settings', formData, {
  //       headers: {
  //         Cookie: token,
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //       },
  //       withCredentials: true,
  //     });
  //     return postResponse.data;
  //   } catch (err: any) {
  //     console.error('auth error',err )
  //   }
  // }
}



