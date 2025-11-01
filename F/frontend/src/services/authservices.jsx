// src/services/authService.js - VERSION COMPLÈTE
import api from './api';
import axios from 'axios';

export const authService = {
  // Inscription
  register: async (userData) => {
    const response = await api.post('/register', userData);
    return response.data;
  },

  // Connexion
  login: async (credentials) => {
    const response = await api.post('/login', credentials);
    return response.data;
  },

  // Vérification email
  verifyEmail: async (verificationData) => {
    const response = await api.post('/verify-email-code', verificationData);
    return response.data;
  },

  // Déconnexion
  logout: async () => {
    const response = await api.post('/logout');
    return response.data;
  },

  // Récupérer le profil utilisateur
  getProfile: async () => {
    const response = await api.get('/user');
    return response.data;
  },

  // Mot de passe oublié
  forgotPassword: async (email) => {
    const response = await api.post('/forgot-password', { email });
    return response.data;
  },

  // Réinitialiser mot de passe
  resetPassword: async (data) => {
    const response = await api.post('/reset-password', data);
    return response.data;
  },

  // Google OAuth - Redirection
  redirectToGoogle: () => {
    window.location.href = 'http://127.0.0.1:8000/auth/google/redirect';
  },

  // Google OAuth - Callback
  handleGoogleCallback: async () => {
    const response = await api.get('/auth/google/callback');
    return response.data;
  }
};

// Intercepteur pour ajouter le token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;