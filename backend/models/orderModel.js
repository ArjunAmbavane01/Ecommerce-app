const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    item_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Laptop' },
    price: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
  deliveryDate: { type: Date },
  status: { type: String, default: 'Pending' } 
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;