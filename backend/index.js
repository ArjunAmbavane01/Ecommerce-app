const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config({ path: 'config.env' }); 
const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.json());

app.use(cors({
  origin: [process.env.CLIENT_URL, 'http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'], 
}));

const routes = [
  { path: '/api/login', module: require('./routes/loginRoutes') },
  { path: '/api/laptop', module: require('./routes/laptopRoutes') },
  { path: '/api/order', module: require('./routes/orderRoutes') },
  { path: '/api/user', module: require('./routes/userRoutes') },
];

const laptopSalesData = [
  { name: "Laptop A", sales: 120 },
  { name: "Laptop B", sales: 300 },
  { name: "Laptop C", sales: 80 },
  { name: "Laptop D", sales: 240 }
];

app.get('/api/laptop-sales', (req, res) => {
  res.json(laptopSalesData);
});

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

routes.forEach(({ path, module }) => app.use(path, module));
dbConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on: http://localhost:${PORT}`);
  });
});