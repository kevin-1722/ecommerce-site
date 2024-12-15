const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/schemas');

exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Log the request body for debugging
    console.log('Register Request Body:', req.body);

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    // Generate token
    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);
    console.log('JWT_SECRET:', process.env.JWT_SECRET);


    // Return user and token
    res.status(201).json({ username: newUser.username, token });
  } catch (error) {
    // Log the error for debugging
    console.error('Registration Error:', error.message);
    res.status(400).json({ error: `Registration failed: ${error.message}` });
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    // Return user and token
    res.json({ username: user.username, token });
  } catch (error) {
    res.status(400).json({ error: 'Login failed' });
  }
};

exports.getUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};
