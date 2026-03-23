const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

//add product
router.post('/add-product', productController.addItem);

//get product by id
router.get('/:id', productController.getProductById);

//get all products
router.get('/', productController.getAllProducts);

module.exports = router;
