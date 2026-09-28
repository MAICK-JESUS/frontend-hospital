import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import LoginForm from "../../components/auth/LoginForm";
import "./LoginPage.css";
import { authRepository } from "../../repositories/authRepository";

import type { LoginCredentials } from "../../types/auth";

function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  if (authRepository.isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = (credentials: LoginCredentials) => {
    setError("");

    const user = authRepository.login(credentials);

    if (!user) {
      setError("Correo o contraseña incorrectos. Solo el administrador puede ingresar.");
      return;
    }

    navigate("/", { replace: true });
  };

  return (
    <main className="login-page">
      <div className="login-background-ball login-background-ball--one" aria-hidden="true" />
      <div className="login-background-ball login-background-ball--two" aria-hidden="true" />

      <section className="login-layout">
        <div className="login-showcase">
          <div className="login-brand">⚽ FUTSAL<span>PRO</span></div>
          <p className="login-kicker">COPA BOSCO · TEMPORADA 2026</p>
          <h1>El corazón de la cancha empieza aquí.</h1>
          <p className="login-description">
            Panel de administración de FUTSALPRO para gestionar partidos,
            jugadores, equipos y la tabla de posiciones.
          </p>

          <div className="login-court" aria-hidden="true">
            <div className="court-center-circle" />
            <div className="court-center-line" />
            <div className="court-goal court-goal--left" />
            <div className="court-goal court-goal--right" />
            <span className="court-ball">⚽</span>
          </div>

          <div className="login-features">
            <span>⚽ Partidos</span>
            <span>🏆 Posiciones</span>
            <span>👥 Jugadores</span>
            <span>🛡️ Equipos</span>
          </div>
        </div>

        <div className="login-panel">
          <div className="login-panel__top">
            <span className="admin-lock">🔐</span>
            <div>
              <span className="login-panel__eyebrow">Área privada</span>
              <strong>Administrador</strong>
            </div>
          </div>

          <div className="login-header">
            <h2>Iniciar sesión</h2>
            <p>
              Ingresa tus credenciales para administrar la competición.
            </p>
          </div>

          <LoginForm error={error} onSubmit={handleLogin} />

          <p className="login-public-note">
            La información de FUTSALPRO es pública. Solo las funciones de
            administración requieren iniciar sesión.
          </p>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
