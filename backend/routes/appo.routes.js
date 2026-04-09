const express = require('express');
const appoController = require('../controllers/appo.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');
const router = express.Router();

router.post('/create', authMiddleware, appoController.addAppointment);

router.get(
  '/all-appointments',
  authMiddleware,
  appoController.getAllAppointment,
);

router.get(
  '/all-appointments-admin',
  adminMiddleware,
  appoController.getAllAppointmentAdmin,
);

module.exports = router;
