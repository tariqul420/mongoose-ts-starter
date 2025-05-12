import express, { Request, Response, Router } from 'express';
import mongoose, { Document } from 'mongoose';
import { verifyToken } from '../middleware/middleware';
import userSchema from '../schemas/userSchema';

const router: Router = express.Router();
const User = mongoose.model('User', userSchema);

interface IUserResponse {
  message?: string;
  error?: string;
  details?: string;
  role?: string;
}

interface IUserDocument extends Document {
  id: string;
  name: string;
  email: string;
  role: string;
  photo: string;
}

// get a user role
router.get('/role/:email', async (req: Request, res: Response<IUserResponse>) => {
  try {
    const { email } = req.params;

    const projection = {
      _id: 0,
      role: 1,
    };

    const result = await User.findOne({ email }, projection).lean();
    res.send(result || { error: 'User not found' });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).send({
      error: 'There was a server-side error',
      details: error.message,
    });
  }
});

// post a user
router.post('/post', async (req: Request, res: Response<IUserResponse>): Promise<void> => {
  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      res.status(400).send({
        error: 'Email already exists',
      });
      return;
    }

    // If not, create the new user
    const newUser = new User(req.body);
    await newUser.save();

    res.status(200).send({
      message: 'User inserted successfully!',
    });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).send({
      error: 'There was a server-side error',
      details: error.message,
    });
  }
});

// update a user
router.patch('/update/:email', verifyToken, async (req: Request, res: Response<IUserResponse>): Promise<void> => {
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

    res.status(200).send({
      message: 'User update successfully!',
    });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).send({
      error: 'There was a server-side error',
      details: error.message,
    });
  }
});

export default router;
