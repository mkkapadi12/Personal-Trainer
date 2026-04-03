const express = require('express');
const router = express.Router();
const adminMiddleware = require('../middlewares/admin.middleware');
const {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
} = require('../controllers/admin.controller');

//admin register
router.post('/register', registerAdmin);

//admin login
router.post('/login', loginAdmin);

//admin profile
router.get('/profile', adminMiddleware, getAdminProfile);

module.exports = router;
