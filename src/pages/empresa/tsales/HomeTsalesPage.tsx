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
  Phone,
  DollarSign,
  BarChart3,
  Activity,
  TrendingUp,
} from "lucide-react"
import Modal from "../../../components/Modal"

/**
 * HomeTSalesPage
 * -------------------------
 * Panel principal del GERENTE de T-Sales.
 * Desde aquí ve:
 *  - Acciones rápidas (nuevo contrato, nuevo cliente empresa, etc)
 *  - KPIs comerciales globales
 *  - Resumen de contratos recientes y actividad
 *  - Gráficos y comparaciones por área / equipos de trabajo
 */

export default function HomeTSalesPage() {
  const navigate = useNavigate()
  const go = (path: string) => navigate(path)

  // Estado para controlar apertura de Modals (acciones rápidas)
  const [openNewRequest, setNewRequest] = useState(false)
  const [openUpload, setUpload] = useState(false)
  const [openProject, setProject] = useState(false)
  const [openIncident, setIncident] = useState(false)

  return (
    <div className="flex h-screen bg-blue-50 text-gray-800">
      {/* =========================================================
          SIDEBAR / NAVBAR LATERAL — SOLO PARA T-SALES
      ========================================================== */}
      <aside className="w-72 bg-white border-r border-blue-200 shadow-xl flex flex-col">

        {/* Marca + logo T-Sales */}
        <div className="px-5 py-6 border-b border-blue-200 flex items-center gap-3">
          <img
            src="/img/T.jpg"
            className="w-12 h-12 rounded-lg shadow-md animate-scaleIn"
          />
          <div>
            <p className="text-xl font-bold text-blue-600">TSales</p>
            <span className="text-gray-500 text-xs font-medium">
              CRM Comercial — Empresa
            </span>
          </div>
        </div>

        {/* Navegación principal */}
        <nav className="flex-1 px-4 py-5 space-y-2 text-sm font-medium">

          {/* Grupo: General */}
          <p className="text-[11px] font-semibold text-gray-400 uppercase mb-1">
            General
          </p>

          <button
            onClick={() => go("/tsales/home")}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-100 text-blue-700 shadow-sm hover:shadow-md transition"
          >
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

          <div className="mt-4">
            <button onClick={() => go("/tsales/reportes")} className="nav-item">
              <BarChart3 size={18}/> Reportes comerciales
            </button>

            <button className="nav-item">
              <Activity size={18} /> Rendimiento equipos
            </button>

            <button className="nav-item">
              <DollarSign size={18} /> Ingresos & churn
            </button>
          </div>

          {/* Grupo: Configuración */}
          <div className="mt-4">
            <p className="text-[11px] font-semibold text-gray-400 uppercase mb-1">
              Administración
            </p>

            <button
              onClick={() => go("/tsales/configurar")}
              className="nav-item"
            >
              <Settings size={18} /> Configuración
            </button>
          </div>
        </nav>

        {/* Footer de sidebar */}
        <div className="px-4 py-3 text-xs text-gray-500 border-t border-blue-200">
          © TSales — 2025
        </div>
      </aside>

      {/* =========================================================
          PANEL PRINCIPAL — DASHBOARD GERENCIAL
      ========================================================== */}
      <main className="flex-1 p-10 overflow-y-auto animate-fadeIn">

        {/* Título + campana notificaciones */}
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-1">
            <h1 className="text-4xl font-extrabold text-blue-600">
              Panel Gerencial
            </h1>
            <p className="text-gray-600 text-lg">
              Control comercial y venta corporativa — Distribuidor oficial
              Movistar Empresas.
            </p>
          </div>
          <button className="p-2 bg-white border border-blue-200 rounded-lg hover:bg-blue-100 transition shadow-sm">
            <Bell size={22} className="text-blue-600" />
          </button>
        </div>

        {/* =========================================================
            ACCIONES RÁPIDAS — CONTRATOS / DOCUMENTOS / CLIENTES / INCIDENTES
        ========================================================== */}
        <div className="grid grid-cols-4 gap-5 mb-10">
          <button
            onClick={() => setNewRequest(true)}
            className="flex flex-col items-center justify-center gap-2 bg-white border border-blue-200 text-blue-600 font-semibold p-4 rounded-xl hover:bg-blue-100 hover:scale-[1.03] active:scale-95 shadow transition"
          >
            <FileText size={28} /> Nuevo contrato
          </button>

          <button
            onClick={() => setUpload(true)}
            className="flex flex-col items-center justify-center gap-2 bg-white border border-blue-200 text-blue-600 font-semibold p-4 rounded-xl hover:bg-blue-100 hover:scale-[1.03] active:scale-95 shadow transition"
          >
            <CloudUpload size={28} /> Subir documento
          </button>

          <button
            onClick={() => setProject(true)}
            className="flex flex-col items-center justify-center gap-2 bg-white border border-blue-200 text-blue-600 font-semibold p-4 rounded-xl hover:bg-blue-100 hover:scale-[1.03] active:scale-95 shadow transition"
          >
            <FolderKanban size={28} /> Nuevo cliente empresa
          </button>

          <button
            onClick={() => setIncident(true)}
            className="flex flex-col items-center justify-center gap-2 bg-white border border-blue-200 text-blue-600 font-semibold p-4 rounded-xl hover:bg-blue-100 hover:scale-[1.03] active:scale-95 shadow transition"
          >
            <LifeBuoy size={28} /> Incidente servicio
          </button>
        </div>

        {/* =========================================================
            KPIs COMERCIALES PRINCIPALES
        ========================================================== */}
        <div className="grid grid-cols-4 gap-6 mb-10">
          {/* Clientes corporativos */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition">
            <p className="text-sm text-gray-500">Clientes corporativos</p>
            <h2 className="text-4xl font-bold text-gray-800">320</h2>
            <p className="text-xs text-blue-600 mt-1">
              +18 nuevas cuentas esta semana
            </p>

            {/* mini-bar de crecimiento */}
            <div className="mt-4 h-2 w-full bg-blue-50 rounded-full overflow-hidden">
              <div className="h-2 w-[68%] bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-progressBar" />
            </div>
          </div>

          {/* Total líneas activas */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition">
            <p className="text-sm text-gray-500">Total líneas activas</p>
            <h2 className="text-4xl font-bold text-gray-800">11.742</h2>
            <p className="text-xs text-blue-600 mt-1">
              T-Sales — segmento empresas Movistar
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
              <Activity size={14} className="text-blue-500" />
              Crecimiento sostenido últimos 6 meses.
            </div>
          </div>

          {/* Ingresos mensuales */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition">
            <p className="text-sm text-gray-500">Ingresos mensuales estimados</p>
            <h2 className="text-4xl font-bold text-gray-800">$58M</h2>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp size={14} /> +14% vs mes anterior
            </p>

            {/* mini gráfico de barras simples */}
            <div className="mt-4 flex items-end gap-1 h-16">
              <div className="flex-1 bg-blue-100 rounded-t-md" style={{ height: "45%" }} />
              <div className="flex-1 bg-blue-200 rounded-t-md" style={{ height: "60%" }} />
              <div className="flex-1 bg-blue-300 rounded-t-md" style={{ height: "80%" }} />
              <div className="flex-1 bg-blue-500 rounded-t-md" style={{ height: "100%" }} />
            </div>
            <p className="text-[11px] text-gray-400 mt-1">Últimos 4 meses</p>
          </div>

          {/* Churn rate */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition">
            <p className="text-sm text-gray-500">Churn rate (baja de clientes)</p>
            <h2 className="text-4xl font-bold text-gray-800">3.2%</h2>
            <p className="text-xs mt-1 font-semibold">
              Objetivo: <span className="text-red-600">&lt; 2.5%</span>
            </p>

            <div className="mt-4">
              <div className="w-full bg-red-50 rounded-full h-2 overflow-hidden">
                <div className="bg-red-400 h-2 w-[64%] animate-progressBar" />
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                Plan de retención en ejecución (clientes de alto valor).
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================
            CONTRATOS RECIENTES & ACTIVIDAD
        ========================================================== */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          {/* Tabla de contratos recientes */}
          <div className="col-span-2 bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Contratos recientes
              </h3>
              <button className="text-sm text-blue-600 hover:underline">
                Ver todos
              </button>
            </div>

            <table className="w-full text-sm">
              <thead className="text-gray-500">
                <tr>
                  <th className="py-2 text-left">Cliente</th>
                  <th className="py-2 text-left">Servicio</th>
                  <th className="py-2 text-left">Estado</th>
                  <th className="py-2 text-left">Fecha</th>
                </tr>
              </thead>

              <tbody className="text-gray-700">
                <tr className="border-t">
                  <td>Ingram Micro</td>
                  <td>120 líneas corporativas</td>
                  <td>
                    <span className="px-2 py-1 rounded-lg text-xs bg-green-100 text-green-700">
                      Activo
                    </span>
                  </td>
                  <td>15 Feb 2026</td>
                </tr>

                <tr className="border-t">
                  <td>Banco BCI</td>
                  <td>250 líneas + roaming</td>
                  <td>
                    <span className="px-2 py-1 rounded-lg text-xs bg-yellow-100 text-yellow-700">
                      En renovación
                    </span>
                  </td>
                  <td>13 Feb 2026</td>
                </tr>

                <tr className="border-t">
                  <td>RedSalud</td>
                  <td>85 SIM corporativas</td>
                  <td>
                    <span className="px-2 py-1 rounded-lg text-xs bg-blue-100 text-blue-700">
                      Implementación
                    </span>
                  </td>
                  <td>10 Feb 2026</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Actividad reciente del equipo comercial */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Actividad reciente
            </h3>

            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-800 font-medium">
                  Miguel cerró contrato con FASA
                </p>
                <p className="text-xs text-gray-500">
                  Ventas terreno — Hoy, 10:40
                </p>
              </div>

              <div>
                <p className="text-gray-800 font-medium">
                  Camila subió propuesta “Oferta CLARO.pdf”
                </p>
                <p className="text-xs text-gray-500">
                  Unidad comercial — Ayer, 18:22
                </p>
              </div>

              <div>
                <p className="text-gray-800 font-medium">
                  Flujo de firma electrónica actualizado para Enex
                </p>
                <p className="text-xs text-gray-500">
                  Legal — Ayer, 11:08
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            DASHBOARD COMERCIAL — GRAFICOS “FRONT PURO”
        ========================================================== */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          {/* Ventas por área */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 col-span-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-1 flex items-center gap-2">
              <BarChart3 className="text-blue-600" /> Servicios vendidos por área
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Distribución de contratos entre equipos comerciales de T-Sales.
            </p>

            {/* Barras horizontales por área */}
            <div className="space-y-3 text-sm">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Ventas terreno</span>
                  <span className="font-semibold text-gray-700">74 servicios</span>
                </div>
                <div className="w-full bg-blue-50 rounded-full h-3 overflow-hidden">
                  <div className="h-3 w-[82%] bg-gradient-to-r from-blue-400 to-blue-700 rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Ventas telefónicas</span>
                  <span className="font-semibold text-gray-700">56 servicios</span>
                </div>
                <div className="w-full bg-blue-50 rounded-full h-3 overflow-hidden">
                  <div className="h-3 w-[62%] bg-gradient-to-r from-sky-400 to-sky-600 rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Postventa empresas</span>
                  <span className="font-semibold text-gray-700">29 upgrades</span>
                </div>
                <div className="w-full bg-blue-50 rounded-full h-3 overflow-hidden">
                  <div className="h-3 w-[38%] bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Alianzas / canales externos</span>
                  <span className="font-semibold text-gray-700">18 servicios</span>
                </div>
                <div className="w-full bg-blue-50 rounded-full h-3 overflow-hidden">
                  <div className="h-3 w-[24%] bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Distribución de tipo de servicio */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              Portafolio de servicios
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Mix de productos contratados en el último período.
            </p>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Planes móviles corporativos</span>
                <span className="font-semibold">52%</span>
              </div>
              <div className="w-full bg-blue-50 rounded-full h-2 overflow-hidden">
                <div className="h-2 w-[52%] bg-blue-500 rounded-full" />
              </div>

              <div className="flex justify-between mt-2">
                <span>Internet fibra / dedicado</span>
                <span className="font-semibold">31%</span>
              </div>
              <div className="w-full bg-blue-50 rounded-full h-2 overflow-hidden">
                <div className="h-2 w-[31%] bg-sky-500 rounded-full" />
              </div>

              <div className="flex justify-between mt-2">
                <span>Telefonía fija / portabilidad</span>
                <span className="font-semibold">17%</span>
              </div>
              <div className="w-full bg-blue-50 rounded-full h-2 overflow-hidden">
                <div className="h-2 w-[17%] bg-indigo-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            INDICADORES GLOBALes (OPERACIONALES)
        ========================================================== */}
        <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm mt-4 animate-fadeUp">
          <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
            <TrendingUp className="text-blue-600" />
            Indicadores globales T-Sales
          </h3>

          <div className="grid grid-cols-4 gap-6 mb-6">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md transition-all animate-scaleIn">
              <p className="text-sm text-gray-500">Satisfacción clientes empresa</p>
              <p className="text-3xl font-extrabold text-green-500 mt-1">92%</p>
              <p className="text-xs text-green-600 mt-1 font-semibold">
                ↑ +4.2% este mes
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md transition-all animate-scaleIn">
              <p className="text-sm text-gray-500">Tiempo medio respuesta postventa</p>
              <p className="text-3xl font-extrabold text-blue-500 mt-1">1.4h</p>
              <p className="text-xs text-blue-700 mt-1 font-semibold">
                ↓ -0.6h optimizado
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md transition-all animate-scaleIn">
              <p className="text-sm text-gray-500">Incidentes críticos mensuales</p>
              <p className="text-3xl font-extrabold text-red-500 mt-1">37</p>
              <p className="text-xs text-red-700 mt-1 font-semibold">
                ↓ -12 vs mes previo
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md transition-all animate-scaleIn">
              <p className="text-sm text-gray-500">Eficiencia operación comercial</p>
              <p className="text-3xl font-extrabold text-purple-500 mt-1">86%</p>
              <p className="text-xs text-purple-700 mt-1 font-semibold">
                ↑ +2.7% por automatización
              </p>
            </div>
          </div>

          {/* Barra de “carga del sistema” */}
          <div className="mt-4">
            <p className="text-sm text-gray-600 font-medium">
              Nivel de carga actual del sistema CRM
            </p>
            <div className="w-full bg-gray-200 rounded-full h-4 mt-2 overflow-hidden">
              <div className="bg-green-400 h-4 rounded-full transition-all duration-700 w-[68%]" />
            </div>
            <p className="text-xs text-gray-500 mt-1">Operando en nivel estable.</p>
          </div>
        </div>

        {/* =========================================================
            MODALS — FORMULARIOS DE ACCIONES RÁPIDAS
        ========================================================== */}

        {/* Nuevo contrato */}
        {openNewRequest && (
          <Modal title="Nuevo contrato" close={() => setNewRequest(false)}>
            <div className="space-y-4">
              <label className="text-sm font-medium">Cliente empresa</label>
              <input className="input" placeholder="Ej: Banco BCI" />

              <label className="text-sm font-medium">Cantidad de líneas</label>
              <input type="number" className="input" placeholder="Ej: 120" />

              <label className="text-sm font-medium">Tipo de plan</label>
              <select className="input">
                <option>Corporativo datos ilimitados</option>
                <option>Corporativo voz + datos</option>
                <option>Roaming empresas</option>
                <option>Mixto (movil + fijo)</option>
              </select>

              <label className="text-sm font-medium">Fecha inicio contrato</label>
              <input type="date" className="input" />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  className="btn-cancel"
                  onClick={() => setNewRequest(false)}
                >
                  Cancelar
                </button>
                <button className="btn-red">Registrar contrato</button>
              </div>
            </div>
          </Modal>
        )}

        {/* Subir documento */}
        {openUpload && (
          <Modal title="Subir documento" close={() => setUpload(false)}>
            <div className="space-y-4">
              <label className="text-sm font-medium">Nombre del documento</label>
              <input
                className="input"
                placeholder="Ej: tarifas_corporativas_2026.pdf"
              />

              <label className="text-sm font-medium">Tipo</label>
              <select className="input">
                <option>Contrato</option>
                <option>Propuesta comercial</option>
                <option>Legal</option>
                <option>Finanzas</option>
              </select>

              <label className="text-sm font-medium">Seleccionar archivo</label>
              <input type="file" className="input-file" />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  className="btn-cancel"
                  onClick={() => setUpload(false)}
                >
                  Cancelar
                </button>
                <button className="btn-red">Subir archivo</button>
              </div>
            </div>
          </Modal>
        )}

        {/* Nuevo cliente empresa */}
        {openProject && (
          <Modal
            title="Nuevo cliente empresa"
            close={() => setProject(false)}
          >
            <div className="space-y-4">
              <label className="text-sm font-medium">Razón social</label>
              <input className="input" placeholder="Ej: Ingram Micro S.A." />

              <label className="text-sm font-medium">Industria</label>
              <select className="input">
                <option>Retail</option>
                <option>Financiera</option>
                <option>Salud</option>
                <option>Servicios</option>
                <option>Otros</option>
              </select>

              <label className="text-sm font-medium">Contacto principal</label>
              <input
                className="input"
                placeholder="Ej: Juan Pérez — Gerente TI"
              />

              <label className="text-sm font-medium">Teléfono / correo</label>
              <input className="input" placeholder="+56 9 xxxx xxxx / mail@empresa.cl" />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  className="btn-cancel"
                  onClick={() => setProject(false)}
                >
                  Cancelar
                </button>
                <button className="btn-red">Registrar cliente</button>
              </div>
            </div>
          </Modal>
        )}

        {/* Incidente servicio */}
        {openIncident && (
          <Modal title="Incidente de servicio" close={() => setIncident(false)}>
            <div className="space-y-4">
              <label className="text-sm font-medium">Tipo de incidente</label>
              <select className="input">
                <option>Caída de internet</option>
                <option>Líneas móviles sin servicio</option>
                <option>Problemas de facturación</option>
                <option>Soporte / postventa</option>
              </select>

              <label className="text-sm font-medium">Cliente afectado</label>
              <input className="input" placeholder="Ej: RedSalud" />

              <label className="text-sm font-medium">Descripción</label>
              <textarea
                className="input h-24"
                placeholder="Describe el impacto, sucursales afectadas, etc."
              />

              <label className="text-sm font-medium">Prioridad</label>
              <select className="input">
                <option>Crítica</option>
                <option>Alta</option>
                <option>Media</option>
                <option>Baja</option>
              </select>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  className="btn-cancel"
                  onClick={() => setIncident(false)}
                >
                  Cancelar
                </button>
                <button className="btn-red">Reportar incidente</button>
              </div>
            </div>
          </Modal>
        )}
      </main>
    </div>
  )
}
