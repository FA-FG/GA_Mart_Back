const express = require('express');
const router = express.Router();
const cartController = require('../controllers/CartController');
const middleware = require('../middleware')

// defining routes for cart
// router.post('/create', cartController.createCart);

router.get('/get', 
  middleware.stripToken,
  middleware.verifyToken,
  cartController.getCart);

router.post('/add',
  middleware.stripToken,
  middleware.verifyToken,
  cartController.addToCart);

  router.delete('/remove',
    middleware.stripToken,
    middleware.verifyToken,
    cartController.removeFromCart);
  



module.exports = router;