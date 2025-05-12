import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import userSchema from '../schemas/userSchema';

const User = mongoose.model('User', userSchema);

interface JwtPayload {
  email: string;
  [key: string]: any;
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send({ error: 'Unauthorized access' });
  }

  // Verify Token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || '', (error: any, decoded: any) => {
    if (error) {
      return res.status(401).send({ error: 'Unauthorized access' });
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const email = req?.user?.email;
  if (!email) {
    return res.status(401).send({ error: 'Unauthorized access' });
  }

  try {
    const user = await User.findOne({ email });
    const isAdmin = user?.role === 'admin';

    if (!user || !isAdmin) {
      return res.status(403).send({ message: 'Forbidden access. Only admins have access!' });
    }

    next();
  } catch (err: unknown) {
    const error = err as Error;
    return res.status(500).send({ error: 'Server error', details: error.message });
  }
};
