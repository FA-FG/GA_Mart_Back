const express = require('express')
const router = express.Router()
const {
  register,
  login,
  getProfile,
  updateProfile
} = require('../controllers/authController.js')
const { stripToken, verifyToken } = require('../middleware/index.js')

router.post('/register', register)
router.post('/login', login)
router.get(
  '/profile',
  (req, res, next) => {
    console.log('Headers before middleware:', req.headers)
    // Log the headers before middleware
    next()
  },
  stripToken,
  verifyToken,
  getProfile
)
router.put(
  '/profile',
  (req, res, next) => {
    console.log('Headers before middleware:', req.headers)
    // Log the headers before middleware
    next()
  },
  stripToken,
  verifyToken,
  updateProfile
)

module.exports = router
