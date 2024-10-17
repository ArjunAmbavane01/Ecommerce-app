const mongoose = require('mongoose');

const pcComponentSchema = new mongoose.Schema({
  category: { type: String, required: true }, 
  brand: { type: String, required: true },
  model: { type: String, required: true },
  specifications: [{
    key: { type: String, required: true },
    value: { type: String, required: true }
  }],
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  reviews: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comment: { type: String },
    rating: { type: Number }
  }],
  compatibility: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PCComponent' }], 
  images: [{ type: String }],
  availability: { type: Boolean, default: true }
});

const PCComponent = mongoose.model('PCComponent', pcComponentSchema);
module.exports = PCComponent;
