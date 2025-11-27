import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Users,
  FileText,
  ClipboardList,
  LifeBuoy,
  FolderKanban,
  CloudUpload,
  Bell,
  Settings,
  BarChart2,
  Search,
  ChevronDown,
  Eye,
  UserCheck,
  UserX,
  Phone,
  DollarSign
} from "lucide-react"

export default function PersonasTSalesPage() {

  const navigate = useNavigate()
  const go = (path: string) => navigate(path)

  const [expandedRow, setExpandedRow] = useState<number | null>(null)
  const [search, setSearch] = useState("")
  const [filtroCategoria, setFiltroCategoria] = useState("Todos")

  const personas = [
    {
      id: 1,
      nombre: "María González",
      email: "maria.gonzalez@cliente.cl",
      area: "Clientes",
      categoria: "Contabilidad",
      estado: "Activo",
      telefono: "+56 9 1234 5678",
      login: "15/11/2025",
      proyectos: 3
    },
    {
      id: 2,
      nombre: "Pedro Rojas",
      email: "projas@cliente.cl",
      area: "Interno",
      categoria: "Tributario",
      estado: "Activo",
      telefono: "+56 9 5444 2111",
      login: "12/11/2025",
      proyectos: 1
    },
    {
      id: 3,
      nombre: "Ana Torres",
      email: "ana.torres@cliente.cl",
      area: "Clientes",
      categoria: "Entre otros",
      estado: "Activo",
      telefono: "+56 9 8877 1200",
      login: "13/11/2025",
      proyectos: 2
    }
  ]

  const categorias = ["Todos", "Contabilidad", "Tributario", "Entre otros"]

  const filtrar = personas.filter(p =>
    (filtroCategoria === "Todos" || p.categoria === filtroCategoria) &&
    (p.nombre.toLowerCase().includes(search.toLowerCase()) ||
     p.email.toLowerCase().includes(search.toLowerCase()) ||
     p.area.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="flex h-screen bg-blue-50 text-gray-800">

      {/* ========================= NAVBAR ========================= */}
      <aside className="w-72 bg-white border-r border-blue-200 shadow-xl flex flex-col animate-slideRight">

        <div className="px-5 py-6 border-b border-blue-200 flex items-center gap-3">
          <img src="/img/T.jpg" className="w-12 h-12 rounded-lg shadow-md animate-scaleIn" />
          <div>
            <p className="text-xl font-bold text-blue-600">TSales</p>
            <span className="text-gray-500 text-xs font-medium">CRM Comercial — Empresa</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-5 space-y-2 text-sm font-medium">

          <button onClick={() => go("/tsales/home")} className="nav-item">
           <BarChart2 size={18}/> Dashboard
          </button>

          <button onClick={() => go("/tsales/personas")} className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg font-semibold border border-blue-300 shadow-sm">
            <Users size={18}/> Personas
          </button>

          <button onClick={() => go("/tsales/contratos")} className="nav-item">
            <FileText size={18}/> Contratos
          </button>

          <button onClick={() => go("/tsales/planes")} className="nav-item">
            <Phone size={18}/> Planes
          </button>

          <button onClick={() => go("/tsales/tareas")} className="nav-item">
            <ClipboardList size={18}/> Tareas
          </button>

          <button onClick={() => go("/tsales/tickets")} className="nav-item">
            <LifeBuoy size={18}/> Tickets
          </button>

          <button onClick={() => go("/tsales/configurar")} className="nav-item">
            <Settings size={18}/> Configuración
          </button>

        </nav>

        <div className="px-4 py-3 text-xs text-gray-500 border-t border-blue-200">
          © TSales — 2025
        </div>

      </aside>


      {/* ========================= PANEL ========================= */}
      <main className="flex-1 p-10 overflow-y-auto animate-fadeIn">

        <h1 className="text-4xl font-extrabold text-blue-600 mb-1">Personas</h1>
        <p className="text-gray-600 text-lg mb-6">
          Directorio y usuarios administrables de TSales.
        </p>

        
        {/* ================= BUSCADOR + CATEGORIAS ================= */}
        <div className="flex justify-between items-center mb-6">

          <div className="flex gap-3">
            {categorias.map(cat => (
              <button
                key={cat}
                onClick={() => setFiltroCategoria(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition animate-scaleIn ${
                  filtroCategoria === cat 
                  ? "bg-blue-600 text-white border-blue-600" 
                  : "bg-white border-gray-300 text-gray-600 hover:bg-blue-100 hover:border-blue-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative">
            <input
              className="border border-gray-300 rounded-lg pl-10 pr-3 py-2 w-80 focus:border-blue-500 outline-none shadow-sm"
              placeholder="Buscar por nombre, correo o área…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>

        </div>


        {/* ================= TABLA ================= */}
        <table className="w-full bg-white rounded-xl shadow border border-gray-200 overflow-hidden animate-scaleIn">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Área</th>
              <th className="p-3 text-left">Categoría</th>
              <th className="p-3 text-left">Estado</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {filtrar.map((p) => (
              <>
                <tr
                  key={p.id}
                  className="border-t hover:bg-blue-50 cursor-pointer transition"
                  onClick={() => setExpandedRow(expandedRow === p.id ? null : p.id)}
                >
                  <td className="p-3 font-mono text-gray-500">00{p.id}</td>
                  <td className="p-3">{p.nombre}</td>
                  <td className="p-3">{p.email}</td>
                  <td className="p-3">{p.area}</td>
                  <td className="p-3">{p.categoria}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      p.estado === "Activo"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}>
                      {p.estado}
                    </span>
                  </td>

                  <td className="p-3 flex justify-center gap-2 text-blue-600">

                    <ChevronDown
                      size={18}
                      className={`transition ${expandedRow === p.id && "rotate-180"}`}
                    />

                    <Eye size={18}/>
                  </td>
                </tr>

                {expandedRow === p.id && (
                  <tr className="bg-blue-50 animate-fadeUp">
                    <td colSpan={7} className="p-5">

                      <div className="grid grid-cols-3 text-sm">

                        <div>
                          <h4 className="font-semibold mb-2">Detalles de contacto</h4>
                          <p>Número: {p.telefono}</p>
                          <p>ID Usuario: {p.id}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Actividad</h4>
                          <p>Último login: {p.login}</p>
                          <p>Proyectos activos: {p.proyectos}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Administración</h4>
                          <div className="flex gap-3">

                            <button className="flex items-center gap-1 bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700">
                              <UserCheck size={16}/> Habilitar
                            </button>

                            <button className="flex items-center gap-1 bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700">
                              <UserX size={16}/> Deshabilitar
                            </button>

                          </div>
                        </div>

                      </div>

                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>

      </main>
    </div>
  )
}
