import { useState } from "react";
import Navbar from "../components/Navbar";
import { teamStandings } from "../data/futsalData";
import { authRepository } from "../repositories/authRepository";
import { storageService } from "../services/storageService";
import "../styles/pages.css";

type TeamStanding = (typeof teamStandings)[number];

const STANDINGS_STORAGE_KEY = "futsal-pro-team-standings";

function getInitialStandings(): TeamStanding[] {
  return storageService.get<TeamStanding[]>(STANDINGS_STORAGE_KEY) ?? teamStandings;
}

function TeamStandingsPage() {
  const [standings, setStandings] = useState<TeamStanding[]>(getInitialStandings);
  const [editingTeam, setEditingTeam] = useState<TeamStanding | null>(null);
  const isAdmin = authRepository.isAuthenticated();

  function startEditing(team: TeamStanding) {
    if (!isAdmin) return;
    setEditingTeam({ ...team });
  }

  function updateField(field: keyof TeamStanding, value: string) {
    if (!editingTeam || !isAdmin) return;

    const numericFields = ["played", "won", "drawn", "lost", "goalsFor", "goalsAgainst", "goalDifference", "points"];
    const nextValue = numericFields.includes(field) ? Number(value) : value;

    setEditingTeam({ ...editingTeam, [field]: nextValue });
  }

  function saveTeam() {
    if (!editingTeam || !isAdmin) return;

    const updated = standings.map((team) =>
      team.position === editingTeam.position ? editingTeam : team
    );

    setStandings(updated);
    storageService.set(STANDINGS_STORAGE_KEY, updated);
    setEditingTeam(null);
  }

  return (
    <div className="page-shell">
      <Navbar />
      <main className="page-content">
        <section className="page-hero">
          <h1>Tabla de posiciones</h1>
          <p>Copa Bosco 2026 · Sexto de secundaria — varones.</p>
          {!isAdmin && <p className="admin-note">Vista pública: inicia sesión como administrador para editar la tabla.</p>}
        </section>

        <section className="table-card" aria-label="Tabla de posiciones de equipos">
          <table className="stats-table">
            <thead>
              <tr>
                <th>Pos.</th><th>Equipo</th><th>PJ</th><th>PG</th><th>PE</th><th>PP</th>
                <th>GF</th><th>GC</th><th>+/-</th><th>PTS</th>{isAdmin && <th>Acciones</th>}
              </tr>
            </thead>
            <tbody>
              {standings.map((team) => (
                <tr key={team.position}>
                  <td><span className="position-badge">{team.position}</span></td>
                  <td>{team.team}</td><td>{team.played}</td><td>{team.won}</td><td>{team.drawn}</td>
                  <td>{team.lost}</td><td>{team.goalsFor}</td><td>{team.goalsAgainst}</td>
                  <td className={team.goalDifference >= 0 ? "goal-difference positive" : "goal-difference negative"}>
                    {team.goalDifference > 0 ? "+" : ""}{team.goalDifference}
                  </td>
                  <td><strong>{team.points}</strong></td>
                  {isAdmin && <td><button className="edit-button" type="button" onClick={() => startEditing(team)}>Editar</button></td>}
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {isAdmin && editingTeam && (
          <section className="player-editor" aria-labelledby="standing-editor-title">
            <div>
              <p className="section-kicker">Administración</p>
              <h2 id="standing-editor-title">Editar posición de {editingTeam.team}</h2>
              <p>Modifica los datos estadísticos y guarda los cambios.</p>
            </div>
            <div className="player-editor-fields">
              <label>Equipo<input value={editingTeam.team} onChange={(event) => updateField("team", event.target.value)} /></label>
              <label>PJ<input type="number" min="0" value={editingTeam.played} onChange={(event) => updateField("played", event.target.value)} /></label>
              <label>PG<input type="number" min="0" value={editingTeam.won} onChange={(event) => updateField("won", event.target.value)} /></label>
              <label>PE<input type="number" min="0" value={editingTeam.drawn} onChange={(event) => updateField("drawn", event.target.value)} /></label>
              <label>PP<input type="number" min="0" value={editingTeam.lost} onChange={(event) => updateField("lost", event.target.value)} /></label>
              <label>GF<input type="number" min="0" value={editingTeam.goalsFor} onChange={(event) => updateField("goalsFor", event.target.value)} /></label>
              <label>GC<input type="number" min="0" value={editingTeam.goalsAgainst} onChange={(event) => updateField("goalsAgainst", event.target.value)} /></label>
              <label>+/-<input type="number" value={editingTeam.goalDifference} onChange={(event) => updateField("goalDifference", event.target.value)} /></label>
              <label>PTS<input type="number" min="0" value={editingTeam.points} onChange={(event) => updateField("points", event.target.value)} /></label>
            </div>
            <div className="player-editor-actions">
              <button className="secondary-button" type="button" onClick={() => setEditingTeam(null)}>Cancelar</button>
              <button className="primary-button" type="button" onClick={saveTeam}>Guardar cambios</button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default TeamStandingsPage;
