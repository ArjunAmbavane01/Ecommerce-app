import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Welcome from './pages/Welcome';
import LaptopWelcome from './pages/laptop/LaptopWelcome';
import LaptopStore from './pages/laptop/LaptopStore';
import CustomizePC from './pages/pc/CustomizePC';
import ShoppingCart from './pages/order/ShoppingCart';
import Checkout from './pages/order/Checkout'; 
import PurchaseHistory from './pages/PurchaseHistory';
import Wishlist from './pages/Wishlist';


function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/laptops" element={<LaptopWelcome />} />
            <Route path="/laptops/store" element={<LaptopStore />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/purchase-history" element={<PurchaseHistory />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/customize-pc" element={<CustomizePC />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;