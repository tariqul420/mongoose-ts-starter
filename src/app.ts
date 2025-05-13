import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import dbConnect from './lib/dbConnect';
import { errorHandler } from './middlewares/errorHandler';
import jwtRoutes from './routes/jwtRoutes';
import userRoutes from './routes/userRoutes';

// // Express app initialization
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(morgan('dev'));

// // Connect to MongoDB
async function startServer() {
  try {
    await dbConnect();
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();

// Routes
app.use('/api/user', userRoutes);
app.use('/api/jwt', jwtRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
