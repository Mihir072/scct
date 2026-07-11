import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { loginAdmin as apiLoginAdmin, logoutAdmin as apiLogoutAdmin } from '../api/auth';
import { setClientToken } from '../api/client';

const TOKEN_STORAGE_KEY = 'scct_admin_token';
const USER_STORAGE_KEY = 'scct_admin_user';

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true until we've checked localStorage
  const [error, setError] = useState(null);

  // On app startup, restore session from localStorage
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (storedToken) {
        setClientToken(storedToken);
        setToken(storedToken);
        setUser(storedUser ? JSON.parse(storedUser) : null);
      }
    } catch (e) {
      // If localStorage is unavailable or JSON parse fails, ignore and start fresh
      console.warn('Could not restore admin session from storage:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiLoginAdmin(username, password);
      const userObj = { username };
      setToken(data.token);
      setUser(userObj);
      // Persist session so page refreshes don't log the admin out
      localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userObj));
      return true;
    } catch (err) {
      console.error('Login error details:', err);
      setError(err.response?.data?.message || 'Invalid username or password');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    apiLogoutAdmin();
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
  };

  const value = {
    token,
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
