import { useState } from "react";
import Navbar from "../components/Navbar";
import { teams as initialTeams } from "../data/futsalData";
import { authRepository } from "../repositories/authRepository";
import { storageService } from "../services/storageService";
import "../styles/pages.css";

type Team = (typeof initialTeams)[number];

const TEAMS_STORAGE_KEY = "futsal-pro-teams";

function getInitialTeams(): Team[] {
  return storageService.get<Team[]>(TEAMS_STORAGE_KEY) ?? initialTeams;
}

function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>(getInitialTeams);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const isAdmin = authRepository.isAuthenticated();

  function startEditing(team: Team) {
    if (!isAdmin) return;
    setEditingTeam({ ...team });
  }

  function saveTeam() {
    if (!editingTeam || !isAdmin) return;

    const updated = teams.map((team) =>
      team.name === editingTeam.name ? editingTeam : team
    );

    setTeams(updated);
    storageService.set(TEAMS_STORAGE_KEY, updated);
    setEditingTeam(null);
  }

  return (
    <div className="page-shell">
      <Navbar />
      <main className="page-content">
        <section className="page-hero">
          <h1>Equipos</h1>
          <p>Estos son los equipos de la Copa Bosco registrados en Sucre, Bolivia.</p>
          {!isAdmin && <p className="admin-note">Vista pública: inicia sesión como administrador para editar los equipos.</p>}
        </section>

        <div className="team-count">Total de equipos: {teams.length}</div>

        <section className="cards-grid" aria-label="Lista de equipos">
          {teams.map((team) => (
            <article className="info-card" key={team.name}>
              <h2>{team.name}</h2>
              <p>Origen: {team.origin}</p>
              <p>Jugadores registrados: {team.players}</p>
              {isAdmin && (
                <button className="edit-button" type="button" onClick={() => startEditing(team)}>
                  Editar equipo
                </button>
              )}
            </article>
          ))}
        </section>

        {isAdmin && editingTeam && (
          <section className="player-editor" aria-labelledby="team-editor-title">
            <div>
              <p className="section-kicker">Administración</p>
              <h2 id="team-editor-title">Editar equipo</h2>
              <p>Modifica la información del equipo y guarda los cambios.</p>
            </div>
            <div className="player-editor-fields">
              <label>Nombre<input value={editingTeam.name} onChange={(event) => setEditingTeam({ ...editingTeam, name: event.target.value })} /></label>
              <label>Origen<input value={editingTeam.origin} onChange={(event) => setEditingTeam({ ...editingTeam, origin: event.target.value })} /></label>
              <label>Jugadores<input type="number" min="0" value={editingTeam.players} onChange={(event) => setEditingTeam({ ...editingTeam, players: Math.max(0, Number(event.target.value)) })} /></label>
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

export default TeamsPage;
