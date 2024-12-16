const express = require('express');
const router = express.Router();
const { upload } = require('../controllers/productController');
const productController = require('../controllers/productController');
const orderController = require('../controllers/orderController');
const userController = require('../controllers/userController');
const authMiddleware = require('../authMiddleware');

// Product routes
router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProductById);
router.post('/products', upload.single('image'), productController.createProductWithImage);
router.put('/products/:id', upload.single('image'), productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

// Order routes
router.get('/user-orders', authMiddleware, orderController.getUserOrders);
router.post('/orders', authMiddleware, orderController.createOrder);

// User routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/users', userController.getUsers);

module.exports = router;
