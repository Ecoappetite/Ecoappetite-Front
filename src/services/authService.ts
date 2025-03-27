import api from "../api/axiosConfig";

interface AuthResponse {
  token: string;
}

export const login = async (username: string, password: string): Promise<AuthResponse> => {
  const response = await api.post("/auth/login", { username, password });
  localStorage.setItem("token", response.data.token); // Guardar el token
  return response.data;
};

export const register = async (username: string, password: string): Promise<AuthResponse> => {
  const response = await api.post("/auth/signup", { username, password });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token"); // Eliminar el token
  window.location.href = "/login"; // Redirigir al login
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("token"); // Verificar si hay un token
};
