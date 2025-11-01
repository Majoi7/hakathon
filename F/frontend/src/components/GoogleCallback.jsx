import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const { checkAuth } = useAuth();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        // Vérifier si l'utilisateur est maintenant authentifié
        await checkAuth();
        
        // Rediriger vers le dashboard
        navigate('/dashboard');
      } catch (error) {
        console.error('Google callback error:', error);
        navigate('/login');
      }
    };

    handleGoogleCallback();
  }, [navigate, checkAuth]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Connexion avec Google...</p>
      </div>
    </div>
  );
};

export default GoogleCallback;