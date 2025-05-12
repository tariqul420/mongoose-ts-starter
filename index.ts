const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const userHandler = require('./router/userHandler');
const dbConnect = require('./lib/dbConnect');

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
app.post('/jwt', async (req, res) => {
  try {
    const userInfo = req.body;
    const token = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
    res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      })
      .send({ success: true });
  } catch (err) {
    res.status(500).send({
      error: 'There was a server-side error',
      details: err.message,
    });
  }
});

// Logout route
app.get('/logout', async (req, res) => {
  try {
    res
      .clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        path: '/',
      })
      .send({ success: true });
  } catch (err) {
    res.status(500).send({
      error: 'There was a server-side error',
      details: err.message,
    });
  }
});

// Application routes
app.use('/user', userHandler);

// Default route
app.get('/', (req, res) => {
  res.send('This Server For MyAwesomeApp Website ❤️');
});
