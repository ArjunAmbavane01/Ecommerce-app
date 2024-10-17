const mongoose = require('mongoose');

const laptopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  os: { type: String, required: true },
  processor: { type: String, required: true },
  ramSize: { type: String, required: true },
  storageSize: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  quantity: { type: Number, default: 0 },
  wishlist: { type: Boolean, required: true },
  photoURL: { type: String, required: true },
});

const Laptop = mongoose.model('Laptop', laptopSchema);
module.exports = Laptop;