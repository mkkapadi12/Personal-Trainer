const express = require('express');
const router = express.Router();
const adminMiddleware = require('../middlewares/admin.middleware');
const {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  updateAdminProfile,
} = require('../controllers/admin.controller');

//admin register
router.post('/register', registerAdmin);

//admin login
router.post('/login', loginAdmin);

//admin profile
router.get('/profile', adminMiddleware, getAdminProfile);

//update profile
router.put('/update-profile', adminMiddleware, updateAdminProfile);

module.exports = router;
