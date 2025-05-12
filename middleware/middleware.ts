import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import userSchema from '../schemas/userSchema';

const User = mongoose.model('User', userSchema);

interface JwtPayload {
  email: string;
  [key: string]: any;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).send({ error: 'Unauthorized access' });
    return;
  }

  // Verify Token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || '', (error: any, decoded: any) => {
    if (error) {
      res.status(401).send({ error: 'Unauthorized access' });
      return;
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export const verifyAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const email = req?.user?.email;
  if (!email) {
    res.status(401).send({ error: 'Unauthorized access' });
    return;
  }

  try {
    const user = await User.findOne({ email });
    const isAdmin = user?.role === 'admin';

    if (!user || !isAdmin) {
      res.status(403).send({ message: 'Forbidden access. Only admins have access!' });
      return;
    }

    next();
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).send({ error: 'Server error', details: error.message });
  }
};
