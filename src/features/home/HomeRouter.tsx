// src/features/home/HomeRouter.tsx
import { useAuth } from "../../context/AuthContext";
import HomeAsesor from "./HomeAsesor";
import HomeAdminEmpresa from "./HomeAdminEmpresa";
import HomeSuperAdmin from "./HomeSuperAdmin";

export default function HomeRouter() {
  const { usuario } = useAuth();

  if (!usuario) {
    return <div className="p-6">No hay usuario cargado.</div>;
  }

  const rol = usuario.role;

  // Roles que funcionan como ASESOR
  const esAsesor = rol === "USER" || rol === "COMERCIAL";

  if (esAsesor) {
    return <HomeAsesor />;
  }

  if (rol === "ADMIN_EMPRESA") {
    return <HomeAdminEmpresa />;
  }

  if (rol === "SUPER_ADMIN") {
    return <HomeSuperAdmin />;
  }

  // Otros roles futuros (RRHH_GLOBAL, etc.)
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">
        Rol no tiene un home definido todavía: {rol}
      </h1>
    </div>
  );
}
