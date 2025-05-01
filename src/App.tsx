import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Contexto de autenticación
import { AuthProvider } from "./context/AuthContext";

// Páginas
import Login from "./pages/Login";

// Estilos generales
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="falling-leaves">
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
        </div>
        <div className="app-container">
          <Routes>
            {/* Ruta de inicio de sesión */}
            <Route path="/login" element={<Login />} />

            {/* Ruta protegida (opcional) */}
            {/* <Route path="/addDish" element={<ProtectedRoute><AddPlatillo /></ProtectedRoute>} /> */}


            {/* Aquí podrías agregar más rutas si las tienes */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
