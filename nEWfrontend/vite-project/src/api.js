const API_URL = "http://127.0.0.1:8000/api";

// Axios instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // si tu utilises Sanctum
});

export default api;

