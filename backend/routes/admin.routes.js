const express = require('express');
const router = express.Router();
const adminMiddleware = require('../middlewares/admin.middleware');
const {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  updateAdminProfile,
  getAllUsers,
  deleteUser,
} = require('../controllers/admin.controller');

//admin register
router.post('/register', registerAdmin);

//admin login
router.post('/login', loginAdmin);

//admin profile
router.get('/profile', adminMiddleware, getAdminProfile);

//update profile
router.put('/update-profile', adminMiddleware, updateAdminProfile);

//get all users
router.get('/users', adminMiddleware, getAllUsers);

//delete user
router.delete('/users/:id', adminMiddleware, deleteUser);

module.exports = router;
