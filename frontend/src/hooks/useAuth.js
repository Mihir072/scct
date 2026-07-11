/**
 * Custom React hook to access authentication context.
 * @module hooks/useAuth
 */
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.js';

/**
 * Provides access to the global authentication state and lifecycle methods.
 * 
 * @returns {Object} The current authentication context value (user info, tokens, login/logout functions).
 * @throws {Error} If called from a component not wrapped within an AuthProvider tree.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
