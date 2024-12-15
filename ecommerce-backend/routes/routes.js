const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const orderController = require('../controllers/orderController');
const userController = require('../controllers/userController');
const authMiddleware = require('../authMiddleware');

// Product routes
router.get('/products', productController.getProducts);
router.post('/products', productController.createProduct);
router.get('/products/:id', productController.getProductById);

// Order routes
router.get('/user-orders', authMiddleware, orderController.getUserOrders);
router.post('/orders', authMiddleware, orderController.createOrder);

// User routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/users', userController.getUsers);

module.exports = router;
