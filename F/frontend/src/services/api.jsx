// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// UN SEUL intercepteur request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // ← 'token' pas 'auth_token'
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Pour FormData, laisser le navigateur gérer le Content-Type
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// UN SEUL intercepteur response
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expiré ou invalide
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;