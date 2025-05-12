const express = require('express');
const mongoose = require('mongoose');
const userSchema = require('../schemas/userSchema');
const router = express.Router();
const { verifyToken } = require('../middleware/middleware');

const User = new mongoose.model('User', userSchema);

// get a user role
router.get('/role/:email', async (req, res) => {
  try {
    const { email } = req.params;

    const projection = {
      _id: 0,
      role: 1,
    };

    const result = await User.findOne({ email }, projection);

    res.send(result);
  } catch (err) {
    res.status(500).send({
      error: 'There was a server-side error',
      details: err.message,
    });
  }
});

// post a user
router.post('/post', async (req, res) => {
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
  } catch (err) {
    res.status(500).send({
      error: 'There was a server-side error',
      details: err.message,
    });
  }
});

// update a user
router.patch('update/:email', verifyToken, async (req, res) => {
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
  } catch (err) {
    res.status(500).send({
      error: 'There was a server-side error',
      details: err.message,
    });
  }
});

module.exports = router;
