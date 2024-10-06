// models/MenuItem.js
const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['entree', 'starch', 'side', 'dessert'] // Ensure these match your admin panel
  },
  caterer: { type: String, required: true },
  price: { type: Number, required: true }
});

module.exports = mongoose.model('MenuItem', menuItemSchema);