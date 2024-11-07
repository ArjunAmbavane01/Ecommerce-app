# eCommerce Project

This is a full-stack eCommerce web application built using the MERN stack (MongoDB, Express, React, Node.js). The application allows users to browse products, add items to their cart, and complete purchases. User can also cutomize their own PC from the PC Parts available in store

## Table of Contents
- [Installation](#installation)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Project Structure](#project-structure)
- [Features](#features)

---

## Clone the Repository

```bash
git clone https://github.com/yourusername/ecommerce-project.git
cd ecommerce-project
```

## Installation

### Backend

1. **Navigate to the Backend Directory**:
   ```bash
   cd backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the `backend` directory and add the following environment variables:
     ```plaintext
     PORT=5000
     MONGO_URI=your_mongo_connection_string
     JWT_SECRET=your_jwt_secret
     ```

4. **Run the Backend Server**:
   - Start the backend server with the following command:
     ```bash
     npm run server
     ```

### Frontend

1. **Navigate to the Frontend Directory**:
   ```bash
   cd ../frontend
   ```

2. **Create React App (If Not Already Created)**:
   - If you haven't set up your React app yet, create one with the following command:
     ```bash
     npx create-react-app .
     ```

3. **Install the Necessary Packages for the Frontend**:
   ```bash
   npm install
   ```

4. **Run the Frontend Server**:
   ```bash
   npm start
   ```

## Project Structure

```plaintext
ecommerce-project/
│
├── backend/          # Express server, routes, controllers, and models
│   ├── config/       # Environment configurations
│   ├── controllers/  # Request handling
│   ├── models/       # MongoDB schemas
│   └── routes/       # API routes
│
├── frontend/         # React application
│   ├── src/          # React components, pages, and services
│   └── public/       # Public assets and HTML
│
└── .env              # Environment variables
```

## Features

- **Laptop**:
  - Browse and view laptop details
  - Add laptops to cart
  - Checkout and complete purchases

- **PC**:
  - Browse and customize your own PC
  - Add PC parts to cart
  - Checkout and complete purchase  

