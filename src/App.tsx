// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleGuard from "./components/RoleGuard";

import LoginPage from "./pages/LoginPage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import HomeRouter from "./features/home/HomeRouter";
import AppShell from "./layout/AppShell";
import PipelinePage from "./features/opportunities/PipelinePage";
import OpportunityFormPage from "./features/opportunities/OpportunityFormPage";
import OpportunityListPage from "./features/opportunities/OpportunityListPage";
import StructurePage from "./features/admin/structure/StructurePage";
import UserManagementPage from "./features/admin/users/UserManagementPage";
import SupervisorDashboardPage from "./features/dashboard/SupervisorDashboardPage";
import AdvisorDashboardPage from "./features/dashboard/AdvisorDashboardPage";
import ProfilePage from "./features/profile/ProfilePage";

export default function App() {
  return (
    <Routes>
      {/* Redirección raíz */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Callback de OAuth */}
      <Route path="/auth/callback" element={<AuthCallbackPage />} />

      {/* App protegida con layout */}
      <Route
        element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<HomeRouter />} />
        <Route
          path="/pipeline"
          element={
            <RoleGuard allowedRoles={["SUPER_ADMIN", "ADMIN_EMPRESA", "GERENTE_UNIDAD"]}>
              <PipelinePage />
            </RoleGuard>
          }
        />
        <Route
          path="/oportunidades"
          element={
            <RoleGuard allowedRoles={["USER", "COMERCIAL", "SUPER_ADMIN"]}>
              <OpportunityListPage />
            </RoleGuard>
          }
        />
        <Route
          path="/oportunidades/nueva"
          element={
            <RoleGuard allowedRoles={["USER", "COMERCIAL", "SUPER_ADMIN"]}>
              <OpportunityFormPage />
            </RoleGuard>
          }
        />
        <Route
          path="/oportunidades/:id/editar"
          element={
            <RoleGuard allowedRoles={["USER", "COMERCIAL", "SUPER_ADMIN"]}>
              <OpportunityFormPage />
            </RoleGuard>
          }
        />
        <Route
          path="/dashboard/supervisor"
          element={
            <RoleGuard allowedRoles={["SUPER_ADMIN", "ADMIN_EMPRESA", "GERENTE_UNIDAD"]}>
              <SupervisorDashboardPage />
            </RoleGuard>
          }
        />
        <Route
          path="/dashboard/asesor"
          element={
            <RoleGuard allowedRoles={["USER", "COMERCIAL", "SUPER_ADMIN"]}>
              <AdvisorDashboardPage />
            </RoleGuard>
          }
        />
        <Route
          path="/admin/estructura"
          element={
            <RoleGuard allowedRoles={["SUPER_ADMIN"]}>
              <StructurePage />
            </RoleGuard>
          }
        />
        <Route
          path="/admin/usuarios"
          element={
            <RoleGuard allowedRoles={["SUPER_ADMIN"]}>
              <UserManagementPage />
            </RoleGuard>
          }
        />
        <Route path="/perfil" element={<ProfilePage />} />
      </Route>

      {/* 404 -> login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
