/**
 * Protected Route Wrapper Component.
 * @module components/dashboard/ProtectedRoute
 */
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../shared/LoadingSpinner';

/**
 * A routing wrapper that enforces authentication requirements for admin dashboard views.
 * Redirects unauthenticated users to the login screen.
 * 
 * @param {Object} props - React component props.
 * @param {React.ReactNode} props.children - The secure components to render if authorized.
 * @returns {React.ReactElement} The protected children or a Navigate redirect element.
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/dashboard/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
