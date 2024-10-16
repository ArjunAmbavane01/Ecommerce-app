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
  const { os, brand, price, processor, ram, screenSize } = req.query;
  const filter = {};

  if (os) filter.os = os.toLowerCase();
  if (brand) filter.brand = brand;
  if (processor) filter['specs.processor'] = { $regex: processor, $options: 'i' };
  if (ram) filter['specs.ram'] = ram + ' GB';
  if (price) {
    const [min, max] = price.split('-');
    filter['specs.price'] = { $gte: parseInt(min), $lte: max ? parseInt(max) : Number.MAX_SAFE_INTEGER };
  }
  if (screenSize) {
    const size = parseFloat(screenSize);
    if (size === 17) {
      filter['specs.screenSize'] = { $gte: size };
    } else {
      filter['specs.screenSize'] = { $lt: size };
    }
  }

  try {
    console.log(filter)
    // const laptops = await Laptop.find(filter);
    const laptops = await Laptop.find();
    res.json(laptops);
  } catch (error) {
    console.error('Error fetching laptops:', error);
    res.status(500).json({ message: 'Error fetching laptops' });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
