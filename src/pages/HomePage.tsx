import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { authRepository } from "../repositories/authRepository";
import { scheduledMatches, teamStandings } from "../data/futsalData";
import "../styles/pages.css";

const today = new Date().toISOString().slice(0, 10);
const todaysMatches = scheduledMatches.filter((match) => match.date === today);
const nextMatches = scheduledMatches.filter((match) => match.date > today).slice(0, 2);
const leader = teamStandings[0];

function HomePage() {
  const navigate = useNavigate();
  const user = authRepository.getCurrentUser();

  const handleLogout = () => {
    authRepository.logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="page-shell home-shell">
      <Navbar />

      <main className="page-content home-content">
        <section className="home-hero">
          <div className="hero-decoration" aria-hidden="true">
            <span className="hero-glow" />
            <span className="spinning-ball">⚽</span>
          </div>

          <div className="hero-copy">
            <p className="eyebrow">Liga de futsal · Temporada 2026</p>
            <h1>Todo el futsal en un solo lugar.</h1>
            <p className="hero-description">
              Sigue los partidos, consulta la tabla de posiciones y descubre el
              rendimiento de jugadores y equipos con una experiencia rápida,
              moderna y profesional.
            </p>

            <div className="home-actions">
              <Link className="primary-link" to="/partidos">
                Ver partidos <span>→</span>
              </Link>
              <Link className="secondary-link" to="/tabla">
                Ver posiciones
              </Link>
            </div>
          </div>

          <aside className="session-card" aria-label="Información de sesión">
            <div className="session-status">
              <span className="status-dot" />
              {user ? "Sesión activa" : "Modo invitado"}
            </div>

            {user ? (
              <>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <div className="session-meta">
                  <span>Carnet</span>
                  <strong>{user.carnet}</strong>
                  <span>Rol</span>
                  <strong>{user.role}</strong>
                </div>
                <button type="button" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <h2>Únete a FUTSALPRO</h2>
                <p>Inicia sesión para acceder a tu cuenta y gestionar tus datos.</p>
                <Link className="primary-link session-login" to="/login">
                  Iniciar sesión
                </Link>
              </>
            )}
          </aside>
        </section>

        <section className="home-summary-grid" aria-label="Resumen de la liga">
          <article className="summary-card">
            <div className="summary-icon">◷</div>
            <span>Partidos hoy</span>
            <strong>{todaysMatches.length}</strong>
            <p>Encuentros programados para la jornada actual.</p>
          </article>

          <article className="summary-card summary-card-highlight">
            <div className="summary-icon">★</div>
            <span>Líder actual</span>
            <strong>{leader.team}</strong>
            <p>{leader.points} puntos en la tabla general.</p>
          </article>

          <article className="summary-card">
            <div className="summary-icon">⚡</div>
            <span>Próximos juegos</span>
            <strong>{nextMatches.length}</strong>
            <p>Partidos posteriores a la fecha de hoy.</p>
          </article>
        </section>

        <section className="home-section-title">
          <div>
            <p className="section-kicker">Calendario</p>
            <h2>Partidos que se jugarán hoy</h2>
            <p>
              Revisa los encuentros de la jornada. Si no hay partidos hoy,
              mostraremos automáticamente los próximos disponibles.
            </p>
          </div>
          <Link className="section-link" to="/partidos">
            Ver calendario completo →
          </Link>
        </section>

        {todaysMatches.length > 0 ? (
          <section className="cards-grid" aria-label="Partidos de hoy">
            {todaysMatches.map((match) => (
              <article className="info-card match-card featured-match" key={match.id}>
                <div className="match-card-top">
                  <p className="match-date">Hoy · {match.time}</p>
                  <span className="live-badge">Programado</span>
                </div>
                <h3 className="match-teams">
                  {match.homeTeam} <span>VS</span> {match.awayTeam}
                </h3>
                <div className="match-location">
                  <span>⌖</span> {match.venue}
                </div>
              </article>
            ))}
          </section>
        ) : (
          <section className="empty-state" aria-label="Sin partidos para hoy">
            <div className="empty-icon">⚽</div>
            <div>
              <h3>No hay partidos programados para hoy.</h3>
              <p>Estos son los próximos encuentros disponibles:</p>
            </div>
            <div className="cards-grid">
              {nextMatches.map((match) => (
                <article className="info-card match-card" key={match.id}>
                  <p className="match-date">{match.date} · {match.time}</p>
                  <h3 className="match-teams">
                    {match.homeTeam} <span>VS</span> {match.awayTeam}
                  </h3>
                  <div className="match-location">
                    <span>⌖</span> {match.venue}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default HomePage;
