import React from "react"
import { useNavigate } from "react-router-dom"
import {
  Users,
  TrendingUp,
  BarChart3,
  Target,
  Medal,
  Phone,
  ClipboardList,
  LifeBuoy,
  Settings,
  FileText,
  FolderKanban,
  CloudUpload,
  BarChart2,
  Briefcase
} from "lucide-react"

import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, AreaChart, Area,
  PieChart, Pie, Cell
} from "recharts"


export default function ReportesTSalesPage() {

  /* ======================================================
     TEST DATA (luego vendrá de la BD real y microservicios)
  ====================================================== */
  const navigate = useNavigate()
  const go = (path: string) => navigate(path)

  const dataMensual = [
    { mes: "Ago", ventas: 440, churn: 7 },
    { mes: "Sep", ventas: 490, churn: 6 },
    { mes: "Oct", ventas: 520, churn: 5 },
    { mes: "Nov", ventas: 580, churn: 5 },
    { mes: "Dic", ventas: 610, churn: 4 },
    { mes: "Ene", ventas: 685, churn: 4 },
    { mes: "Feb", ventas: 742, churn: 3 },
  ]

  const ingresosMensuales = [
    { mes: "Ago", monto: 38 },
    { mes: "Sep", monto: 42 },
    { mes: "Oct", monto: 44 },
    { mes: "Nov", monto: 50 },
    { mes: "Dic", monto: 53 },
    { mes: "Ene", monto: 55 },
    { mes: "Feb", monto: 58 },
  ]

  const clientesTipo = [
    { tipo: "PyME", value: 52 },
    { tipo: "Mediana", value: 28 },
    { tipo: "Corporación", value: 20 },
  ]
  const colorsClientes = ["#0A84FF", "#34C759", "#FFB800"]

  const equipos = [
    { equipo: "Terreno", valor: 74 },
    { equipo: "Telefónico", valor: 56 },
    { equipo: "Postventa", valor: 29 },
    { equipo: "Alianzas", valor: 18 },
  ]

  return (
    <div className="flex h-screen bg-blue-50 text-gray-800">

      {/* =========================================================
          SIDEBAR T-SALES
      ========================================================== */}
      <aside className="w-72 bg-white border-r border-blue-200 shadow-xl flex flex-col">

        <div className="px-5 py-6 border-b border-blue-200 flex items-center gap-3">
          <img src="/img/T.jpg" className="w-12 h-12 rounded-lg shadow-md" />
          <div>
            <p className="text-xl font-bold text-blue-600">TSales</p>
            <span className="text-gray-500 text-xs font-medium">
              CRM Comercial
            </span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-5 space-y-2 text-sm font-medium">

          <button onClick={() => go("/tsales/home")} className="nav-item">
            <BarChart2 size={18} /> Dashboard
          </button>

          <button onClick={() => go("/tsales/personas")} className="nav-item">
            <Users size={18} /> Personas
          </button>

          <button onClick={() => go("/tsales/contratos")} className="nav-item">
            <FileText size={18} /> Contratos
          </button>

          <button onClick={() => go("/tsales/planes")} className="nav-item">
            <Phone size={18} /> Planes
          </button>

          <button onClick={() => go("/tsales/tareas")} className="nav-item">
            <ClipboardList size={18} /> Tareas
          </button>

          <button onClick={() => go("/tsales/tickets")} className="nav-item">
            <LifeBuoy size={18} /> Tickets
          </button>

          <button onClick={() => go("/tsales/reportes")} className="nav-item bg-blue-100 text-blue-700 shadow">
            <BarChart3 size={18} /> Reportes comerciales
          </button>
        </nav>

        <div className="px-4 py-3 text-xs text-gray-500 border-t border-blue-200">
          © TSales — 2025
        </div>

      </aside>

      {/* =========================================================
          CONTENIDO PRINCIPAL
      ========================================================== */}
      <main className="flex-1 p-10 overflow-y-auto animate-fadeIn">

        {/* ================== HEADER GENERAL ================== */}
        <h1 className="text-4xl font-extrabold text-blue-600 mb-4">
          Inteligencia de Ventas — Reportes Comerciales
        </h1>
        <p className="text-gray-600 text-lg mb-10">
          Información estratégica para decisiones directivas
        </p>


        {/* ================== KPIs PRINCIPALES ================== */}
        <div className="grid grid-cols-4 gap-6 mb-10">

          <div className="bg-white border border-gray-200 shadow p-6 rounded-xl">
            <p className="text-sm text-gray-500">Ventas del mes</p>
            <p className="text-4xl font-bold text-blue-600">742</p>
            <p className="text-xs text-green-600">+9% crecimiento</p>
          </div>

          <div className="bg-white border border-gray-200 shadow p-6 rounded-xl">
            <p className="text-sm text-gray-500">Ingresos (MM CLP)</p>
            <p className="text-4xl font-bold text-blue-600">$58</p>
            <p className="text-xs text-green-600">+6% crecimiento</p>
          </div>

          <div className="bg-white border border-gray-200 shadow p-6 rounded-xl">
            <p className="text-sm text-gray-500">Churn</p>
            <p className="text-4xl font-bold text-red-600">3%</p>
            <p className="text-xs text-green-600">Mejora sostenida</p>
          </div>

          <div className="bg-white border border-gray-200 shadow p-6 rounded-xl">
            <p className="text-sm text-gray-500">Ticket promedio</p>
            <p className="text-4xl font-bold text-blue-600">$78.000</p>
            <p className="text-xs text-blue-500">clientes corporativos</p>
          </div>

        </div>




        {/* ================== VENTAS vs CHURN ================== */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow mb-10">

          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="text-blue-600" />
            Evolución mensual — Ventas vs Churn
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dataMensual}>
              <CartesianGrid strokeDasharray="4 4" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="ventas" stroke="#007AFF" strokeWidth={3} />
              <Line type="monotone" dataKey="churn" stroke="#FF3B30" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>

        </div>


        {/* ================== INGRESOS MENSUALES ================== */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow mb-10">

          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <BarChart3 className="text-blue-600" />
            Ingresos mensuales (en millones de CLP)
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ingresosMensuales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="monto" fill="#007AFF" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

        </div>


        {/* ================== DISTRIBUCIÓN CLIENTES ================== */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow mb-10">

          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Users className="text-blue-600" />
            Distribución por tipo de empresa
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie

                dataKey="value"
                data={clientesTipo}
                cx="50%"
                cy="50%"
                outerRadius={110}
                label
              >
                {clientesTipo.map((_, i) => (
                  <Cell key={i} fill={colorsClientes[i]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

        </div>


        {/* ================== VENTAS POR EQUIPO ================== */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow mb-10">

          <h2 className="text-xl font-bold text-gray-700 mb-6 flex items-center gap-2">
            <Users className="text-blue-600" /> Rendimiento por Equipo Comercial
          </h2>

          <div className="grid grid-cols-4 gap-6 text-sm">
            {equipos.map((e, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-xl shadow hover:scale-[1.05] transition transform duration-200"
              >
                <p className="font-semibold">{e.equipo}</p>
                <p className="text-3xl font-extrabold text-blue-700 mt-1">{e.valor}</p>
                <p className="text-xs text-gray-600 mt-1">ventas efectivas</p>
              </div>
            ))}
          </div>

        </div>


      </main>
    </div>
  )
}

