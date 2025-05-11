import axios from 'axios';

//DEFINIR LA URL DEL BACKEND
const API_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    console.log("Solicitud enviada a:", config.url);
    console.log("Datos de la solicitud:", config.data);
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Error en la solicitud:", error); //  Corrección: Añadir return para la promesa
    return Promise.reject(error);  //  Corrección: Añadir return aquí
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
      console.error("Error en la respuesta:", error.response?.data || error.message);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      return Promise.reject(error);
  }
);

export default api;
