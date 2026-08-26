import { useState } from "react";
import Navbar from "../components/Navbar";
import { playerStandings } from "../data/futsalData";
import { storageService } from "../services/storageService";
import "../styles/pages.css";

type Player = (typeof playerStandings)[number];

const PLAYERS_STORAGE_KEY = "futsal-pro-player-standings";

function getInitialPlayers(): Player[] {
  return storageService.get<Player[]>(PLAYERS_STORAGE_KEY) ?? playerStandings;
}

function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>(getInitialPlayers);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);

  function startEditing(player: Player) {
    setEditingPlayer({ ...player });
  }

  function updateEditingPlayer(field: keyof Player, value: string) {
    if (!editingPlayer) return;

    const numericFields = ["goals", "assists"] as const;
    const updatedValue = numericFields.includes(field as (typeof numericFields)[number])
      ? Math.max(0, Number(value))
      : value;

    setEditingPlayer({ ...editingPlayer, [field]: updatedValue });
  }

  function savePlayer() {
    if (!editingPlayer) return;

    const updatedPlayers = players.map((player) => (
      player.position === editingPlayer.position ? editingPlayer : player
    ));

    setPlayers(updatedPlayers);
    storageService.set(PLAYERS_STORAGE_KEY, updatedPlayers);
    setEditingPlayer(null);
  }

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
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr key={player.player}>
                  <td><span className="position-badge">{player.position}</span></td>
                  <td>{player.player}</td>
                  <td>{player.team}</td>
                  <td><strong>{player.goals}</strong></td>
                  <td>{player.assists}</td>
                  <td>
                    <button className="edit-button" type="button" onClick={() => startEditing(player)}>
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {editingPlayer && (
          <section className="player-editor" aria-labelledby="player-editor-title">
            <div>
              <h2 id="player-editor-title">Editar jugador</h2>
              <p>Actualiza los datos y guarda los cambios.</p>
            </div>
            <div className="player-editor-fields">
              <label>
                Jugador
                <input value={editingPlayer.player} onChange={(event) => updateEditingPlayer("player", event.target.value)} />
              </label>
              <label>
                Equipo
                <input value={editingPlayer.team} onChange={(event) => updateEditingPlayer("team", event.target.value)} />
              </label>
              <label>
                Goles
                <input type="number" min="0" value={editingPlayer.goals} onChange={(event) => updateEditingPlayer("goals", event.target.value)} />
              </label>
              <label>
                Asistencias
                <input type="number" min="0" value={editingPlayer.assists} onChange={(event) => updateEditingPlayer("assists", event.target.value)} />
              </label>
            </div>
            <div className="player-editor-actions">
              <button className="secondary-button" type="button" onClick={() => setEditingPlayer(null)}>Cancelar</button>
              <button className="primary-button" type="button" onClick={savePlayer}>Guardar cambios</button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default PlayersPage;
