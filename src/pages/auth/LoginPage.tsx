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
      setError("Acceso denegado. Solo el administrador puede iniciar sesión.");
      return;
    }

    navigate("/", { replace: true });
  };

  return (
    <main className="login-page">
      <div className="login-header">
        <span className="login-badge">⚽ FUTSALPRO</span>
        <h1>Acceso de administrador</h1>
        <p>
          Esta plataforma es de uso exclusivo para el administrador.
          Introduce tus credenciales para continuar.
        </p>
      </div>

      <LoginForm error={error} onSubmit={handleLogin} />
    </main>
  );
}

export default LoginPage;
