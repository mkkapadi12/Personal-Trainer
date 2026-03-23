const express = require('express');
const appoController = require('../controllers/appo.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/create', authMiddleware, appoController.addAppointment);

router.get('/all-appointments',authMiddleware,appoController.getAllAppointment);

module.exports = router;
