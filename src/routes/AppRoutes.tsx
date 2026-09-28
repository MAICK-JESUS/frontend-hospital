import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage";
import MatchesPage from "../pages/MatchesPage";
import PlayersPage from "../pages/PlayersPage";
import TeamStandingsPage from "../pages/TeamStandingsPage";
import TeamsPage from "../pages/TeamsPage";
import LoginPage from "../pages/auth/LoginPage";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/partidos" element={<MatchesPage />} />
          <Route path="/tabla" element={<TeamStandingsPage />} />
          <Route path="/jugadores" element={<PlayersPage />} />
          <Route path="/equipos" element={<TeamsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
