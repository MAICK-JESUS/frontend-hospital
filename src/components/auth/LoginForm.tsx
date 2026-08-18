import { useState } from "react";
import type { FormEventHandler } from "react";
import type { LoginCredentials } from "../../types/auth";
import "./LoginForm.css";


interface LoginFormProps {
  error?: string;
  onSubmit: (credentials: LoginCredentials) => void;
}


function LoginForm({ error, onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();


    const normalizedEmail = email.trim().toLowerCase();


    if (!normalizedEmail || !password) {
      return;
    }


    onSubmit({
      email: normalizedEmail,
      password,
    });
  };


  return (
    <form className="login-card" onSubmit={handleSubmit}>
      <div className="login-card__header">
        <p className="login-card__eyebrow">Hospital care</p>
        <h1>Iniciar sesión</h1>
        <p className="login-card__subtitle">Accede de forma segura al panel de gestión hospitalaria.</p>
      </div>


      <div className="login-form__field">
        <label htmlFor="email">Correo electrónico</label>


        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Ingrese su correo electrónico"
          autoComplete="email"
        />
      </div>


      <div className="login-form__field">
        <label htmlFor="password">Contraseña</label>


        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Ingrese su contraseña"
          autoComplete="current-password"
          required
        />
      </div>


      {error && (
        <p className="login-form__alert" role="alert" aria-live="polite">
          {error}
        </p>
      )}


      <button className="login-form__button" type="submit">Ingresar</button>
    </form>
  );
}


export default LoginForm;
