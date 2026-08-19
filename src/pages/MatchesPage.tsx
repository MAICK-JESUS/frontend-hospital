import Navbar from "../components/Navbar";
import { scheduledMatches } from "../data/futsalData";
import "../styles/pages.css";

function MatchesPage() {
  return (
    <div className="page-shell">
      <Navbar />
      <main className="page-content">
        <section className="page-hero">
          <h1>Partidos programados</h1>
          <p>Consulta los próximos encuentros, horarios y sedes de la liga.</p>
        </section>

        <section className="cards-grid" aria-label="Lista de partidos programados">
          {scheduledMatches.map((match) => (
            <article className="info-card match-card" key={match.id}>
              <p className="match-date">
                {match.date} · {match.time}
              </p>
              <h2 className="match-teams">
                {match.homeTeam} vs {match.awayTeam}
              </h2>
              <p>Sede: {match.venue}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

export default MatchesPage;
