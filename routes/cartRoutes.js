const express = require('express')
const router = express.Router()
const {
  getCart,
  addItemToCart,
  removeItemFromCart
} = require('../controllers/cartController')
const { stripToken, verifyToken } = require('../middleware/index')

//router.use(stripToken,verifyToken)
// Route to get or create a cart for the user
router.get('/', stripToken, verifyToken, getCart)

// Route to add an item to the cart
router.post('/add', stripToken, verifyToken, addItemToCart)

// Route to remove an item from the cart
router.post('/remove', stripToken, verifyToken, removeItemFromCart)

module.exports = router
