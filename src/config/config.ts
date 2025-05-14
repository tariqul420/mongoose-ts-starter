import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;

  cors: {
    origin: string[];
    credentials: boolean;
  };
  mongodb: {
    uri: string;
    password: string;
  };
  cookie: {
    tokenSecret: string;
    tokenName: string;
  };
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  cors: {
    origin: ['http://localhost:5173'],
    credentials: true,
  },
  mongodb: {
    uri: process.env.MONGODB_DATABASE_URL || '',
    password: process.env.MONGODB_DATABASE_PASSWORD || '',
  },
  cookie: {
    tokenSecret: process.env.ACCESS_TOKEN_SECRET || '',
    tokenName: 'token',
  },
};

export default config;
