const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Create a new order
router.post('/', authMiddleware, orderController.createOrder);

// Get all orders for the current user
router.get('/', authMiddleware, orderController.getOrders);

// Get all orders (admin only)
router.get('/all', authMiddleware, adminMiddleware, orderController.getAllOrders);

// Get a specific order by ID
router.get('/:id', authMiddleware, orderController.getOrderById);

// Update order status (admin only)
router.put('/:id/status', authMiddleware, adminMiddleware, orderController.updateOrderStatus);

// Get orders for a specific date
router.get('/date', authMiddleware, orderController.getOrdersByDate);

// Generate report (admin only)
router.get('/report', authMiddleware, adminMiddleware, orderController.generateReport);

module.exports = router;
