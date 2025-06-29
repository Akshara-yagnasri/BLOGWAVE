//routes/user.js
const express = require('express');
const bcrypt = require('bcryptjs');  // Import bcryptjs
const router = express.Router();
const User = require('../models/User');  // Import the User model

// Registration route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input data
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);  // 10 is the number of salt rounds

    // Create a new user with the hashed password
    const newUser = new User({ username, email, password: hashedPassword });

    // Save the user to the database
    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    // More detailed logging to see what part of the code fails
    return res.status(500).json({ 
      message: 'Server error during registration', 
      error: error.message, 
      stack: error.stack 
    });
  }
});

module.exports = router;
