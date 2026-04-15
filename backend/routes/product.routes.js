const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload.middleware');
const productController = require('../controllers/product.controller');
const adminMiddleware = require('../middlewares/admin.middleware');

//add product
router.post(
  '/add-product',
  upload.array('images', 4),
  adminMiddleware,
  productController.addItem,
);

//get product by id
router.get('/:id', productController.getProductById);

//get all products
router.get('/', productController.getAllProducts);

//update product
router.put(
  '/:id',
  upload.array('images', 4),
  adminMiddleware,
  productController.updateProduct,
);

//delete product
router.delete('/:id', adminMiddleware, productController.deleteProduct);

module.exports = router;
