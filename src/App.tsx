import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login"; // Importamos la pantalla de login
import "./App.css"; 

function App() {
  return (
    <div className="app-container">
      <Login /> 
    </div>
  );
}

export default App;

