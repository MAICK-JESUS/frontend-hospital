import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage";
import MatchesPage from "../pages/MatchesPage";
import PlayersPage from "../pages/PlayersPage";
import TeamStandingsPage from "../pages/TeamStandingsPage";
import TeamsPage from "../pages/TeamsPage";
import LoginPage from "../pages/auth/LoginPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/partidos" element={<MatchesPage />} />
        <Route path="/tabla" element={<TeamStandingsPage />} />
        <Route path="/jugadores" element={<PlayersPage />} />
        <Route path="/equipos" element={<TeamsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
