import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Laptop from '../components/laptop/Laptop';
import { Loader2 } from 'lucide-react';

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const fetchWishlist = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:4000/api/wishlist/getWishlist', {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch wishlist');
      }
      const data = await response.json();
      setWishlistItems(data.data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      setError('Failed to fetch wishlist. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchWishlist();
    }
  }, [user]);

  const handleWishlistUpdate = () => {
    fetchWishlist();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-white mb-6">My Wishlist</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
          </div>
        ) : wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {wishlistItems.map((laptop) => (
              <Laptop key={laptop._id} laptop={laptop} onWishlistUpdate={handleWishlistUpdate} />
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