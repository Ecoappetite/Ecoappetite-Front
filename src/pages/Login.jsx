import React from "react";
import "../styles/login.css";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Bienvenido a Ecoappetite</h2>
        <p className="login-subtitle">Inicia sesión para continuar</p>

        {/* Formulario de inicio de sesión */}
        <form className="login-form">
          <input type="email" placeholder="Correo electrónico" className="login-input" />

          
          <br/> <br/>


          <input type="password" placeholder="Contraseña" className="login-input" />
	   <br/> <br/>
          <button type="submit" className="login-button">Iniciar sesión</button>
        </form>
       <br/> <br/>
      {/* Botones de inicio de sesión con redes sociales */}
      <div className="social-login">
        <button className="google-login">
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
          />
          
        </button>
        <button className="facebook-login">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
            alt="Facebook"
          />
          
        </button>
      </div>
        
        <p className="register-text">
          ¿No tienes cuenta? <a href="#">Regístrate aquí</a>
        </p>
      </div>
    </div>
  );
};

export default Login;

