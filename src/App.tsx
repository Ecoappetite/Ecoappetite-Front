import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Contexto de autenticación
import { AuthProvider } from "./context/AuthContext";

// Rutas protegidas (comentado si aún no implementas token/login)
import ProtectedRoute from "./components/ProtectedRoute";

// Páginas
import Login from "./pages/Login";
import AddPlatillo from "./pages/AddPlatillo";

// Estilos generales
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Routes>
            {/* Ruta de inicio de sesión */}
            <Route path="/login" element={<Login />} />

            {/* Ruta protegida (opcional) */}
            {/* <Route path="/addDish" element={<ProtectedRoute><AddPlatillo /></ProtectedRoute>} /> */}

            {/* Ruta abierta para añadir platillo */}
            <Route path="/addDish" element={<AddPlatillo />} />

            {/* Aquí podrías agregar más rutas si las tienes */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
