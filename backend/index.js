const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config({ path: 'config.env' }); // Load environment variables from config.env
const app = express();
const PORT = process.env.PORT || 4001;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Configure CORS
app.use(cors({
  origin: [process.env.CLIENT_URL, 'http://localhost:3000', 'http://localhost:3001'], // Allowed origins
  credentials: true, // Allow credentials (cookies, etc.)
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
}));

// Dynamic routes
const routes = [
  { path: '/api/login', module: require('./routes/loginRoutes') },
];

// Database connection function
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1); // Exit the app if the database connection fails
  }
};

// Apply routes dynamically
routes.forEach(({ path, module }) => app.use(path, module));

// Start the server after connecting to the database
dbConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on: http://localhost:${PORT}`);
  });
});