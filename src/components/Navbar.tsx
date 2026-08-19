import { Link } from "react-router-dom";

import "../styles/navbar.css";

const iconProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function HouseIcon() {
  return (
    <svg aria-hidden="true" {...iconProps}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 10v10h14V10" />
      <path d="M9 20v-6h6v6" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg aria-hidden="true" {...iconProps}>
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg aria-hidden="true" {...iconProps}>
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M5 5H3v3a4 4 0 0 0 4 4" />
      <path d="M19 5h2v3a4 4 0 0 1-4 4" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg aria-hidden="true" {...iconProps}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg aria-hidden="true" {...iconProps}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    </svg>
  );
}

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="logo">
        ⚽ FUTSAL<span>PRO</span>
      </Link>

      <nav className="nav-links">
        <Link to="/">
          <HouseIcon />
          Inicio
        </Link>

        <Link to="/partidos">
          <CalendarIcon />
          Partidos
        </Link>

        <Link to="/tabla">
          <TrophyIcon />
          Tabla
        </Link>

        <Link to="/jugadores">
          <UsersIcon />
          Jugadores
        </Link>

        <Link to="/equipos">
          <ShieldIcon />
          Equipos
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
