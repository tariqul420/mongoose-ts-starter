import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const createToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userInfo = req.body;
  const token = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET || '', {
    expiresIn: '1d',
  });
  res
    .cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    })
    .send({ success: true });
  try {
  } catch (error) {
    next(error);
  }
};

export const removeToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res
    .clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      path: '/',
    })
    .send({ success: true });
  try {
  } catch (error) {
    next(error);
  }
};
