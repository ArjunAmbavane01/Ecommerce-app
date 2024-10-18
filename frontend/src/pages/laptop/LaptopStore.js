import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Laptop from '../../components/laptop/Laptop';
import Header from '../../components/Header';
import { Loader2 } from 'lucide-react'; 

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
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    os: '',
    brand: '',
    price: '',
    processor: '',
    ram: '',
    rating: '',
  });
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.filters) {
      setFilters(prevFilters => ({ ...prevFilters, ...location.state.filters }));
    }
  }, [location.state]);

  const fetchLaptops = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams(
        Object.entries(filters).filter(([_, value]) => value !== '')
      );
      const response = await fetch(`http://localhost:4000/api/laptop/getLaptopsByFilters?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (result.success && Array.isArray(result.data)) {
        setLaptops(result.data);
      } else {
        throw new Error('Invalid data format received from server');
      }
    } catch (error) {
      console.error('Error fetching laptops:', error);
      setError('Failed to fetch laptops. Please try again later.');
      setLaptops([]);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const hasValidFilters = Object.values(filters).some(value => value !== '');
    if (hasValidFilters) {
      fetchLaptops();
    } else {
      setLaptops([]);
    }
  }, [filters, fetchLaptops]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({ ...prevFilters, [filterName]: value }));
  };

  const getPriceValue = (option) => {
    const priceMap = {
      '20,000 and less': '20000',
      '40,000 and less': '40000',
      '60,000 and less': '60000',
      '80,000 and less': '80000',
      '1,00,000 and less': '100000'
    };
    return priceMap[option] || '';
  };

  const addToCart = async (laptopId) => {
    try {
      const response = await fetch('http://localhost:4000/api/laptop/addToCartProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: laptopId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.success) {
        alert('Product added to cart successfully!');
      } else {
        throw new Error('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart. Please try again later.');
    }
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
            options={['MacOS', 'Windows']}
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
            options={['20,000 and less', '40,000 and less', '60,000 and less', '80,000 and less', '1,00,000 and less']}
            value={filters.price ? `${filters.price} and less` : ''}
            onChange={(value) => handleFilterChange('price', getPriceValue(value))}
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
            label="Rating"
            options={['1 and above', '2 and above', '3 and above', '4 and above']}
            value={filters.rating ? `${filters.rating} and above` : ''}
            onChange={(value) => handleFilterChange('rating', value.split(' ')[0])}
          />
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
          </div>
        ) : laptops.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {laptops.map((laptop) => (
              <Laptop key={laptop._id} laptop={laptop} onAddToCart={addToCart} />
            ))}
          </div>
        ) : (
          <p className="text-white text-center">No laptops found.</p>
        )}
      </main>
    </div>
  );
};

export default LaptopStore;