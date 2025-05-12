import { Schema } from 'mongoose';

interface IUser {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  photo: string;
}

const userSchema = new Schema<IUser>({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ['user', 'admin'],
  },
  photo: {
    type: String,
    required: true,
  },
});

export default userSchema;
