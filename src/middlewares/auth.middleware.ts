import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/userSchema';

interface CustomRequest extends Request {
  user?: JwtPayload;
}

export const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).send({ error: 'Unauthorized access' });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET || '',
    ) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Unauthorized access' });
  }
};

export const verifyAdmin = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const email = req?.user?.email;
  if (!email) {
    res.status(401).send({ error: 'Unauthorized access' });
    return;
  }

  try {
    const user = await User.findOne({ email });
    const isAdmin = user?.role === 'admin';

    if (!user || !isAdmin) {
      res
        .status(403)
        .send({ message: 'Forbidden access. Only admins have access!' });
      return;
    }

    next();
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).send({ error: 'Server error', details: error.message });
  }
};
