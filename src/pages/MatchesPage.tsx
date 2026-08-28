import { useState } from "react";
import Navbar from "../components/Navbar";
import { scheduledMatches } from "../data/futsalData";
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

  function updateEditingMatch(field: "date" | "time" | "venue", value: string) {
    if (!editingMatch) return;

    setEditingMatch({ ...editingMatch, [field]: value });
  }

  function saveMatch() {
    if (!editingMatch) return;

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
          <h1>Partidos programados</h1>
          <p>Consulta y actualiza los encuentros, horarios y sedes de la liga.</p>
        </section>

        <section className="cards-grid" aria-label="Lista de partidos programados">
          {matches.map((match) => (
            <article className="info-card match-card" key={match.id}>
              <p className="match-date">
                {match.date} · {match.time}
              </p>
              <h2 className="match-teams">
                {match.homeTeam} vs {match.awayTeam}
              </h2>
              <p>Sede: {match.venue}</p>
              <button className="edit-button" type="button" onClick={() => startEditing(match)}>
                Editar partido
              </button>
            </article>
          ))}
        </section>

        {editingMatch && (
          <section className="match-editor" aria-labelledby="match-editor-title">
            <div>
              <h2 id="match-editor-title">Editar partido</h2>
              <p>Solo se pueden programar hasta {MAX_MATCHES_PER_DAY} partidos por día.</p>
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
                <input value={editingMatch.venue} onChange={(event) => updateEditingMatch("venue", event.target.value)} />
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
