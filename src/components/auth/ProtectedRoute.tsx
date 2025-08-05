import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};