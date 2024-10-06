// routes/api.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const orderController = require('../controllers/orderController');
const menuController = require('../controllers/menuController');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

// Auth routes
router.post('/auth/register', authController.register); // Register a new user
router.post('/auth/login', authController.login); // Log in a user
router.get('/auth/admin-status', auth, authController.getAdminStatus); // Check if user is admin

// Order routes
router.post('/orders', auth, orderController.createOrder); // Create a new order
router.get('/orders', auth, orderController.getUserOrders); // Get orders for the logged-in user
router.get('/orders/all', auth, isAdmin, orderController.getAllOrders); // Get all orders (admin only)
router.get('/orders/date', auth, orderController.getOrdersByDate); // Fetch orders for a specific date
router.get('/orders/report', auth, isAdmin, orderController.generateReport); // Generate report based on date range

// Menu routes
router.get('/menu', menuController.getMenuItems); // Get all menu items
router.get('/menu/category/:category', menuController.getMenuItemsByCategory); // Get menu items by category
router.post('/menu', auth, isAdmin, menuController.addMenuItem); // Add a new menu item
router.put('/menu/:id', auth, isAdmin, menuController.updateMenuItem); // Update an existing menu item
router.delete('/menu/:id', auth, isAdmin, menuController.deleteMenuItem); // Delete a menu item

module.exports = router;