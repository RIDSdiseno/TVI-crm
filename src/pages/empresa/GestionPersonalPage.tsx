import { useMemo, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  ArrowLeft,
  Save,
  ShieldAlert,
} from "lucide-react";

/**
 * GestionPersonalPage.tsx
 *
 * Gestión de personal con jerarquías y asignación de empresa.
 *
 * Reglas implementadas:
 * - Super Admin (rol === "Super Admin"): protegido, no puede editarse ni eliminarse.
 * - CEO / Dueño: puede editar/eliminar a cualquiera excepto Super Admin.
 * - Otros: solo pueden editar/eliminar personal de su misma empresa y con rango inferior.
 *
 * Empresas incluidas: Infinet, T-Sales, VPrime, TVI
 */

type User = {
  id: number;
  nombre: string;
  rol: string;
  email: string;
  estado: string;
  empresa: string;
};

const COMPANIES = ["Infinet", "T-Sales", "VPrime", "TVI"];

/** Roles agrupados por empresa (se usan en el select) */
const listaRoles = [
  {
    grupo: "Nivel 1 - Dirección Global",
    roles: ["CEO / Dueño", "Director de Operaciones", "Auditor Interno"],
  },
  {
    grupo: "TSales - Unidad Comercial",
    roles: ["Gerente TSales", "Supervisor de Ventas", "Ejecutivo de Cuentas"],
  },
  {
    grupo: "VPrime - Unidad VIP",
    roles: ["Gerente VPrime", "Key Account Manager", "Asesor de Clientes VIP"],
  },
  {
    grupo: "Infinet - Unidad Técnica",
    roles: ["Gerente Infinet", "Ingeniero de Redes", "Técnico de Campo"],
  },
];

/** Mapa que asigna empresa automáticamente según rol (fallback null) */
const roleToCompany: Record<string, string | null> = {
  "CEO / Dueño": "TVI",
  "Director de Operaciones": "TVI",
  "Auditor Interno": "TVI",

  "Gerente TSales": "T-Sales",
  "Supervisor de Ventas": "T-Sales",
  "Ejecutivo de Cuentas": "T-Sales",

  "Gerente VPrime": "VPrime",
  "Key Account Manager": "VPrime",
  "Asesor de Clientes VIP": "VPrime",

  "Gerente Infinet": "Infinet",
  "Ingeniero de Redes": "Infinet",
  "Técnico de Campo": "Infinet",

  // Special
  "Super Admin": null,
};

/**
 * Jerarquía: menor valor -> más privilegios
 * Super Admin (0) > CEO / Dueño (1) > Dirección/Gerencia (2) > Supervisor (3) > Técnicos/Ejecutivos (4)
 */
const hierarchyRank: Record<string, number> = {
  "Super Admin": 0,
  "CEO / Dueño": 1,
  "Director de Operaciones": 2,
  "Auditor Interno": 2,
  "Gerente TSales": 2,
  "Gerente VPrime": 2,
  "Gerente Infinet": 2,
  "Supervisor de Ventas": 3,
  "Key Account Manager": 3,
  "Ingeniero de Redes": 3,
  "Técnico de Campo": 4,
  "Ejecutivo de Cuentas": 4,
  "Asesor de Clientes VIP": 4,
};

export default function GestionPersonalPage() {
  const navigate = useNavigate();

  // Estado inicial con Super Admin, Dueño y algunos empleados
  const [personal, setPersonal] = useState<User[]>([
    { id: 99, nombre: "System Root", rol: "Super Admin", email: "admin@sistema.dev", estado: "Activo", empresa: "TVI" },
    { id: 100, nombre: "Roberto Dueño", rol: "CEO / Dueño", email: "ceo@tvi.global", estado: "Activo", empresa: "TVI" },
    { id: 1, nombre: "Ana García", rol: "Gerente TSales", email: "ana.g@tsales.com", estado: "Activo", empresa: "T-Sales" },
    { id: 2, nombre: "Carlos Ruiz", rol: "Ingeniero de Redes", email: "carlos.r@infinet.com", estado: "Activo", empresa: "Infinet" },
  ]);

  const [busqueda, setBusqueda] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState<User | null>(null);

  const initialForm = { nombre: "", rol: "", email: "", estado: "Activo", empresa: "" };
  const [formData, setFormData] = useState<typeof initialForm>(initialForm);

  // =========================
  // usuario actual (actor) — se asume que viene de localStorage 'user'
  // si no existe, por seguridad asumimos que quien usa la UI es Super Admin (ver demo)
  // =========================
  const currentUser: User = useMemo(() => {
    try {
      const saved = localStorage.getItem("user");
      if (saved) {
        const parsed = JSON.parse(saved);
        // si el saved no tiene empresa, intentar inferir por rol
        const inferredCompany = roleToCompany[parsed.rol] ?? parsed.empresa ?? "TVI";
        return { id: parsed.id ?? 0, nombre: parsed.nombre ?? parsed.email ?? "Usuario", rol: parsed.rol ?? "Ejecutivo de Cuentas", email: parsed.email ?? "", estado: parsed.estado ?? "Activo", empresa: parsed.empresa ?? inferredCompany };
      }
    } catch (e) {
      /* ignore */
    }
    // Demo-safe fallback: Super Admin (no puede ser modificado por nadie)
    return { id: 99, nombre: "System Root", rol: "Super Admin", email: "admin@sistema.dev", estado: "Activo", empresa: "TVI" };
  }, []);

  // =========================
  // Helpers de jerarquía / permisos
  // =========================
  const getRank = (rol: string) => {
    return hierarchyRank[rol] ?? 5; // si no está definido, asignar rango bajo
  };

  const isSuperAdmin = (u?: User) => u?.rol === "Super Admin";

  /**
   * Decide si actor puede EDITAR al objetivo (se usa para abrir modal)
   */
  const canEdit = (actor: User, target: User) => {
    if (isSuperAdmin(target)) return false; // nadie edita Super Admin desde UI
    if (actor.id === target.id) return true; // siempre puedes editarte a ti mismo
    if (actor.rol === "CEO / Dueño") {
      return true; // dueño puede editar a todos (excepto Super Admin)
    }
    // otros solo pueden editar si misma empresa y target tiene rango > actor (i.e. menos privilegios)
    if (actor.empresa !== target.empresa) return false;
    return getRank(actor.rol) < getRank(target.rol);
  };

  /**
   * Decide si actor puede ELIMINAR al objetivo
   */
  const canDelete = (actor: User, target: User) => {
    if (isSuperAdmin(target)) return false; // nadie elimina Super Admin
    if (actor.id === target.id) return false; // nadie se auto-elimina desde UI por seguridad
    if (actor.rol === "CEO / Dueño") return true; // dueño puede eliminar a todos menos super admin
    // otros solo pueden eliminar si son de la misma empresa y rango menor (actor más alto)
    if (actor.empresa !== target.empresa) return false;
    return getRank(actor.rol) < getRank(target.rol);
  };

  // =========================
  // Lógica UI
  // =========================
  const abrirModal = (usuario: User | null = null) => {
    if (usuario && !canEdit(currentUser, usuario)) {
      alert(
        "🔒 ACCESO DENEGADO\n\nNo tienes permiso para editar a este usuario según la jerarquía o empresa."
      );
      return;
    }

    if (usuario) {
      setUsuarioEditando(usuario);
      setFormData({ nombre: usuario.nombre, rol: usuario.rol, email: usuario.email, estado: usuario.estado, empresa: usuario.empresa });
    } else {
      setUsuarioEditando(null);
      setFormData(initialForm);
    }
    setModalOpen(true);
  };

  const eliminarUsuario = (id: number) => {
    const usuarioAEliminar = personal.find((p) => p.id === id);
    if (!usuarioAEliminar) return;

    if (!canDelete(currentUser, usuarioAEliminar)) {
      alert(
        "⛔ ACCESO DENEGADO\n\nNo tienes permiso para eliminar a este usuario según la jerarquía o empresa."
      );
      return;
    }

    if (window.confirm(`¿Estás seguro de eliminar a ${usuarioAEliminar.nombre}?`)) {
      setPersonal(personal.filter((p) => p.id !== id));
    }
  };

  const guardarUsuario = (e: FormEvent) => {
    e.preventDefault();

    // Validaciones básicas
    if (!formData.nombre.trim() || !formData.rol.trim() || !formData.email.trim()) {
      alert("Por favor completa nombre, rol y correo.");
      return;
    }

    // No permitir crear otro Super Admin
    if (formData.rol === "Super Admin" && !usuarioEditando) {
      alert("No puedes crear más Super Admins desde esta consola.");
      return;
    }

    // Si el rol tiene empresa mapeada y el usuario no la seleccionó, asignarla automáticamente
    const inferred = roleToCompany[formData.rol];
    const finalCompany = formData.empresa || inferred || "TVI";

    // Si estamos EDITANDO, validar que el actor tenga permisos
    if (usuarioEditando) {
      const objetivo = personal.find((p) => p.id === usuarioEditando.id)!;
      if (!canEdit(currentUser, objetivo)) {
        alert("No tienes permiso para editar a este usuario.");
        return;
      }
      setPersonal(
        personal.map((p) =>
          p.id === usuarioEditando.id ? { ...p, ...formData, empresa: finalCompany } : p
        )
      );
      setModalOpen(false);
      return;
    }

    // CREAR NUEVO USUARIO: actor debe tener permiso para crear en esa empresa/rango
    // Regla simple: solo CEO / Dueño o usuarios con rango superior pueden crear usuarios de una empresa diferente.
    // Para simplificar: permitimos creación si:
    // - actor es CEO / Dueño, o
    // - actor.empresa === finalCompany && actor.rango < nuevo.rango
    const nuevoRank = getRank(formData.rol);
    if (currentUser.rol !== "CEO / Dueño") {
      if (currentUser.empresa !== finalCompany) {
        alert("No puedes crear usuarios para otra empresa.");
        return;
      }
      if (!(getRank(currentUser.rol) < nuevoRank)) {
        alert("No puedes crear un usuario con rango igual o superior al tuyo.");
        return;
      }
    }

    const nuevo: User = {
      id: Date.now(),
      nombre: formData.nombre.trim(),
      rol: formData.rol,
      email: formData.email.trim(),
      estado: formData.estado,
      empresa: finalCompany,
    };

    setPersonal((prev) => [...prev, nuevo]);
    setModalOpen(false);
  };

  // Filtrado por búsqueda
  const personalFiltrado = personal.filter(
    (p) =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.rol.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.email.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.empresa.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="text-gray-600" />
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-violet-600 p-2 rounded-lg">
              <Users className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Gestión de Personal</h1>
            <span className="text-sm text-gray-400 ml-2">Usuario activo: <span className="font-medium text-gray-700">{currentUser.nombre} — {currentUser.rol} ({currentUser.empresa})</span></span>
          </div>
        </div>
      </header>

      {/* CONTENIDO */}
      <main className="p-8 max-w-7xl mx-auto">
        {/* BARRA HERRAMIENTAS */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-96">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por nombre, rol, email o empresa..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <button
            onClick={() => abrirModal()}
            className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-lg hover:shadow-violet-200 transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" />
            <span>Nuevo Empleado</span>
          </button>
        </div>

        {/* TABLA */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase text-xs font-semibold tracking-wider">
              <tr>
                <th className="px-6 py-4">Nombre</th>
                <th className="px-6 py-4">Rol / Cargo</th>
                <th className="px-6 py-4">Empresa</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {personalFiltrado.length > 0 ? (
                personalFiltrado.map((p) => {
                  const isSuper = isSuperAdmin(p);
                  return (
                    <tr key={p.id} className={`transition-colors group ${isSuper ? "bg-violet-50/40" : "hover:bg-gray-50"}`}>
                      <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-2">
                        {isSuper && <ShieldAlert className="w-4 h-4 text-violet-600" />}
                        {p.nombre}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{isSuper ? <span className="font-bold text-violet-700">SUPER ADMIN</span> : p.rol}</td>
                      <td className="px-6 py-4 text-gray-600">{p.empresa}</td>
                      <td className="px-6 py-4 text-gray-500 text-sm">{p.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${p.estado === "Activo" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                          {p.estado}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right flex justify-end gap-2">
                        <button
                          onClick={() => abrirModal(p)}
                          className={`p-2 rounded-lg transition-all ${isSuper ? "text-gray-300 cursor-not-allowed" : "text-gray-400 hover:text-violet-600 hover:bg-violet-100"}`}
                          title={canEdit(currentUser, p) ? "Editar" : "Sin permiso para editar"}
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => eliminarUsuario(p.id)}
                          className={`p-2 rounded-lg transition-all ${isSuper ? "text-gray-300 cursor-not-allowed" : "text-gray-400 hover:text-red-600 hover:bg-red-100"}`}
                          title={canDelete(currentUser, p) ? "Eliminar" : "Sin permiso para eliminar"}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No se encontraron empleados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative animate-scaleIn">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-xl font-bold text-gray-800 mb-6">
              {usuarioEditando ? "Editar Empleado" : "Registrar Nuevo Empleado"}
            </h2>

            <form onSubmit={guardarUsuario} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cargo / Rol</label>
                <div className="relative">
                  <select
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none appearance-none bg-white"
                    value={formData.rol}
                    onChange={(e) => {
                      const newRol = e.target.value;
                      const inferred = roleToCompany[newRol] ?? "";
                      setFormData({ ...formData, rol: newRol, empresa: inferred || formData.empresa });
                    }}
                  >
                    <option value="" disabled>Selecciona un cargo...</option>
                    {listaRoles.map((grupo, i) => (
                      <optgroup key={i} label={grupo.grupo} className="text-gray-900 font-bold bg-gray-50">
                        {grupo.roles.map((rol) => (
                          <option key={rol} value={rol} className="text-gray-600 font-normal bg-white">
                            {rol}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none bg-white"
                  value={formData.empresa}
                  onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                >
                  <option value="" disabled>Selecciona la empresa...</option>
                  {COMPANIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <p className="text-xs text-gray-400 mt-1">Si el rol está mapeado, la empresa se auto-asignará al seleccionar el rol, pero puedes cambiarla aquí.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none bg-white"
                  value={formData.estado}
                  onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                >
                  <option value="Activo">Activo</option>
                  <option value="Vacaciones">Vacaciones</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg flex items-center gap-2 shadow-md"
                >
                  <Save className="w-4 h-4" />
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
