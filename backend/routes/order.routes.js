const express = require('express');
const adminMiddleware = require('../middlewares/admin.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

const {
  createOrder,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
} = require('../controllers/order.controller');

// orders routes
router.post('/create', authMiddleware, createOrder);
router.get('/', adminMiddleware, getAllOrders);
router.get('/myorders', authMiddleware, getUserOrders);
router.patch('/:id/status', adminMiddleware, updateOrderStatus);

module.exports = router;
