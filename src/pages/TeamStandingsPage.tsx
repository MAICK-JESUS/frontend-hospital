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
          <p>Revisa el rendimiento de cada equipo durante la temporada.</p>
        </section>

        <section className="table-card" aria-label="Tabla de posiciones de equipos">
          <table className="stats-table">
            <thead>
              <tr>
                <th>Posición</th>
                <th>Equipo</th>
                <th>PJ</th>
                <th>G</th>
                <th>E</th>
                <th>P</th>
                <th>Puntos</th>
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
