const express = require('express');
const router = express.Router();
const addressController = require('../controllers/address.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Create a new address
router.post('/create-new', authMiddleware, addressController.createAddress);

// Get all addresses for the user
router.get('/', authMiddleware, addressController.getAddresses);

// Edit an address
router.put('/:id', authMiddleware, addressController.editAddress);

//delete address
router.delete('/:id', authMiddleware, addressController.deleteAddress);

module.exports = router;
