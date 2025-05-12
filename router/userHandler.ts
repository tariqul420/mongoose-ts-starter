import express, { Request, Response, Router } from 'express';
import mongoose from 'mongoose';
import { verifyToken } from '../middleware/middleware';
import userSchema from '../schemas/userSchema';

const router: Router = express.Router();
const User = mongoose.model('User', userSchema);

// get a user role
router.get('/role/:email', async (req: Request, res: Response) => {
  try {
    const { email } = req.params;

    const projection = {
      _id: 0,
      role: 1,
    };

    const result = await User.findOne({ email }, projection);
    res.send(result);
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).send({
      error: 'There was a server-side error',
      details: error.message,
    });
  }
});

// post a user
router.post('/post', async (req: Request, res: Response) => {
  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send({
        error: 'Email already exists',
      });
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
router.patch('/update/:email', verifyToken, async (req: Request, res: Response) => {
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
