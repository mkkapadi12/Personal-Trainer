const express = require('express');
const router = express.Router();
const { getRecentActivity } = require('../controllers/activity.controller');
const adminAuthMiddleware = require('../middlewares/admin.middleware');

router.get('/recent', adminAuthMiddleware, getRecentActivity);

module.exports = router;
