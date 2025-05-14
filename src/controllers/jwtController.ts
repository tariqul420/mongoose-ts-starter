import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';

export const createToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userInfo = req.body;
    const token = jwt.sign(userInfo, config.cookie.accessTokenSecret, {
      expiresIn: '1d',
    });
    res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      })
      .send({ success: true });
  } catch (error) {
    next(error);
  }
};

export const removeToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res
      .clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        path: '/',
      })
      .send({ success: true });
  } catch (error) {
    next(error);
  }
};
