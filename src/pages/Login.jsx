import React from "react";
import "../styles/login.css";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-card">

        {/* Sección izquierda de branding */}
        <div className="login-left">
          {/* Logo */}
          <img src="/src/assets/images/logosolo.jpg" alt="Logo Ecoappetite" className="logo-img" />

          {/* Título y descripción */}
          <h2 className="ecoappetite-title">ECOAPPETITE</h2>
          <p className="ecoappetite-subtitle">
            Plataforma empresarial líder en gastronomía sostenible y responsable
          </p>

          {/* Lista de características */}
          <div className="feature-list">
            <div className="feature-item">
              <img src="/icons/leaf-icon.png" alt="Ingredientes" className="feature-icon" />
              <span>Ingredientes 100% orgánicos y sostenibles</span>
            </div>
            <div className="feature-item">
              <img src="/icons/certificate-icon.png" alt="Certificados" className="feature-icon" />
              <span>Restaurantes certificados con estándares internacionales</span>
            </div>
            <div className="feature-item">
              <img src="/icons/pricing-icon.png" alt="Precios" className="feature-icon" />
              <span>Precios transparentes y comercio justo garantizado</span>
            </div>
            <div className="feature-item">
              <img src="/icons/environment-icon.png" alt="Medio ambiente" className="feature-icon" />
              <span>Red empresarial comprometida con el medio ambiente</span>
            </div>
          </div>
        </div>

        {/* Sección derecha del formulario */}
        <div className="login-right">
          <h2 className="login-right-title">Bienvenido</h2>
          <p className="login-right-subtitle">Inicia sesión para continuar</p>

          {/* Formulario de inicio */}
          <form className="login-form">
            <input type="email" placeholder="Correo electrónico" className="login-input" />
            <input type="password" placeholder="Contraseña" className="login-input" />
            <button type="submit" className="login-button">Iniciar sesión</button>
          </form>

          {/* Divisor */}
          <div className="divider">
            <span>o continúa con</span>
          </div>

          {/* Botones de redes sociales */}
          <div className="social-login">
            <button className="social-button google-login">
              <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" />
              Gmail
            </button>
            <button className="social-button facebook-login">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" />
              Facebook
            </button>
          </div>

          {/* Sección de registro */}
          <div className="register-section">
            <p className="register-question">¿Aún no tienes una cuenta?</p>
            <div className="register-buttons">
              <a href="#" className="register-btn">
                <img src="/icons/restaurant-icon.svg" alt="Restaurante" />
                Registro Restaurante
              </a>
              <a href="#" className="register-btn">
                <img src="/icons/consumer-icon.svg" alt="Consumidor" />
                Registro Consumidor
              </a>
            </div>

            {/* Footer */}
            <div className="login-footer">
              <p>¿Necesitas ayuda? <a href="#">Contáctanos</a></p>
              <p>© 2025 ECOAPPETITE - Todos los derechos reservados</p>
            </div>
          </div>
        </div> {/* Fin login-right */}

      </div> {/* Fin login-card */}
    </div> /* Fin login-container */
  );
};

export default Login;
