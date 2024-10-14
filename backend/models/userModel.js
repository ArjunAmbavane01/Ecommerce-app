const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  preferences: {
    favoriteBrands: [{ type: String }],
    budgetRange: {
      min: { type: Number },
      max: { type: Number }
    }
  },
  cart: [{
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Laptop' }, 
    quantity: { type: Number, default: 1 }
  }],
  purchaseHistory: [{
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Laptop' }, 
    date: { type: Date, default: Date.now },
    price: { type: Number }
  }],
  reviews: [{
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Laptop' }, // or PCComponent
    comment: { type: String },
    rating: { type: Number }
  }],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Laptop' }] // or PCComponent
});

const User = mongoose.model('User', userSchema);

module.exports = User;
