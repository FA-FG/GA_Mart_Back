const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// defining routes for user
router.post('/register', userController.registerUser); 
router.post('/login', userController.loginUser);
router.post('/create', userController.createUser);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;