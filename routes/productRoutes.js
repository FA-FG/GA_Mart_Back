const express = require('express')
const router = express.Router()
const {
  addProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductById
} = require('../controllers/productController')
const { stripToken, verifyToken, adminCheck } = require('../middleware/index')

// Route to add a new product (Admin only)
router.post('/add', stripToken, verifyToken, adminCheck, addProduct)

// Route to update a product (Admin only)
router.put('/:id', stripToken, verifyToken, adminCheck, updateProduct)

// Route to delete a product (Admin only)
router.delete('/:id', stripToken, verifyToken, adminCheck, deleteProduct)

// Route to get all products
router.get('/', getProducts)

// Route to get a product by ID
router.get('/:id', getProductById)

module.exports = router
