const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');
const loggerMiddleware = require('../middlewares/loggerMiddleware');
const { authenticateToken } = require('../middlewares/authMiddleware');
const blacklistMiddleware = require('../middlewares/logoutMiddleware');

// Apply loggerMiddleware to all routes
router.use(loggerMiddleware);

// Routes without authentication
router.post('/signup', UserController.signup);
router.post('/login', UserController.login);

// Routes requiring authentication
router.use(authenticateToken); // Apply authentication middleware to all routes below

// Routes that need blacklist check
router.use(blacklistMiddleware.checkBlacklist); // Apply blacklist check to all routes below
router.get('/profile', UserController.getProfile);
router.get('/logout', UserController.logout);

module.exports = router;
