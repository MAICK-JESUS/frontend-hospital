import Navbar from "../components/Navbar";
import { teamStandings } from "../data/futsalData";
import "../styles/pages.css";

function TeamStandingsPage() {
  return (
    <div className="page-shell">
      <Navbar />
      <main className="page-content">
        <section className="page-hero">
          <h1>Tabla de posiciones</h1>
          <p>Copa Bosco 2026 · Sexto de secundaria — varones.</p>
        </section>

        <section className="table-card" aria-label="Tabla de posiciones de equipos">
          <table className="stats-table">
            <thead>
              <tr>
                <th>Pos.</th>
                <th>Equipo</th>
                <th>PJ</th>
                <th>PG</th>
                <th>PE</th>
                <th>PP</th>
                <th>GF</th>
                <th>GC</th>
                <th>+/-</th>
                <th>PTS</th>
              </tr>
            </thead>
            <tbody>
              {teamStandings.map((team) => (
                <tr key={team.team}>
                  <td><span className="position-badge">{team.position}</span></td>
                  <td>{team.team}</td>
                  <td>{team.played}</td>
                  <td>{team.won}</td>
                  <td>{team.drawn}</td>
                  <td>{team.lost}</td>
                  <td>{team.goalsFor}</td>
                  <td>{team.goalsAgainst}</td>
                  <td className={team.goalDifference >= 0 ? "goal-difference positive" : "goal-difference negative"}>
                    {team.goalDifference > 0 ? "+" : ""}{team.goalDifference}
                  </td>
                  <td><strong>{team.points}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default TeamStandingsPage;
