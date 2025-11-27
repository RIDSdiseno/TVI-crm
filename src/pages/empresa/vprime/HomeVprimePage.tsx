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
  BarChart2
} from "lucide-react"
import Modal from "../../../components/Modal"

export default function HomeVprimePage() {

  const navigate = useNavigate()
  const go = (path: string) => navigate(path)

  const [openNewRequest, setNewRequest] = useState(false)
  const [openUpload, setUpload] = useState(false)
  const [openProject, setProject] = useState(false)
  const [openIncident, setIncident] = useState(false)

  return (
    <div className="flex h-screen bg-red-50 text-gray-800">

      <aside className="w-72 bg-white border-r border-red-200 shadow-xl flex flex-col">
        <div className="px-5 py-6 border-b border-red-200 flex items-center gap-3">
          <img src="/img/V.jpg" className="w-12 h-12 rounded-lg shadow-md" />
          <div>
            <p className="text-xl font-bold text-red-600">VPrime</p>
            <span className="text-gray-500 text-xs font-medium">Intranet corporativa</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-5 space-y-2 text-sm font-medium">
          <button onClick={() => go("/vprime/home")} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-100 text-red-700 shadow-sm hover:shadow-md transition">
            <BarChart2 size={18}/> Dashboard
          </button>
          <button onClick={() => go("/vprime/personas")} className="nav-item">
            <Users size={18}/> Personas
          </button>
          <button onClick={() => go("/vprime/drive")} className="nav-item">
            <CloudUpload size={18}/> Documentos
          </button>
          <button onClick={() => go("/vprime/tareas")} className="nav-item">
            <ClipboardList size={18}/> Tareas
          </button>
          <button onClick={() => go("/vprime/tickets")} className="nav-item">
            <LifeBuoy size={18}/> Tickets
          </button>
          <button onClick={() => go("/vprime/configurar")} className="nav-item">
            <Settings size={18}/> Configuración
          </button>
        </nav>

        <div className="px-4 py-3 text-xs text-gray-500 border-t border-red-200">
          © VPrime — 2025
        </div>
      </aside>

      <main className="flex-1 p-10 overflow-y-auto animate-fadeIn">

        <div className="flex justify-between items-center mb-8">
          <div className="space-y-1">
            <h1 className="text-4xl font-extrabold text-red-600">Panel Gerencial</h1>
            <p className="text-gray-600 text-lg">Gestión interna — Área operativa</p>
          </div>
          <button className="p-2 bg-white border border-red-200 rounded-lg hover:bg-red-100 transition shadow-sm">
            <Bell size={22} className="text-red-600"/>
          </button>
        </div>

        <div className="grid grid-cols-4 gap-5 mb-10">
          <button onClick={() => setNewRequest(true)} className="flex flex-col items-center justify-center gap-2 bg-white border border-red-200 text-red-600 font-semibold p-4 rounded-xl hover:bg-red-100 hover:scale-[1.03] active:scale-95 shadow transition">
            <FileText size={28}/> Nueva solicitud
          </button>

          <button onClick={() => setUpload(true)} className="flex flex-col items-center justify-center gap-2 bg-white border border-red-200 text-red-600 font-semibold p-4 rounded-xl hover:bg-red-100 hover:scale-[1.03] active:scale-95 shadow transition">
            <CloudUpload size={28}/> Subir documento
          </button>

          <button onClick={() => setProject(true)} className="flex flex-col items-center justify-center gap-2 bg-white border border-red-200 text-red-600 font-semibold p-4 rounded-xl hover:bg-red-100 hover:scale-[1.03] active:scale-95 shadow transition">
            <FolderKanban size={28}/> Crear proyecto
          </button>

          <button onClick={() => setIncident(true)} className="flex flex-col items-center justify-center gap-2 bg-white border border-red-200 text-red-600 font-semibold p-4 rounded-xl hover:bg-red-100 hover:scale-[1.03] active:scale-95 shadow transition">
            <LifeBuoy size={28}/> Reportar incidencia
          </button>
        </div>

        {/* ========================= MODALS ========================= */}

        {openNewRequest && (
          <Modal title="Nueva solicitud" close={() => setNewRequest(false)}>
            <div className="space-y-4">
              <label className="text-sm font-medium">Tipo de solicitud</label>
              <select className="input">
                <option>Acceso a documento</option>
                <option>Solicitud compra</option>
                <option>Derivación cliente</option>
                <option>Aprobación directiva</option>
              </select>
              <label className="text-sm font-medium">Descripción</label>
              <textarea className="input h-24" placeholder="Descripción detallada..."></textarea>
              <label className="text-sm font-medium">Fecha requerida</label>
              <input type="date" className="input"/>
              <div className="flex justify-end gap-3 pt-2">
                <button className="btn-cancel" onClick={() => setNewRequest(false)}>Cancelar</button>
                <button className="btn-red">Enviar solicitud</button>
              </div>
            </div>
          </Modal>
        )}

        {openUpload && (
          <Modal title="Subir documento" close={() => setUpload(false)}>
            <div className="space-y-4">
              <label className="text-sm font-medium">Nombre del documento</label>
              <input className="input" placeholder="Ej: informe_finanzas_Q4"/>
              <label className="text-sm font-medium">Categoría</label>
              <select className="input">
                <option>Clientes</option>
                <option>Legal</option>
                <option>Finanzas</option>
                <option>Administración</option>
                <option>Otros</option>
              </select>
              <label className="text-sm font-medium">Seleccionar archivo</label>
              <input type="file" className="input-file" />
              <div className="flex justify-end gap-3 pt-2">
                <button className="btn-cancel" onClick={() => setUpload(false)}>Cancelar</button>
                <button className="btn-red">Subir archivo</button>
              </div>
            </div>
          </Modal>
        )}

        {openProject && (
          <Modal title="Crear proyecto" close={() => setProject(false)}>
            <div className="space-y-4">
              <label className="text-sm font-medium">Nombre del proyecto</label>
              <input className="input" placeholder="Ej: Expansión VIP Chile"/>
              <label className="text-sm font-medium">Tipo</label>
              <select className="input">
                <option>Comercial</option>
                <option>Marketing</option>
                <option>Infraestructura</option>
                <option>Financiero</option>
                <option>Privado</option>
              </select>
              <label className="text-sm font-medium">Descripción</label>
              <textarea className="input h-24" placeholder="Detalles del proyecto..."></textarea>
              <label className="text-sm font-medium">Prioridad</label>
              <select className="input">
                <option>Alta</option>
                <option>Media</option>
                <option>Baja</option>
              </select>
              <div className="flex justify-end gap-3 pt-2">
                <button className="btn-cancel" onClick={() => setProject(false)}>Cancelar</button>
                <button className="btn-red">Crear proyecto</button>
              </div>
            </div>
          </Modal>
        )}

        {openIncident && (
          <Modal title="Reportar incidencia" close={() => setIncident(false)}>
            <div className="space-y-4">
              <label className="text-sm font-medium">Tipo de incidencia</label>
              <select className="input">
                <option>Cliente</option>
                <option>Sistema</option>
                <option>Operación</option>
                <option>Gestión</option>
                <option>Otros</option>
              </select>
              <label className="text-sm font-medium">Descripción</label>
              <textarea className="input h-24" placeholder="Describe el problema..."></textarea>
              <label className="text-sm font-medium">Nivel de urgencia</label>
              <select className="input">
                <option>Crítica</option>
                <option>Alta</option>
                <option>Normal</option>
              </select>
              <div className="flex justify-end gap-3 pt-2">
                <button className="btn-cancel" onClick={() => setIncident(false)}>Cancelar</button>
                <button className="btn-red">Reportar</button>
              </div>
            </div>
          </Modal>
        )}
    {/* ======================= DASHBOARD NUEVO ======================= */}

<div className="mt-10">

  {/* ======================= KPI CARDS ======================= */}
  <div className="grid grid-cols-4 gap-6 mb-10">

    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <p className="text-sm text-gray-500">Colaboradores activos</p>
      <h2 className="text-4xl font-bold text-gray-800">312</h2>
      <p className="text-xs text-gray-400 mt-1">Últimos 30 días</p>
    </div>

    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <p className="text-sm text-gray-500">Documentos nuevos</p>
      <h2 className="text-4xl font-bold text-gray-800">128</h2>
      <p className="text-xs text-gray-400 mt-1">Esta semana</p>
    </div>

    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <p className="text-sm text-gray-500">Proyectos en curso</p>
      <h2 className="text-4xl font-bold text-gray-800">17</h2>
      <p className="text-xs text-gray-400 mt-1">Área TI y Operaciones</p>
    </div>

    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <p className="text-sm text-gray-500">Tickets abiertos</p>
      <h2 className="text-4xl font-bold text-gray-800">9</h2>
      <p className="text-xs text-gray-400 mt-1">Soporte TI</p>
    </div>

  </div>


  <div className="grid grid-cols-3 gap-6">

    {/* ======== TABLA TAREAS ======== */}
    <div className="col-span-2 bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-5">

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Tareas pendientes</h3>
        <button className="text-sm text-blue-600 hover:underline">Ver todas</button>
      </div>

      <table className="w-full text-sm">
        <thead className="text-gray-500">
          <tr>
            <th className="py-2 text-left">ID</th>
            <th className="py-2 text-left">Tarea</th>
            <th className="py-2 text-left">Estado</th>
            <th className="py-2 text-left">Vence</th>
          </tr>
        </thead>

        <tbody className="text-gray-700">

          <tr className="border-t">
            <td>#001</td>
            <td>Actualizar política de vacaciones 2026<br/> 
              <span className="text-xs text-gray-500">Responsable: RR.HH.</span>
            </td>
            <td><span className="px-2 py-1 rounded-lg text-xs bg-yellow-100 text-yellow-700">En curso</span></td>
            <td>15 Nov 2025</td>
          </tr>

          <tr className="border-t">
            <td>#002</td>
            <td>Cierre de sprint #12 – Intranet Cintax<br/> 
              <span className="text-xs text-gray-500">Responsable: TI</span>
            </td>
            <td><span className="px-2 py-1 rounded-lg text-xs bg-green-100 text-green-700">Completada</span></td>
            <td>08 Nov 2025</td>
          </tr>

          <tr className="border-t">
            <td>#003</td>
            <td>Revisión de contratos de proveedores<br/> 
              <span className="text-xs text-gray-500">Responsable: Legal</span>
            </td>
            <td><span className="px-2 py-1 rounded-lg text-xs bg-red-100 text-red-700">Bloqueada</span></td>
            <td>20 Nov 2025</td>
          </tr>

          <tr className="border-t">
            <td>#004</td>
            <td>Capacitación de inducción (cohorte 11)<br/>
              <span className="text-xs text-gray-500">Responsable: Personas</span>
            </td>
            <td><span className="px-2 py-1 rounded-lg text-xs bg-yellow-100 text-yellow-700">En curso</span></td>
            <td>22 Nov 2025</td>
          </tr>

        </tbody>
      </table>

    </div>


    {/* ======== ACTIVIDAD RECIENTE ======== */}
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">

      <h3 className="text-lg font-semibold text-gray-800 mb-4">Actividad reciente</h3>

      <div className="space-y-4 text-sm">

        <div>
          <p className="text-gray-800 font-medium">María cargó “Política de Gastos v2.pdf”</p>
          <p className="text-xs text-gray-500">Finanzas / Políticas — Hoy, 11:20 </p>
        </div>

        <div>
          <p className="text-gray-800 font-medium">Equipo TI cerró ticket #2381</p>
          <p className="text-xs text-gray-500">Incidente VPN — Ayer, 18:44 </p>
        </div>

        <div>
          <p className="text-gray-800 font-medium">Se creó el proyecto ‘Onboarding 2026’</p>
          <p className="text-xs text-gray-500">Personas / Capacitación — Ayer, 09:02 </p>
        </div>

      </div>

    </div>

  </div>

</div>
{/* KPI SECUNDARIO ANIMADO */}
<div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm mt-10 animate-fadeUp">
  
  <h3 className="text-xl font-bold mb-6 text-gray-800">
    Indicadores Globales del Sistema
  </h3>

  <div className="grid grid-cols-4 gap-6 mb-6">
    
    <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md transition-all animate-scaleIn">
      <p className="text-sm text-gray-500">Satisfacción del cliente</p>
      <p className="text-3xl font-extrabold text-green-500 mt-1">
        92%
      </p>
      <p className="text-xs text-green-600 mt-1 font-semibold">
        ↑ +4.2% este mes
      </p>
    </div>

    <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md transition-all animate-scaleIn">
      <p className="text-sm text-gray-500">Tiempo respuesta promedio</p>
      <p className="text-3xl font-extrabold text-blue-500 mt-1">
        1.4s
      </p>
      <p className="text-xs text-blue-700 mt-1 font-semibold">
        ↓ -0.6s optimizado
      </p>
    </div>

    <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md transition-all animate-scaleIn">
      <p className="text-sm text-gray-500">Incidentes totales</p>
      <p className="text-3xl font-extrabold text-red-500 mt-1">
        37
      </p>
      <p className="text-xs text-red-700 mt-1 font-semibold">
        ↓ -12 mes previo
      </p>
    </div>

    <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md transition-all animate-scaleIn">
      <p className="text-sm text-gray-500">Eficiencia Operacional</p>
      <p className="text-3xl font-extrabold text-purple-500 mt-1">
        86%
      </p>
      <p className="text-xs text-purple-700 mt-1 font-semibold">
        ↑ +2.7%
      </p>
    </div>

  </div>

  {/* barra de carga */}
  <div className="mt-4">
    <p className="text-sm text-gray-600 font-medium">Nivel de carga del sistema</p>
    <div className="w-full bg-gray-200 rounded-full h-4 mt-2 overflow-hidden">
      <div className="bg-green-400 h-4 rounded-full transition-all duration-700 w-[68%]" />
    </div>
    <p className="text-xs text-gray-500 mt-1">Operando en nivel estable</p>
  </div>

</div>

      </main>
    </div>
  )
}
