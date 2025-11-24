import React from "react";
import { useNavigate } from "react-router-dom";

export default function SeleccionEmpresaPage() {
  const navigate = useNavigate();

  const selectEmpresa = (empresa: string) => {
    if (empresa === "t") navigate("/tsales/home");
    if (empresa === "v") navigate("/vprime/home");
    if (empresa === "i") navigate("/infinet/home");
  };

  return (
    <div className="w-full h-screen flex bg-gradient-to-br from-[#102542] via-[#1e3656] to-[#0f1c2f] text-white">

      {/* SIDEBAR IZQUIERDO */}
      <aside className="w-72 bg-white/10 backdrop-blur-xl border-r border-white/20 shadow-xl flex flex-col p-6">

        <h2 className="text-2xl font-bold tracking-wide mb-10 text-white/80">
          Empresas TVI
        </h2>

        {/* TSALES */}
        <button
          onClick={() => selectEmpresa("t")}
          className="flex items-center gap-4 p-4 rounded-xl mb-4 transition-all duration-200 hover:bg-blue-500/20 hover:translate-x-2"
        >
          <div className="w-12 h-12 rounded-lg bg-blue-500 shadow-lg flex items-center justify-center">
            <img src="/img/T.jpg" className="w-10 h-10 rounded-md" />
          </div>
          <span className="font-semibold text-white/90 text-lg">TSales</span>
        </button>

        {/* VPRIME */}
        <button
          onClick={() => selectEmpresa("v")}
          className="flex items-center gap-4 p-4 rounded-xl mb-4 transition-all duration-200 hover:bg-red-500/20 hover:translate-x-2"
        >
          <div className="w-12 h-12 rounded-lg bg-red-500 shadow-lg flex items-center justify-center">
            <img src="/img/V.jpg" className="w-10 h-10 rounded-md" />
          </div>
          <span className="font-semibold text-white/90 text-lg">VPrime</span>
        </button>

        {/* INFINET */}
        <button
          onClick={() => selectEmpresa("i")}
          className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 hover:bg-yellow-500/20 hover:translate-x-2"
        >
          <div className="w-12 h-12 rounded-lg bg-yellow-500 shadow-lg flex items-center justify-center">
            <img src="/img/I.jpg" className="w-10 h-10 rounded-md" />
          </div>
          <span className="font-semibold text-white/90 text-lg">Infinet</span>
        </button>

      </aside>

      {/* PANEL DERECHO */}
      <main className="flex-1 p-12 overflow-y-auto">

        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
          Selecciona una empresa
        </h1>

        <p className="text-white/70 text-lg mb-12 max-w-2xl">
          Desde este panel puedes administrar todas las áreas de TSales, VPrime e Infinet.
        </p>

        {/* TARJETAS */}
        <div className="grid grid-cols-3 gap-10">

          {/* TSALES */}
          <div className="p-6 bg-white/10 backdrop-blur-xl border border-blue-400/20 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all">
            <h3 className="text-2xl font-bold text-blue-300">TSales</h3>
            <p className="text-white/70 mt-3">
              Plataforma enfocada en ventas directas y soporte comercial.
            </p>
          </div>

          {/* VPRIME */}
          <div className="p-6 bg-white/10 backdrop-blur-xl border border-red-400/20 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all">
            <h3 className="text-2xl font-bold text-red-300">VPrime</h3>
            <p className="text-white/70 mt-3">
              Gestión estratégica para clientes VIP y experiencia premium.
            </p>
          </div>

          {/* INFINET */}
          <div className="p-6 bg-white/10 backdrop-blur-xl border border-yellow-400/20 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all">
            <h3 className="text-2xl font-bold text-yellow-300">Infinet</h3>
            <p className="text-white/70 mt-3">
              Conectividad avanzada, infraestructura óptica y telecomunicaciones.
            </p>
          </div>

        </div>

      </main>

    </div>
  );
}
