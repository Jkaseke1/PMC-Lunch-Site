// controllers/menuController.js
const MenuItem = require('../models/MenuItem');
const logger = require('../utils/logger');

exports.getMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json(menuItems);
  } catch (error) {
    logger.error('Error fetching menu items:', error);
    res.status(500).json({ message: 'Error fetching menu items', error: error.message });
  }
};

exports.getMenuItemsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const menuItems = await MenuItem.find({ category });
    if (menuItems.length === 0) {
      return res.status(404).json({ message: 'No menu items found for this category' });
    }
    res.status(200).json(menuItems);
  } catch (error) {
    logger.error('Error fetching menu items by category:', error);
    res.status(500).json({ message: 'Error fetching menu items by category', error: error.message });
  }
};

exports.addMenuItem = async (req, res) => {
  try {
    const { name, category, caterer, price } = req.body;
    const newItem = new MenuItem({ name, category, caterer, price });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    logger.error('Error adding menu item:', error);
    res.status(500).json({ message: 'Error adding menu item', error: error.message });
  }
};

exports.updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, caterer, price } = req.body;
    const updatedItem = await MenuItem.findByIdAndUpdate(
      id,
      { name, category, caterer, price },
      { new: true, runValidators: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    logger.error('Error updating menu item:', error);
    res.status(500).json({ message: 'Error updating menu item', error: error.message });
  }
};

exports.deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await MenuItem.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.status(200).json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    logger.error('Error deleting menu item:', error);
    res.status(500).json({ message: 'Error deleting menu item', error: error.message });
  }
};