import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Laptop from '../../components/laptop/Laptop';
import Header from '../../components/Header';

// ADD RATING LOW INSTEAD OF SCREEN
// ADD PRICE FOR MAX LIMIT

const FilterButton = ({ label, options, value, onChange }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="bg-gray-700 text-white px-4 py-2 rounded-md"
  >
    <option value="">{label}</option>
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

const LaptopStore = () => {
  const [laptops, setLaptops] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    os: '',
    brand: '',
    price: '',
    processor: '',
    ram: '',
    screenSize: '',
  });
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.filters) {
      setFilters(prevFilters => ({ ...prevFilters, ...location.state.filters }));
    }
  }, [location.state]);

  useEffect(() => {
    const hasValidFilters = Object.values(filters).some(value => value !== '');
    if (hasValidFilters) {
      fetchLaptops();
    }
  }, [filters]);

  const fetchLaptops = async () => {
    try {
      const queryParams = new URLSearchParams(
        Object.entries(filters).filter(([_, value]) => value !== '')
      );
      const response = await fetch(`http://localhost:5000/api/laptops?${queryParams.toString()}`);
      console.log(`http://localhost:5000/api/laptops?${queryParams.toString()}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setLaptops(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching laptops:', error);
      setError('Failed to fetch laptops. Please try again later.');
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({ ...prevFilters, [filterName]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-white mb-6">
          Laptops ({laptops.length})
        </h1>
        <div className="flex flex-wrap gap-4 mb-6">
          <FilterButton
            label="OS"
            options={['macOS', 'Windows', 'ChromeOS']}
            value={filters.os}
            onChange={(value) => handleFilterChange('os', value)}
          />
          <FilterButton
            label="Brand"
            options={['HP', 'Dell', 'Lenovo', 'ASUS', 'Apple']}
            value={filters.brand}
            onChange={(value) => handleFilterChange('brand', value)}
          />
          <FilterButton
            label="Price"
            options={['0-30000', '30000-50000', '50000+']}
            value={filters.price}
            onChange={(value) => handleFilterChange('price', value)}
          />
          <FilterButton
            label="Processor Name"
            options={['Intel Core i3', 'Intel Core i5', 'Intel Core i7', 'AMD Ryzen 5', 'AMD Ryzen 7', 'Apple M1', 'Apple M2']}
            value={filters.processor}
            onChange={(value) => handleFilterChange('processor', value)}
          />
          <FilterButton
            label="RAM (GB)"
            options={['4', '8', '16', '32']}
            value={filters.ram}
            onChange={(value) => handleFilterChange('ram', value)}
          />
          <FilterButton
            label="Screen Size"
            options={['12.99', '14.99', '16.99', '17']}
            value={filters.screenSize}
            onChange={(value) => handleFilterChange('screenSize', value)}
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {laptops && laptops.length > 0 ? (
            laptops.map((laptop) => <Laptop key={laptop._id} laptop={laptop} />)
          ) : (
            <p className="text-white col-span-3 text-center">No laptops found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default LaptopStore;