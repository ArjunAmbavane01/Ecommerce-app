import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useWishlist } from '../contexts/WishlistContext';
import Header from '../components/Header';
import Laptop from '../components/laptop/Laptop';
import { Loader2 } from 'lucide-react';

const WishlistPage = () => {
  const { user } = useAuth();
  const { wishlistItems, fetchWishlistItems } = useWishlist();
  const [loading, setLoading] = useState(true);
  const [laptops, setLaptops] = useState([]);

  const fetchLaptopDetails = useCallback(async (laptopId) => {
    if (!laptopId) {
      console.log('Invalid laptopId:', laptopId);
      return null;
    }
    try {
      console.log('Fetching details for laptop:', laptopId);
      const response = await fetch(`http://localhost:4000/api/laptop/${laptopId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched laptop details:', data.laptop);
        return data.laptop;
      }
      console.log('Failed to fetch laptop details. Response:', response.status);
      return null;
    } catch (error) {
      console.error('Error fetching laptop details:', error);
      return null;
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        setLoading(true);
        await fetchWishlistItems();
        setLoading(false);
      }
    };
    fetchData();
  }, [user, fetchWishlistItems]);

  useEffect(() => {
    const fetchLaptops = async () => {
      setLoading(true);
      console.log('Wishlist items:', wishlistItems);
      const validWishlistItems = wishlistItems.filter(item => item && (item._id || typeof item === 'string'));
      console.log('Valid wishlist items:', validWishlistItems);
      const laptopDetails = await Promise.all(
        validWishlistItems.map(item => fetchLaptopDetails(item._id || item))
      );
      const filteredLaptops = laptopDetails.filter(laptop => laptop !== null);
      console.log('Filtered laptops:', filteredLaptops);
      setLaptops(filteredLaptops);
      setLoading(false);
    };

    fetchLaptops();
  }, [wishlistItems, fetchLaptopDetails]);

  const handleRemoveFromWishlist = useCallback((laptopId) => {
    setLaptops(prev => prev.filter(laptop => laptop._id !== laptopId));
  }, []);

  console.log('Rendering WishlistPage. Laptops:', laptops);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        <main className="max-w-7xl mx-auto p-6">
          <h1 className="text-3xl font-bold text-white mb-6">My Wishlist</h1>
          <p className="text-white text-center">Please sign in to view your wishlist.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-white mb-6">My Wishlist</h1>
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : laptops.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {laptops.map((laptop) => (
              <Laptop 
                key={laptop._id} 
                laptop={laptop}
                onRemoveFromWishlist={handleRemoveFromWishlist}
              />
            ))}
          </div>
        ) : (
          <p className="text-white text-center">Your wishlist is empty.</p>
        )}
      </main>
    </div>
  );
};

export default WishlistPage;