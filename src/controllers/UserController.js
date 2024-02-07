// src/controllers/userController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const User = require('../models/userModel');
const blacklist = require('../middlewares/logoutMiddleware');
const { validateEmail } = require('../utils/validationUtils');

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!validateEmail(email)) {
      return res.sendError('Invalid email format', 400);
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.sendError('User already exists', 400);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.sendSuccess({ ...newUser }, 'User created successfully', 201);
  } catch (error) {
    console.error(error);
    return res.sendError('Internal server error', 500);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!validateEmail(email)) {
      return res.sendError('Invalid email format', 400);
    }

    // Check if user exists
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) {
      res.sendError('Failed to authenticate user', 401);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.sendError('Failed to authenticate user', 401);
    }

    // Generate JWT token
    const token = jwt.sign({ email: user.email }, config.jwtSecret, { expiresIn: '7D' });

    // JSON response with token
    res.sendSuccess({ token }, 'User created successfully', 201);
  } catch (error) {
    console.error(error);
    res.sendError('Internal server error', 500);
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).select(['-password','-__v']);
    if (!user) {
      res.sendError('User not found',404);
    }
    res.sendSuccess(user, "User successfully fetched");
  } catch (error) {
    console.error(error);
    res.sendError('Failed to retrieve user profile');
  }
};

exports.logout = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  blacklist.addToBlacklist(token);
  res.sendSuccess({}, "User successfully logout",202);
};
