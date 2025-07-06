import dotenv from 'dotenv';
import { IConfig } from '../types';

dotenv.config();

const config: IConfig = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  cors: {
    origin: ['http://localhost:5173'],
    credentials: true,
  },
  mongodb: {
    uri: process.env.MONGODB_DATABASE_URL as string,
    password: process.env.MONGODB_DATABASE_PASSWORD as string,
  },
  cookie: {
    tokenSecret: process.env.ACCESS_TOKEN_SECRET as string,
    tokenName: process.env.TOKEN_NAME as string,
  },
};

export default config;
