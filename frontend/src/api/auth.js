/**
 * Admin authentication API endpoints.
 * @module api/auth
 */
import api, { setClientToken } from './client';

/**
 * Authenticates an admin user and stores their JWT token.
 * 
 * @param {string} username - The administrator's username.
 * @param {string} password - The administrator's password.
 * @returns {Promise<Object>} A promise resolving to the authentication response containing the token.
 */
export const loginAdmin = async (username, password) => {
  const response = await api.post('/api/auth/login', { username, password });
  const { token } = response.data;
  setClientToken(token);
  return response.data;
};

/**
 * Logs out the current admin user by clearing their client token.
 */
export const logoutAdmin = () => {
  setClientToken(null);
};
