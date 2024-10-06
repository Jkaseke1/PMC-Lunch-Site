const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['entrees', 'starches', 'sides', 'desserts']
  },
  caterer: {
    type: String,
    required: true,
    enum: ['Ruth', 'Makagi']
  },
  price: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
