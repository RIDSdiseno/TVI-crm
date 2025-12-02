import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Shield, 
  Lock, 
  CheckCircle2, 
  ArrowLeft,
  Crown,
  Building2,
  Users
} from "lucide-react";

export default function RolesPermisosPage() {
  const navigate = useNavigate();

  // DATOS SIMULADOS DE ROLES CON JERARQUÍA
  const [roles, setRoles] = useState([
    { 
      id: 1, 
      titulo: "CEO / Dueño", 
      nivel: "Nivel 1 - Global", 
      empresaOrigen: "Holding TVI",
      acceso: "total", // Acceso a todo
      descripcion: "Acceso irrestricto a todas las empresas y configuraciones.",
      color: "bg-gray-800 border-gray-600 text-white" 
    },
    { 
      id: 2, 
      titulo: "Gerencia TSales", 
      nivel: "Nivel 2 - Directivo", 
      empresaOrigen: "TSales",
      acceso: "parcial",
      descripcion: "Control total sobre TSales, reportes de ventas y personal comercial.",
      color: "bg-white border-blue-200 text-blue-700 shadow-blue-100" 
    },
    { 
      id: 3, 
      titulo: "Gerencia VPrime", 
      nivel: "Nivel 2 - Directivo", 
      empresaOrigen: "VPrime",
      acceso: "parcial",
      descripcion: "Gestión de clientes VIP, servicios premium y facturación VPrime.",
      color: "bg-white border-red-200 text-red-700 shadow-red-100" 
    },
    { 
      id: 4, 
      titulo: "Gerencia Infinet", 
      nivel: "Nivel 2 - Directivo", 
      empresaOrigen: "Infinet",
      acceso: "parcial",
      descripcion: "Supervisión de infraestructura, redes y soporte técnico.",
      color: "bg-white border-yellow-200 text-yellow-700 shadow-yellow-100" 
    }
  ]);

  // Función auxiliar para renderizar permisos visuales
  const renderPermisos = (acceso: string) => {
    if (acceso === "total") {
      return (
        <div className="flex gap-2 mt-4 flex-wrap">
          <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded border border-green-500/30">Todo: Lectura</span>
          <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded border border-green-500/30">Todo: Escritura</span>
          <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded border border-green-500/30">Todo: Borrado</span>
          <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded border border-green-500/30">Admin: Usuarios</span>
        </div>
      );
    }
    return (
      <div className="flex gap-2 mt-4 flex-wrap">
        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded border border-gray-200">Lectura (Empresa)</span>
        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded border border-gray-200">Escritura (Empresa)</span>
        <span className="px-2 py-1 bg-red-50 text-red-400 text-xs rounded border border-red-100 line-through">Borrado Global</span>
      </div>
    );
  };

  // Función para obtener el badge de la empresa
  const getEmpresaBadge = (empresa: string) => {
    switch(empresa) {
        case 'TSales': return 'bg-blue-100 text-blue-700 border-blue-200';
        case 'VPrime': return 'bg-red-100 text-red-700 border-red-200';
        case 'Infinet': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        default: return 'bg-gray-700 text-gray-200 border-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      
      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center gap-4 shadow-sm">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="text-gray-600" />
        </button>
        <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Shield className="text-white w-6 h-6" />
            </div>
            <div>
                <h1 className="text-2xl font-bold text-gray-800 leading-none">Matriz de Roles y Permisos</h1>
                <p className="text-xs text-gray-500 mt-1">Definición de jerarquías y acceso por empresa</p>
            </div>
        </div>
      </header>

      <main className="p-8 max-w-5xl mx-auto">

        {/* ================= NIVEL 1: DUEÑO ================= */}
        <div className="mb-10 animate-fadeIn">
            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-700 mb-4 uppercase tracking-wider">
                <Crown className="w-5 h-5 text-yellow-500" />
                Alta Dirección (Nivel 1)
            </h2>

            {roles.filter(r => r.nivel.includes("Nivel 1")).map(rol => (
                <div key={rol.id} className={`p-6 rounded-xl border shadow-lg flex flex-col md:flex-row gap-6 items-start ${rol.color}`}>
                    <div className="p-4 bg-gray-700 rounded-full border border-gray-600">
                        <Crown className="w-8 h-8 text-yellow-400" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-2xl font-bold">{rol.titulo}</h3>
                            <span className={`px-3 py-0.5 rounded-full text-xs font-bold border ${getEmpresaBadge(rol.empresaOrigen)}`}>
                                {rol.empresaOrigen}
                            </span>
                        </div>
                        <p className="text-gray-300 opacity-90">{rol.descripcion}</p>
                        {renderPermisos(rol.acceso)}
                    </div>
                    <div className="self-center">
                        <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-500 rounded-lg text-sm transition text-white">
                            Configurar Acceso Global
                        </button>
                    </div>
                </div>
            ))}
        </div>

        {/* ================= NIVEL 2: GERENCIAS ================= */}
        <div className="animate-fadeIn animation-delay-200">
            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-700 mb-4 uppercase tracking-wider">
                <Building2 className="w-5 h-5 text-indigo-500" />
                Gerencias de Unidad (Nivel 2)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {roles.filter(r => r.nivel.includes("Nivel 2")).map(rol => (
                    <div key={rol.id} className={`p-6 rounded-xl border shadow-md hover:shadow-xl transition-all hover:-translate-y-1 bg-white ${rol.color.split(' ')[1]}`}> {/* Extrae el borde del string de color */}
                        
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-lg ${
                                rol.empresaOrigen === 'TSales' ? 'bg-blue-100 text-blue-600' :
                                rol.empresaOrigen === 'VPrime' ? 'bg-red-100 text-red-600' :
                                'bg-yellow-100 text-yellow-600'
                            }`}>
                                <Users className="w-6 h-6" />
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-bold border ${getEmpresaBadge(rol.empresaOrigen)}`}>
                                {rol.empresaOrigen}
                            </span>
                        </div>

                        <h3 className="text-xl font-bold text-gray-800 mb-2">{rol.titulo}</h3>
                        <p className="text-sm text-gray-500 mb-4 h-10">{rol.descripcion}</p>
                        
                        <div className="pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                                <Lock className="w-4 h-4" /> 
                                <span>Alcance: <strong>Limitado a {rol.empresaOrigen}</strong></span>
                            </div>
                            <button className="w-full py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 rounded-lg text-sm font-medium transition">
                                Editar Permisos
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </main>
    </div>
  );
}