const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// defining routes for cart
router.post('/create', cartController.createCart);
router.get('/:id', cartController.getCart);


module.exports = router;