import api from "../api/axiosConfig";

interface AuthResponse {
  token: string;
}

export const login = async (correo: string, contrasena: string): Promise<string> => {
  try {
    console.log("Enviando datos al backend:", { correo, contrasena });
    const response = await api.post("/login", { correo, contrasena });

    // El token se recibe como cadena, no como objeto
    const token = response.data;
    console.log("Token recibido:", token);

    localStorage.setItem("token", token); // Guardar el token directamente
    return token;
  } catch (error: any) {
    console.error("Error en login (Frontend):", error.response?.data || error.message);
    throw new Error("Credenciales incorrectas");
  }
};

export const register = async (correo: string, contrasena: string): Promise<AuthResponse> => {
  const response = await api.post("/auth/signup", { correo, contrasena });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("token");
};
