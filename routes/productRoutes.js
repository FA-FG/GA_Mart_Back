const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const middleware = require('../middleware');

// defining routes for product
router.post('/create', middleware.stripToken, middleware.verifyToken , productController.createProduct);
router.get('/:id', middleware.stripToken, middleware.verifyToken , productController.getProduct);


module.exports = router;