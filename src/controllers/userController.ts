import { NextFunction, Request, Response } from 'express';
import User from '../models/userSchema';
// import { IUserRequest } from '../types/userTypes';

export const getUserRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.params;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    res.status(200).json({ role: user.role });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists',
      });
    }

    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json({
      message: 'User created successfully',
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const email = req.params.email;
    const updatedUser = req.body;

    const updateDoc = {
      $set: {
        name: updatedUser?.name,
        photo: updatedUser?.photo,
      },
    };

    await User.updateOne({ email }, updateDoc);

    res.status(200).json({
      message: 'User updated successfully',
    });
  } catch (error) {
    next(error);
  }
};
