import express, { Request, Response, Router } from 'express';
import { verifyToken } from '../middleware/middleware';
import UserModel, { IUser } from '../schemas/userSchema';

const router: Router = express.Router();

interface IUserResponse {
  message?: string;
  error?: string;
  details?: string;
  role?: string;
}

type IUserRequest = Omit<IUser, 'role'> & {
  role?: 'user' | 'admin';
};

// get a user role
router.get('/role/:email', async (req: Request<{ email: string }>, res: Response<IUserResponse>) => {
  try {
    const { email } = req.params;

    const projection = {
      _id: 0,
      role: 1,
    };

    const result = await UserModel.findOne({ email }, projection).lean();
    const response: IUserResponse = result || { error: 'User not found' };
    res.send(response);
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).send({
      error: 'There was a server-side error',
      details: error.message,
    });
  }
});

// post a user
router.post('/post', async (req: Request<{}, {}, IUserRequest>, res: Response<IUserResponse>): Promise<void> => {
  try {
    // Check if email already exists
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      res.status(400).send({
        error: 'Email already exists',
      });
      return;
    }

    // If not, create the new user
    const newUser = new UserModel(req.body);
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
router.patch('/update/:email', verifyToken, async (req: Request<{ email: string }, {}, Partial<IUserRequest>>, res: Response<IUserResponse>): Promise<void> => {
  try {
    const email = req.params.email;
    const updatedUser = req.body;

    const updateDoc = {
      $set: {
        name: updatedUser?.name,
        photo: updatedUser?.photo,
      },
    };

    await UserModel.updateOne({ email }, updateDoc);

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
