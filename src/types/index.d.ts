import mongoose from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  photo: string;
  role: 'user' | 'admin';
}

export interface IConfig {
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

export type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};
