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
    const token = jwt.sign(userInfo, config.cookie.tokenSecret, {
      expiresIn: '1d',
    });
    res
      .cookie(config.cookie.tokenName, token, {
        httpOnly: true,
        secure: config.nodeEnv === 'production',
        sameSite: config.nodeEnv === 'production' ? 'none' : 'strict',
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
      .clearCookie(config.cookie.tokenName, {
        httpOnly: true,
        secure: config.nodeEnv === 'production',
        sameSite: config.nodeEnv === 'production' ? 'none' : 'strict',
        path: '/',
      })
      .send({ success: true });
  } catch (error) {
    next(error);
  }
};
