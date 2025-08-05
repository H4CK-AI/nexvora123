import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  // Safe localStorage access for production
  const getAuthStatus = () => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return localStorage.getItem('isAuthenticated');
      }
      return null;
    } catch (error) {
      console.warn('localStorage access failed:', error);
      return null;
    }
  };

  const isAuthenticated = getAuthStatus();
  
  // For development, bypass authentication
  if (import.meta.env.DEV) {
    console.log('Development mode: bypassing authentication');
    return <Outlet />;
  }

  // For production, check authentication
  console.log('Production mode: checking authentication:', isAuthenticated);
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};