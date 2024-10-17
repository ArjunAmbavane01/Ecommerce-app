import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './pages/Welcome';
import LaptopWelcome from './pages/laptop/LaptopWelcome';
import LaptopStore from './pages/laptop/LaptopStore';
import CustomizePC from './pages/pc/CustomizePC';

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