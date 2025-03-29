import axios from "axios";

// Definir la URL base del backend
const API_URL = "http://localhost:8080"; // Asegúrate de cambiar esto a la URL correcta

// Crear una instancia de Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Agregar interceptor para incluir el token en las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Leer el token almacenado
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Manejar errores de autenticación globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token"); // Eliminar el token si es inválido
      window.location.href = "/login"; // Redirigir al login
    }
    return Promise.reject(error);
  }
);

export default api;
