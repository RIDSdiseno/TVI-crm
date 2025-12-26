import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  Home,
  Kanban,
  PlusCircle,
  LayoutDashboard,
  Users,
  Building2,
  LogOut,
  UserCircle,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const linkBase = "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition";

export default function AppShell() {
  const { usuario, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const role = usuario?.role;
  const isAdvisor = role === "USER" || role === "COMERCIAL";
  const isSupervisor = role === "ADMIN_EMPRESA" || role === "GERENTE_UNIDAD";
  const isSuperAdmin = role === "SUPER_ADMIN";

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 text-slate-800">
      <div className="flex">
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-72 max-w-full border-r border-sky-100 bg-white/90 shadow-sm backdrop-blur px-4 py-6 space-y-4 transform transition-transform duration-200 ease-out lg:static lg:translate-x-0 lg:flex lg:flex-col ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-2 lg:px-0">
            <div>
              <p className="text-xs text-sky-600 font-semibold">TVI CRM</p>
              <p className="font-semibold text-slate-900">
                {usuario?.company?.name || "Multi-empresa"}
              </p>
            </div>
            <button
              className="lg:hidden rounded-lg p-1.5 text-slate-500 hover:bg-sky-50"
              onClick={closeMenu}
              aria-label="Cerrar menu"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="space-y-1">
            <NavItem to="/home" icon={<Home size={18} />} onNavigate={closeMenu}>
              Inicio
            </NavItem>

            {isAdvisor && (
              <>
                <NavItem to="/oportunidades" icon={<Kanban size={18} />} onNavigate={closeMenu} end>
                  Mis oportunidades
                </NavItem>
                <NavItem
                  to="/oportunidades/nueva"
                  icon={<PlusCircle size={18} />}
                  onNavigate={closeMenu}
                >
                  Nueva oportunidad
                </NavItem>
              </>
            )}

            {isSuperAdmin && !isAdvisor && (
              <>
                <NavItem to="/oportunidades" icon={<Kanban size={18} />} onNavigate={closeMenu} end>
                  Oportunidades
                </NavItem>
                <NavItem
                  to="/oportunidades/nueva"
                  icon={<PlusCircle size={18} />}
                  onNavigate={closeMenu}
                >
                  Nueva oportunidad
                </NavItem>
              </>
            )}

            {isSupervisor && !isAdvisor && (
              <>
                <NavItem to="/pipeline" icon={<Kanban size={18} />} onNavigate={closeMenu}>
                  Embudo
                </NavItem>
                <NavItem
                  to="/oportunidades/nueva"
                  icon={<PlusCircle size={18} />}
                  onNavigate={closeMenu}
                >
                  Nueva oportunidad
                </NavItem>
              </>
            )}

            {isSupervisor && (
              <NavItem
                to="/dashboard/supervisor"
                icon={<LayoutDashboard size={18} />}
                onNavigate={closeMenu}
              >
                Dashboard equipo
              </NavItem>
            )}
            {isSuperAdmin && (
              <NavItem
                to="/dashboard/supervisor"
                icon={<LayoutDashboard size={18} />}
                onNavigate={closeMenu}
              >
                Dashboard global
              </NavItem>
            )}
          </nav>

          {isSuperAdmin && (
            <div className="border-t border-sky-100 pt-3 space-y-1">
              <p className="px-2 text-xs font-semibold text-sky-600 uppercase">Administracion</p>
              <NavItem to="/admin/estructura" icon={<Building2 size={18} />} onNavigate={closeMenu}>
                Estructura
              </NavItem>
              <NavItem to="/admin/usuarios" icon={<Users size={18} />} onNavigate={closeMenu}>
                Usuarios
              </NavItem>
            </div>
          )}

          <button
            onClick={() => void logout()}
            className="flex items-center gap-2 text-sm text-sky-700 px-2 py-2 rounded-lg hover:bg-sky-50"
          >
            <LogOut size={18} />
            Cerrar sesion
          </button>
        </aside>

        {menuOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/25 lg:hidden"
            onClick={closeMenu}
            aria-label="Cerrar menu"
          />
        )}

        <main className="flex-1 flex flex-col min-h-screen">
          <header className="h-auto border-b border-sky-100 bg-white/90 backdrop-blur px-4 sm:px-6 py-3 flex items-start sm:items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-3">
              <button
                className="lg:hidden rounded-lg p-2 border border-sky-200 text-slate-700 bg-white hover:bg-sky-50"
                onClick={() => setMenuOpen(true)}
                aria-label="Abrir menu"
              >
                <Menu size={18} />
              </button>
              <div>
                <p className="text-xs text-slate-500">Usuario</p>
                <p className="text-sm font-semibold text-slate-900">
                  {usuario?.profile?.firstName || usuario?.email}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              {usuario?.activeAssignment && (
                <div className="text-xs text-slate-600 max-w-md sm:text-right">
                  <span className="font-semibold text-slate-800">
                    {usuario.activeAssignment.company?.name}
                  </span>{" "}
                  | {usuario.activeAssignment.businessUnit?.name} |{" "}
                  {usuario.activeAssignment.serviceLine?.name}
                </div>
              )}
              <NavItem
                to="/perfil"
                icon={<UserCircle size={18} />}
                onNavigate={closeMenu}
                fullWidth={false}
              >
                Perfil
              </NavItem>
            </div>
          </header>

          <div className="flex-1 overflow-x-hidden">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

function NavItem({
  to,
  icon,
  children,
  onNavigate,
  fullWidth = true,
  end = false,
}: {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onNavigate?: () => void;
  fullWidth?: boolean;
  end?: boolean;
}) {
  const widthClass = fullWidth === false ? "" : "w-full";
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onNavigate}
      className={({ isActive }) =>
        `${linkBase} ${widthClass} ${
          isActive
            ? "bg-sky-100 text-sky-800 border border-sky-200"
            : "text-slate-700 hover:bg-sky-50"
        }`
      }
    >
      {icon}
      {children}
    </NavLink>
  );
}
