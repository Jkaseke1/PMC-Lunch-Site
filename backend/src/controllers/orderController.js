// controllers/orderController.js
const Order = require('../models/Order');
const logger = require('../utils/logger');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { caterer, entree, starch, side, dessert, orderDate } = req.body;
    const newOrder = new Order({
      user: req.user.id,
      caterer,
      entree,
      starch,
      side,
      dessert,
      orderDate: orderDate || new Date()
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    logger.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

// Get orders for the logged-in user
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ orderDate: -1 });
    res.status(200).json(orders);
  } catch (error) {
    logger.error('Error fetching user orders:', error);
    res.status(500).json({ message: 'Error fetching user orders', error: error.message });
  }
};

// Get all orders (admin only)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'email').sort({ orderDate: -1 });
    res.status(200).json(orders);
  } catch (error) {
    logger.error('Error fetching all orders:', error);
    res.status(500).json({ message: 'Error fetching all orders', error: error.message });
  }
};

// Update the status of an order
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    if (!['pending', 'processing', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.status(200).json(updatedOrder);
  } catch (error) {
    logger.error('Error updating order status:', error);
    res.status(500).json({ message: 'Error updating order status', error: error.message });
  }
};

// Get orders for a specific date
exports.getOrdersByDate = async (req, res) => {
  try {
    const { date } = req.query; // Expecting date in YYYY-MM-DD format
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const orders = await Order.find({
      user: req.user.id,
      orderDate: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    }).sort({ orderDate: -1 });

    res.status(200).json(orders);
  } catch (error) {
    logger.error('Error fetching orders by date:', error);
    res.status(500).json({ message: 'Error fetching orders by date', error: error.message });
  }
};

// Generate a report based on date range with optional caterer filter
exports.generateReport = async (req, res) => {
  try {
    const { startDate, endDate, caterer } = req.query;
    
    // Validate date inputs
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Start date and end date are required.' });
    }

    const filter = {
      orderDate: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    };

    // Add caterer filter if provided
    if (caterer) {
      filter.caterer = caterer;
    }

    const orders = await Order.find(filter).populate('user', 'email');

    // Log the orders to check if they are being fetched correctly
    console.log('Fetched Orders:', orders);

    // Check if orders is empty
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for the specified criteria.' });
    }

    // Transform orders to the desired report format
    const reportData = orders.map(order => ({
      username: order.user.email,
      orderedFood: [
        order.entree,
        order.starch,
        order.side,
        order.dessert
      ].filter(Boolean).join(', '), // Join only non-empty items
      caterer: order.caterer,
      orderDate: order.orderDate.toDateString(),
    }));

    res.status(200).json(reportData); // Return the structured report data
  } catch (error) {
    logger.error('Error generating report:', error);
    res.status(500).json({ message: 'Error generating report', error: error.message });
  }
};