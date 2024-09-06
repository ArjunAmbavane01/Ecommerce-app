const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/FSD', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('MongoDB connected...'))
.catch(err => console.error('Connection error', err));

const LaptopSchema = new mongoose.Schema({
  name: String,
  image: String,
  specs: {
    processor: String,
    ram: String,
    storage: String,
    price: String,
  },
  rating: Number,
  reviews: Number,
});

const Laptop = mongoose.model('Laptop', LaptopSchema);

app.get('/api/laptops', async (req, res) => {
  const { os, brand, screenSize, price, processor, ram } = req.query;
  const filter = {};

  if (os) filter.os = os;
  if (brand) filter.brand = brand;
  if (screenSize) filter.screenSize = screenSize;
  if (price) {
    const [min, max] = price.split('-');
    filter.price = { $gte: parseInt(min), $lte: parseInt(max) };
  }
  if (processor) filter.processor = processor;
  if (ram) filter.ram = parseInt(ram);

  try {
    const laptops = await Laptop.find(filter);
    res.json(laptops);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching laptops' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
