import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  
  // For development, bypass authentication
  if (import.meta.env.DEV) {
    return <Outlet />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};