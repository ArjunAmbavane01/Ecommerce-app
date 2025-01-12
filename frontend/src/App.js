import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { PCPartsProvider } from './contexts/PCPartsContext';
import Welcome from './pages/Welcome';
import LaptopWelcome from './pages/laptop/LaptopWelcome';
import LaptopStore from './pages/laptop/LaptopStore';
import CustomizePC from './pages/pc/CustomizePC';
import ShoppingCart from './pages/order/ShoppingCart';
import Checkout from './pages/order/Checkout';
import PurchaseHistory from './pages/PurchaseHistory';
import PCPurchaseHistory from './pages/PCPurchaseHistory';
import Wishlist from './pages/Wishlist';
import PurchaseBuild from './pages/pc/PurchaseBuild';
import UpdateProfile from './pages/UpdateProfile';

import OrderStatsCharts from './components/OrderStatsCharts';


function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <PCPartsProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/laptops" element={<LaptopWelcome />} />
                <Route path="/laptops/store" element={<LaptopStore />} />
                <Route path="/cart" element={<ShoppingCart />} />
                <Route path="/purchase-history" element={<PurchaseHistory />} />
                <Route path="/pc-purchase-history" element={<PCPurchaseHistory />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/customize-pc" element={<CustomizePC />} />
                <Route path="/purchase-build" element={<PurchaseBuild />} />
                <Route path='/update-profile' element={<UpdateProfile />} />

              <Route path="/laptops/order-chart" element={<OrderStatsCharts />} />

              </Routes>
            </Router>
          </PCPartsProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;