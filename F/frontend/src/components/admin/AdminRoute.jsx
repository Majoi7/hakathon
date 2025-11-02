// src/components/admin/AdminRoute.jsx
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const { admin, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return admin ? children : <Navigate to="/admin/login" replace />;
};

export default AdminRoute;