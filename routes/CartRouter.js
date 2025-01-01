const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// defining routes for cart
router.post('/create', cartController.createCart);
router.get('/:id', cartController.getCart);
router.put('/addProduct/:id', cartController.addToCart);

router.put('/removeProduct/:id', cartController.removeProductFromCart);

module.exports = router;