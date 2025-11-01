// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api'; // Importez votre API

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);
const verifyEmail = async (verificationData) => {
  try {
    console.log('🔄 Vérification email:', verificationData);
    
    const response = await api.post('/verify-email', verificationData);
    
    console.log('✅ Email vérifié:', response.data);
    
    return { 
      success: true, 
      data: response.data 
    };
  } catch (error) {
    console.error('❌ Erreur vérification email:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    return { 
      success: false, 
      error: error.response?.data?.message || 'Code de vérification invalide' 
    };
  }
};


  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');

      if (token && savedUser) {
        // Vérifier que le token est toujours valide
        const response = await api.get('/profile'); // ou /user selon votre API
        setUser(response.data.user || JSON.parse(savedUser));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Erreur vérification auth:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      console.log('Login attempt:', credentials);
      
      const response = await api.post('/login', credentials);
      
      if (response.data.token) {
        // Stocker le token et les infos utilisateur
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
        setIsAuthenticated(true);
        
        return { 
          success: true, 
          data: response.data 
        };
      } else {
        return { 
          success: false, 
          error: 'Token manquant dans la réponse' 
        };
      }
    } catch (error) {
      console.error('Erreur login:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur de connexion' 
      };
    }
  };

  const register = async (userData) => {
    try {
      console.log('Register attempt:', userData);
      
      const response = await api.post('/register', userData);
      
      if (response.data.token) {
        // Auto-login après inscription
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
        setIsAuthenticated(true);
      }
      
      return { 
        success: true, 
        data: response.data 
      };
    } catch (error) {
      console.error('Erreur register:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur d\'inscription' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    // Optionnel: Appeler l'API de logout
    // api.post('/logout');
  };

  const loginWithGoogle = () => {
    window.location.href = 'http://127.0.0.1:8000/auth/google/redirect';
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    loginWithGoogle,
    verifyEmail // ← AJOUTEZ CETTE LIGNE

  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;