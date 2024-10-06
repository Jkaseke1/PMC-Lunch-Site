const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  caterer: {
    type: String,
    required: true
  },
  entree: {
    type: String,
    required: true
  },
  starch: {
    type: String,
    required: true
  },
  side: {
    type: String,
    required: true
  },
  dessert: {
    type: String,
    required: true
  },
  orderDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'cancelled'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
