import { useState } from "react";
import Navbar from "../components/Navbar";
import { scheduledMatches, teams } from "../data/futsalData";
import { storageService } from "../services/storageService";
import "../styles/pages.css";

type ScheduledMatch = (typeof scheduledMatches)[number];

const MATCHES_STORAGE_KEY = "futsal-pro-scheduled-matches";
const MAX_MATCHES_PER_DAY = 4;

function getInitialMatches(): ScheduledMatch[] {
  return storageService.get<ScheduledMatch[]>(MATCHES_STORAGE_KEY) ?? scheduledMatches;
}

function MatchesPage() {
  const [matches, setMatches] = useState<ScheduledMatch[]>(getInitialMatches);
  const [editingMatch, setEditingMatch] = useState<ScheduledMatch | null>(null);
  const [formError, setFormError] = useState("");

  function startEditing(match: ScheduledMatch) {
    setEditingMatch({ ...match });
    setFormError("");
  }

  function updateEditingMatch(field: "date" | "time" | "venue" | "homeTeam" | "awayTeam", value: string) {
    if (!editingMatch) return;
    setEditingMatch({ ...editingMatch, [field]: value });
    setFormError("");
  }

  function saveMatch() {
    if (!editingMatch) return;

    if (!editingMatch.homeTeam || !editingMatch.awayTeam) {
      setFormError("Debes seleccionar los dos equipos.");
      return;
    }

    if (editingMatch.homeTeam === editingMatch.awayTeam) {
      setFormError("Un equipo no puede jugar contra sí mismo.");
      return;
    }

    const matchesOnSelectedDate = matches.filter((match) => (
      match.id !== editingMatch.id && match.date === editingMatch.date
    ));

    if (matchesOnSelectedDate.length >= MAX_MATCHES_PER_DAY) {
      setFormError(`Solo se permiten ${MAX_MATCHES_PER_DAY} partidos por día. Selecciona otra fecha.`);
      return;
    }

    const updatedMatches = matches.map((match) => (
      match.id === editingMatch.id ? editingMatch : match
    ));

    setMatches(updatedMatches);
    storageService.set(MATCHES_STORAGE_KEY, updatedMatches);
    setEditingMatch(null);
  }

  return (
    <div className="page-shell">
      <Navbar />
      <main className="page-content">
        <section className="page-hero">
          <p className="section-kicker">Calendario oficial</p>
          <h1>Partidos programados</h1>
          <p>Consulta y actualiza los encuentros, equipos, horarios y sedes de la liga.</p>
        </section>

        <section className="cards-grid" aria-label="Lista de partidos programados">
          {matches.map((match) => (
            <article className="info-card match-card" key={match.id}>
              <div className="match-card-top">
                <p className="match-date">{match.date} · {match.time}</p>
                <span className="live-badge">Partido</span>
              </div>
              <h2 className="match-teams">
                {match.homeTeam} <span>VS</span> {match.awayTeam}
              </h2>
              <p className="match-location"><span>⌖</span> {match.venue}</p>
              <button className="edit-button" type="button" onClick={() => startEditing(match)}>
                Editar partido
              </button>
            </article>
          ))}
        </section>

        {editingMatch && (
          <section className="match-editor" aria-labelledby="match-editor-title">
            <div className="match-editor-heading">
              <div>
                <p className="section-kicker">Configuración del encuentro</p>
                <h2 id="match-editor-title">Editar partido #{editingMatch.id}</h2>
                <p>Selecciona los equipos que disputarán este encuentro y modifica sus datos.</p>
              </div>
              <div className="match-preview">
                <span>Enfrentamiento</span>
                <strong>{editingMatch.homeTeam} <small>VS</small> {editingMatch.awayTeam}</strong>
              </div>
            </div>

            <div className="team-selectors">
              <label className="team-selector home-selector">
                <span>Equipo local</span>
                <select
                  value={editingMatch.homeTeam}
                  onChange={(event) => updateEditingMatch("homeTeam", event.target.value)}
                >
                  <option value="">Selecciona el equipo local</option>
                  {teams.map((team) => (
                    <option key={team.name} value={team.name} disabled={team.name === editingMatch.awayTeam}>
                      {team.name}
                    </option>
                  ))}
                </select>
                <small>Jugará como local</small>
              </label>

              <div className="versus-badge">VS</div>

              <label className="team-selector away-selector">
                <span>Equipo visitante</span>
                <select
                  value={editingMatch.awayTeam}
                  onChange={(event) => updateEditingMatch("awayTeam", event.target.value)}
                >
                  <option value="">Selecciona el equipo visitante</option>
                  {teams.map((team) => (
                    <option key={team.name} value={team.name} disabled={team.name === editingMatch.homeTeam}>
                      {team.name}
                    </option>
                  ))}
                </select>
                <small>Jugará como visitante</small>
              </label>
            </div>

            <div className="match-editor-fields">
              <label>
                Fecha
                <input type="date" value={editingMatch.date} onChange={(event) => updateEditingMatch("date", event.target.value)} />
              </label>
              <label>
                Hora
                <input type="time" value={editingMatch.time} onChange={(event) => updateEditingMatch("time", event.target.value)} />
              </label>
              <label>
                Sede
                <input value={editingMatch.venue} onChange={(event) => updateEditingMatch("venue", event.target.value)} placeholder="Ej. Coliseo Central" />
              </label>
            </div>

            {formError && <p className="form-error" role="alert">{formError}</p>}
            <div className="player-editor-actions">
              <button className="secondary-button" type="button" onClick={() => setEditingMatch(null)}>Cancelar</button>
              <button className="primary-button" type="button" onClick={saveMatch}>Guardar cambios</button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default MatchesPage;
