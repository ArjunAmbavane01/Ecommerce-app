const mongoose = require('mongoose');

const pcPartSchema = new mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, required: true }, 
  price: { type: Number, required: true }, 
  platform: { type: String, required: true }, 
  stock: { type: Number, default: 0 }, 
});

const PCPart = mongoose.model('PCPart', pcPartSchema);
module.exports = PCPart;
