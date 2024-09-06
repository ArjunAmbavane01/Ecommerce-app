import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Laptop from '../components/Laptop';
import Header from '../components/Header';

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
  const [filters, setFilters] = useState({
    brand: '',
    price: '',
    processor: '',
    ram: '',
  });
  const location = useLocation();

  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        const queryParams = new URLSearchParams(filters);
        console.log('Fetching laptops with filters:', filters);
        const response = await fetch(`http://localhost:5000/api/laptops?${queryParams.toString()}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Laptops data received:', data);
        setLaptops(data);
      } catch (error) {
        console.error('Error fetching laptops:', error);
        // Optionally set an error state here to display to the user
      }
    };

    fetchLaptops();
  }, [filters]);

  const handleFilterChange = (filterName, value) => {
    console.log(`Filter changed: ${filterName} = ${value}`);
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
  };

  console.log('Rendering LaptopStore component');

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-white mb-6">Windows Laptops ({laptops.length})</h1>
        <div className="flex flex-wrap gap-4 mb-6">
          <FilterButton
            label="Categories"
            options={['Ultrabook', 'Gaming', 'Business']}
            value={filters.category}
            onChange={(value) => handleFilterChange('category', value)}
          />
          <FilterButton
            label="Brand"
            options={['HP', 'Dell', 'Lenovo', 'ASUS']}
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
            options={['Intel Core i3', 'Intel Core i5', 'Intel Core i7', 'AMD Ryzen 5', 'AMD Ryzen 7']}
            value={filters.processor}
            onChange={(value) => handleFilterChange('processor', value)}
          />
          <FilterButton
            label="RAM (GB)"
            options={['4', '8', '16', '32']}
            value={filters.ram}
            onChange={(value) => handleFilterChange('ram', value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {laptops && laptops.length > 0 ? (
            laptops.map((laptop) => {
              console.log('Rendering laptop:', laptop);  // Add this line
              return <Laptop key={laptop._id} laptop={laptop} />
})
          ) : (
            <p className="text-white col-span-3 text-center">No laptops found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default LaptopStore;