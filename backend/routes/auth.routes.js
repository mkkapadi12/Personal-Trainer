const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

//register route
router.post('/register', authController.registerUser);
//login route
router.post('/login', authController.loginUser);
//profile route
router.get('/profile', authMiddleware, authController.profile);
//update profile route
router.put('/update-profile', authMiddleware, authController.updateProfile);

module.exports = router;
