import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginService } from "../services/authService";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import "../styles/login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error cuando el usuario empiece a escribir
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Por favor completa todos los campos");
      return;
    }
    
    setLoading(true);
    try {
      await loginService(formData.email, formData.password);
      navigate("/addDish");
    } catch (err) {
      setError("Las credenciales ingresadas son inválidas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-brand">
          <div className="brand-content">
            <div className="brand-header">
              <img 
                src="/src/assets/images/logosolo.jpg" 
                alt="Ecoappetite Logo" 
                className="brand-logo"
              />
              <h1 className="brand-title">ECOAPPETITE</h1>
              <p className="brand-subtitle">
                Transformando la gastronomía hacia un futuro sostenible
              </p>
            </div>

            <div className="brand-features">
              <div className="feature" role="listitem">
                <span className="feature-icon" aria-hidden="true">🌱</span>
                <h3>Ingredientes</h3>
                <p>100% orgánicos y sostenibles</p>
              </div>
              <div className="feature" role="listitem">
                <span className="feature-icon" aria-hidden="true">🏆</span>
                <h3>Certificados</h3>
                <p>Estándares internacionales</p>
              </div>
              <div className="feature" role="listitem">
                <span className="feature-icon" aria-hidden="true">💰</span>
                <h3>Precios</h3>
                <p>Comercio justo garantizado</p>
              </div>
              <div className="feature" role="listitem">
                <span className="feature-icon" aria-hidden="true">💚</span>
                <h3>Compromiso</h3>
                <p>Red empresarial sostenible</p>
              </div>
            </div>
          </div>
        </div>

        <div className="login-form-container">
          <div className="login-form-wrapper">
            <div className="login-header">
              <h2>¡Bienvenido!</h2>
              <p>Inicia sesión en tu cuenta</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              {error && (
                <div className="error-message" role="alert">
                  {error}
                </div>
              )}
              
              <div className="form-group">
                <div className="input-icon-wrapper">
                  <EmailOutlinedIcon className="input-icon" aria-hidden="true" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Correo electrónico"
                    aria-label="Correo electrónico"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="input-icon-wrapper">
                  <LockOutlinedIcon className="input-icon" aria-hidden="true" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Contraseña"
                    aria-label="Contraseña"
                    required
                  />
                </div>
                <div className="forgot-password">
                  <a href="#" tabIndex="0">¿Olvidaste tu contraseña?</a>
                </div>
              </div>

              <button 
                type="submit" 
                className="submit-button" 
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </button>

              <div className="divider" role="separator">
                <span>o continúa con</span>
              </div>

              <div className="social-buttons">
                <button type="button" className="social-button google" aria-label="Iniciar sesión con Google">
                  <GoogleIcon aria-hidden="true" /> Google
                </button>
                <button type="button" className="social-button facebook" aria-label="Iniciar sesión con Facebook">
                  <FacebookIcon aria-hidden="true" /> Facebook
                </button>
              </div>

              <div className="register-options">
                <p>¿No tienes una cuenta?</p>
                <div className="register-buttons">
                  <button 
                    type="button" 
                    className="register-button restaurant"
                    aria-label="Registro para Restaurantes"
                  >
                    <RestaurantIcon aria-hidden="true" />
                    <span>Restaurante</span>
                  </button>
                  <button 
                    type="button" 
                    className="register-button consumer"
                    aria-label="Registro para Consumidores"
                  >
                    <PersonOutlineIcon aria-hidden="true" />
                    <span>Consumidor</span>
                  </button>
                </div>
              </div>
            </form>
          </div>

          <footer className="login-footer">
            <p>¿Necesitas ayuda? <a href="#" tabIndex="0">Contáctanos</a></p>
            <p className="copyright">© 2025 ECOAPPETITE - Todos los derechos reservados</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Login;
