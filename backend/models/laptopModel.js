const mongoose = require('mongoose');

const laptopSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  processor: {
    type: { type: String, required: true },
    model: { type: String, required: true },
    speed: { type: Number, required: true } 
  },
  ram: {
    size: { type: Number, required: true }, 
    type: { type: String, required: true } 
  },
  storage: {
    type: { type: String, required: true }, 
    capacity: { type: Number, required: true } 
  },
  graphics: {
    type: { type: String, required: true }, 
    model: { type: String, required: true },
    memory: { type: Number, required: true } 
  },
  display: {
    size: { type: Number, required: true }, 
    resolution: { type: String, required: true }
  },
  battery: {
    capacity: { type: Number, required: true }, 
    type: { type: String, required: true } 
  },
  ports: [{ type: String }], 
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 }, 
  reviews: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comment: { type: String },
    rating: { type: Number }
  }],
  availability: { type: Boolean, default: true },
  images: [{ type: String }],
  releaseDate: { type: Date }
});

const Laptop = mongoose.model('Laptop', laptopSchema);
module.exports = Laptop;
