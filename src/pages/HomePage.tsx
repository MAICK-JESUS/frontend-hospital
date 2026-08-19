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
          <div>
            <p className="eyebrow">Liga de futsal</p>
            <h1>Bienvenido a FUTSALPRO</h1>
            <p>
              Sigue los partidos de hoy, revisa la tabla de posiciones y consulta
              el rendimiento de jugadores y equipos desde un solo lugar.
            </p>

            <div className="home-actions">
              <Link className="primary-link" to="/partidos">
                Ver calendario
              </Link>
              <Link className="secondary-link" to="/tabla">
                Ver posiciones
              </Link>
            </div>
          </div>

          <aside className="session-card" aria-label="Información de sesión">
            {user ? (
              <>
                <span>Sesión activa</span>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <p>Carnet: {user.carnet}</p>
                <p>Rol: {user.role}</p>
                <button type="button" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <span>Invitado</span>
                <h2>No existe una sesión activa.</h2>
                <Link className="primary-link" to="/login">
                  Iniciar sesión
                </Link>
              </>
            )}
          </aside>
        </section>

        <section className="home-summary-grid" aria-label="Resumen de la liga">
          <article className="summary-card">
            <span>Partidos hoy</span>
            <strong>{todaysMatches.length}</strong>
            <p>Encuentros programados para la jornada actual.</p>
          </article>
          <article className="summary-card">
            <span>Líder actual</span>
            <strong>{leader.team}</strong>
            <p>{leader.points} puntos en la tabla general.</p>
          </article>
          <article className="summary-card">
            <span>Próximos juegos</span>
            <strong>{nextMatches.length}</strong>
            <p>Partidos posteriores a la fecha de hoy.</p>
          </article>
        </section>

        <section className="page-hero home-section-title">
          <h2>Partidos que se jugarán hoy</h2>
          <p>
            Estos son los encuentros agendados para hoy. Si no hay partidos,
            también te mostramos los próximos disponibles.
          </p>
        </section>

        {todaysMatches.length > 0 ? (
          <section className="cards-grid" aria-label="Partidos de hoy">
            {todaysMatches.map((match) => (
              <article className="info-card match-card featured-match" key={match.id}>
                <p className="match-date">Hoy · {match.time}</p>
                <h3 className="match-teams">
                  {match.homeTeam} vs {match.awayTeam}
                </h3>
                <p>Sede: {match.venue}</p>
              </article>
            ))}
          </section>
        ) : (
          <section className="empty-state" aria-label="Sin partidos para hoy">
            <h3>No hay partidos programados para hoy.</h3>
            <p>Estos son los próximos encuentros disponibles:</p>
            <div className="cards-grid">
              {nextMatches.map((match) => (
                <article className="info-card match-card" key={match.id}>
                  <p className="match-date">
                    {match.date} · {match.time}
                  </p>
                  <h3 className="match-teams">
                    {match.homeTeam} vs {match.awayTeam}
                  </h3>
                  <p>Sede: {match.venue}</p>
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
