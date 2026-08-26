import Navbar from "../components/Navbar";
import { teams } from "../data/futsalData";
import "../styles/pages.css";

function TeamsPage() {
  return (
    <div className="page-shell">
      <Navbar />
      <main className="page-content">
        <section className="page-hero">
          <h1>Equipos</h1>
          <p>Estos son los equipos de la Copa Bosco registrados en Sucre, Bolivia.</p>
        </section>

        <div className="team-count">Total de equipos: {teams.length}</div>

        <section className="cards-grid" aria-label="Lista de equipos">
          {teams.map((team) => (
            <article className="info-card" key={team.name}>
              <h2>{team.name}</h2>
              <p>Origen: {team.origin}</p>
              <p>Jugadores registrados: {team.players}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

export default TeamsPage;
