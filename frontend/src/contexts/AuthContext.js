import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      validateToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const validateToken = async (token) => {
    try {
      const response = await fetch('http://localhost:4000/api/login/validateToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Error validating token:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:4000/api/login/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (response.ok) {
        const { data } = await response.json();
        localStorage.setItem('token', data.token);
        setUser({ _id: data._id });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (name, username, email, password, phNo) => {
    try {
      const response = await fetch('http://localhost:4000/api/login/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, username, email, password, phNo })
      });
      if (response.ok) {
        const { data } = await response.json();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);