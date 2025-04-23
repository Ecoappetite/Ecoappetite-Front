import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; //new
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login"; // Importamos la pantalla de login
import AddPlatillo from "./pages/AddPlatillo";
import "./App.css"; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/login" element={<Login />} />
            {/*<Route path="/agregar-platillo" element={<ProtectedRoute><AddPlatillo /></ProtectedRoute>} />*/}
            <Route path="/addDish" element={<AddPlatillo />} />
            {/*para las demás */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
