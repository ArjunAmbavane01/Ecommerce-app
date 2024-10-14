import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './pages/Welcome';
import LaptopWelcome from './pages/LaptopWelcome';
import LaptopStore from './pages/LaptopStore';
import CustomizePC from './pages/CustomizePC';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/laptops" element={<LaptopWelcome />} />
        <Route path="/laptops/store" element={<LaptopStore />} />
        <Route path="/customize-pc" element={<CustomizePC />} />
      </Routes>
    </Router>
  );
}

export default App;