/**
 * React context instance for global authentication state.
 * @module context/AuthContext
 */
import { createContext } from 'react';

// Separate plain JS file so Vite Fast Refresh isn't confused by a non-component
// export living inside a .jsx file alongside the AuthProvider component.
export const AuthContext = createContext(null);
