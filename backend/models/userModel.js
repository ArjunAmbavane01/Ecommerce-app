const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: [{
    item_id: { type: mongoose.Schema.Types.ObjectId }, 
    quantity: { type: Number, default: 1 }
  }],
  purchaseHistory: [{
    item_id: { type: mongoose.Schema.Types.ObjectId }, 
    date: { type: Date, default: Date.now },
    price: { type: Number }
  }],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId }]
});

const User = mongoose.model('User', userSchema);
module.exports = User;
