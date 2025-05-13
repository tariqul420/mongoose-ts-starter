import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import morgan from 'morgan';
import dbConnect from '../lib/dbConnect';
import userHandler from '../router/userHandler';

// Express app initialization
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

// Middleware
const corsOptions = {
  origin: ['http://localhost:5173'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(morgan('dev'));

// Connect to MongoDB
async function startServer() {
  try {
    await dbConnect();
    // Start the server after successful DB connection
    app.listen(port, () => {
      console.log(`☘️  You successfully connected to Server: ${port}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1); // Exit if DB connection fails
  }
}

startServer();

// Create a JWT token
app.post('/jwt', async (req: Request, res: Response) => {
  try {
    const userInfo = req.body;
    const token = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET || '', { expiresIn: '1d' });
    res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      })
      .send({ success: true });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).send({
      error: 'There was a server-side error',
      details: error.message,
    });
  }
});

// Logout route
app.get('/logout', async (_req: Request, res: Response) => {
  try {
    res
      .clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        path: '/',
      })
      .send({ success: true });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).send({
      error: 'There was a server-side error',
      details: error.message,
    });
  }
});

// Application routes
app.use('/user', userHandler);

// Default route
app.get('/', (_req: Request, res: Response) => {
  res.send('This Server For MyAwesomeApp Website ❤️');
});
