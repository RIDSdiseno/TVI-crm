import React, { useState } from "react";
import "./login_page.css";

export default function LoginPage() {
  const [showPwd, setShowPwd] = useState(false);

  return (
    <div className="login-container">

      {/* Fondo animado */}
      <div className="login-bg" />

      {/* Caja principal */}
      <div className="login-box animate-fadeIn">
        <img src="/img/TVI.jpg" className="logo-main" />

        <h1 className="login-title">Acceso TVI CRM</h1>
        <p className="login-subtitle">Bienvenido(a), ingresa tus credenciales</p>

        <form className="login-form">
          <label>Correo electrónico</label>
          <input type="email" placeholder="ejemplo@tvi.cl" required />

          <label>Contraseña</label>

          <div className="pwd-wrapper">
            <input
              type={showPwd ? "text" : "password"}
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              className="btn-show"
              onClick={() => setShowPwd(!showPwd)}
            >
              {showPwd ? "Ocultar" : "Ver"}
            </button>
          </div>

          <div className="row-options">
            <label className="remember">
              <input type="checkbox" />
              Recordarme
            </label>

            <button className="forgot">¿Olvidaste tu contraseña?</button>
          </div>

          <button type="submit" className="login-btn">
            Ingresar
          </button>
        </form>

        {/* Línea separadora */}
        <div className="divider"></div>

        {/* Social login */}
        <div className="social-area">
          <button className="btn-google">Acceder con Google</button>
          <button className="btn-microsoft">Ingresar con Microsoft</button>
        </div>

        {/* Logos finales */}
        <div className="login-empresas">
          <img src="/img/T.jpg" />
          <img src="/img/V.jpg" />
          <img src="/img/I.jpg" />
        </div>

        <p className="footer">© 2025 TVI CRM — Acceso seguro</p>
      </div>
    </div>
  );
}
