import dotenv from 'dotenv'
import process from 'process';
dotenv.config()

export const config = {
  baseUrl: process.env.BASE_URL,
  email: process.env.EMAIL,
  password: process.env.PASSWORD, 
};

