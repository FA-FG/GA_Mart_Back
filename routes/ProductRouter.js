const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const middleware = require('../middleware');

// Defining routes for product
router.post('/create', middleware.stripToken, middleware.verifyToken, productController.createProduct);
router.get('/', productController.getAllProducts); 
router.get('/:id', middleware.stripToken, middleware.verifyToken, productController.getProduct);
router.put('/:id', middleware.stripToken, middleware.verifyToken, productController.updateProduct);
router.delete('/:id', middleware.stripToken, middleware.verifyToken, productController.deleteProduct);

module.exports = router;