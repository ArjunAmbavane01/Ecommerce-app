const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phNo: { type: Number, required: true },
  cart: [{
    item_id: { type: mongoose.Schema.Types.ObjectId }
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
