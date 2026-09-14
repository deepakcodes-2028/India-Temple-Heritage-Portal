const express = require('express');
const router = express.Router();
const {
  loginUser,
  getMe,
  logoutUser
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Admin authentication routes
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.post('/logout', logoutUser);

module.exports = router;

