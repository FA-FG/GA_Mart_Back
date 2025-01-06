const express = require('express')
const router = express.Router()
const {
  createOrder,
  getAllOrders,
  getUserOrders
} = require('../controllers/orderController')
const { stripToken, verifyToken, adminCheck } = require('../middleware/index')

// Route to create an order
router.post('/', stripToken, verifyToken, createOrder)

router.get('/all', stripToken, verifyToken, adminCheck, getAllOrders)

// Route to get user's orders
router.get('/user', stripToken, verifyToken, getUserOrders)

module.exports = router
