import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RoleGuard({
  allowedRoles,
  children,
}: {
  allowedRoles: string[];
  children: ReactNode;
}) {
  const { usuario, cargando } = useAuth();

  if (cargando) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-gray-600">
        Validando sesión...
      </div>
    );
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(usuario.role)) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
}
