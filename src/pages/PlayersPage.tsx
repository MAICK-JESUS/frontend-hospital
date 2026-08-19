import Navbar from "../components/Navbar";
import { playerStandings } from "../data/futsalData";
import "../styles/pages.css";

function PlayersPage() {
  return (
    <div className="page-shell">
      <Navbar />
      <main className="page-content">
        <section className="page-hero">
          <h1>Tabla de jugadores</h1>
          <p>Ranking de jugadores destacados por goles y asistencias.</p>
        </section>

        <section className="table-card" aria-label="Tabla de posiciones de jugadores">
          <table className="stats-table">
            <thead>
              <tr>
                <th>Posición</th>
                <th>Jugador</th>
                <th>Equipo</th>
                <th>Goles</th>
                <th>Asistencias</th>
              </tr>
            </thead>
            <tbody>
              {playerStandings.map((player) => (
                <tr key={player.player}>
                  <td><span className="position-badge">{player.position}</span></td>
                  <td>{player.player}</td>
                  <td>{player.team}</td>
                  <td><strong>{player.goals}</strong></td>
                  <td>{player.assists}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default PlayersPage;
