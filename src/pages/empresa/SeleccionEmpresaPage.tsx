import React from "react";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp,
  Users,
  BarChart3,
  Network,
  Building2,
  Activity,
} from "lucide-react";
import GraficoComparativo3D from "../../components/GraficoComparativo3D";
import ReactApexChart from "react-apexcharts";

export default function SeleccionEmpresaPage() {
  const navigate = useNavigate();

  const selectEmpresa = (empresa: string) => {
    if (empresa === "t") navigate("/tsales/home");
    if (empresa === "v") navigate("/vprime/home");
    if (empresa === "i") navigate("/infinet/home");
  };

  // ==========================
  // CRECIMIENTO ANUAL
  // ==========================
  const crecimientoSeries = [
    {
      name: "TSales — Ventas",
      data: [38, 42, 45, 48, 52, 58, 63, 69, 74, 81, 88, 94],
      color: "#2563eb",
    },
    {
      name: "VPrime — VIP",
      data: [41, 44, 46, 49, 53, 57, 60, 64, 67, 72, 76, 81],
      color: "#dc2626",
    },
    {
      name: "Infinet — Fibra",
      data: [11, 14, 18, 22, 28, 32, 37, 44, 52, 60, 66, 71],
      color: "#ca8a04",
    },
  ];

  const crecimientoOpt = {
    chart: { type: "area", height: 250, animations: { speed: 900 } },
    stroke: { curve: "smooth", width: 4 },
    xaxis: { categories: ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"] },
    dataLabels: { enabled: false },
    legend: { position: "bottom" },
    fill: {
      type: "gradient",
      gradient: { opacityFrom: 0.4, opacityTo: 0.9 },
    },
  };

  // ==========================
  // DONUT PARTICIPACIÓN DE MERCADO
  // ==========================

  const donutSeries = [45, 35, 20]; // TSales — VPrime — Infinet
  const donutOpt = {
    chart: { type: "donut", height: 260 },
    labels: ["TSales", "VPrime", "Infinet"],
    legend: { position: "bottom" },
    colors: ["#2563eb", "#dc2626", "#ca8a04"],
  };

  // ==========================
  // RADIALES
  // ======================

  const radialSeries = [89, 94, 97];
  const radialOpt = {
    chart: { type: "radialBar", height: 260 },
    labels: ["TSales %", "VPrime %", "Infinet %"],
    colors: ["#2563eb", "#dc2626", "#ca8a04"],
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: { fontSize: "18px" },
          value: { fontSize: "16px" },
        },
      },
    },
  };

  return (
    <div className="w-full h-screen flex bg-white text-gray-800">

      {/* ========================= SIDEBAR ========================= */}
      <aside className="w-72 bg-gray-50 border-r border-gray-200 shadow-md flex flex-col p-6">
        <h2 className="text-2xl font-bold tracking-wide mb-10">
          Empresas TVI
        </h2>

        {/* TSALES */}
        <button
          onClick={() => selectEmpresa("t")}
          className="flex items-center gap-4 p-4 rounded-xl mb-4 transition-all duration-300 hover:bg-blue-100 hover:translate-x-2"
        >
          <div className="w-12 h-12 rounded-lg bg-blue-500 shadow-lg flex items-center justify-center">
            <img src="/img/T.jpg" className="w-10 h-10 rounded-md" />
          </div>
          <span className="font-semibold text-gray-700 text-lg">TSales</span>
        </button>

        {/* VPRIME */}
        <button
          onClick={() => selectEmpresa("v")}
          className="flex items-center gap-4 p-4 rounded-xl mb-4 transition-all duration-300 hover:bg-red-100 hover:translate-x-2"
        >
          <div className="w-12 h-12 rounded-lg bg-red-500 shadow-lg flex items-center justify-center">
            <img src="/img/V.jpg" className="w-10 h-10 rounded-md" />
          </div>
          <span className="font-semibold text-gray-700 text-lg">VPrime</span>
        </button>

        {/* INFINET */}
        <button
          onClick={() => selectEmpresa("i")}
          className="flex items-center gap-4 p-4 rounded-xl mb-4 transition-all duration-300 hover:bg-yellow-100 hover:translate-x-2"
        >
          <div className="w-12 h-12 rounded-lg bg-yellow-500 shadow-lg flex items-center justify-center">
            <img src="/img/I.jpg" className="w-10 h-10 rounded-md" />
          </div>
          <span className="font-semibold text-gray-700 text-lg">Infinet</span>
        </button>
      </aside>

      {/* ======================== PANEL DERECHO ======================== */}
      <main className="flex-1 p-12 overflow-y-auto animate-fadeIn">

        <h1 className="text-5xl font-extrabold mb-2 text-gray-900">
          Selección de Empresa
        </h1>

        <p className="text-gray-500 text-lg mb-12">
          Panel ejecutivo — Compare rendimiento, productividad y crecimiento de TSales, VPrime e Infinet.
        </p>

        {/* ======================== RESÚMENES DE EMPRESA ======================== */}
        <div className="grid grid-cols-3 gap-8 mb-14">

          {/* TSALES */}
          <div className="p-6 bg-white border border-blue-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <h3 className="text-2xl font-bold text-blue-600">TSales</h3>
            <p className="text-gray-500 mt-2">
              Plataforma comercial enfocada en ventas directas, soporte a clientes,
              facturación y productividad del área comercial.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <TrendingUp className="text-blue-500" />
              <span className="font-semibold text-blue-600">
                +14% Ventas Mensuales
              </span>
            </div>
          </div>

          {/* VPRIME */}
          <div className="p-6 bg-white border border-red-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <h3 className="text-2xl font-bold text-red-600">VPrime</h3>
            <p className="text-gray-500 mt-2">
              Gestión inteligente, clientes VIP, análisis estratégico y
              operaciones de alto nivel con servicios premium.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <Activity className="text-red-500" />
              <span className="font-semibold text-red-600">
                +22% Crecimiento Operativo
              </span>
            </div>
          </div>

          {/* INFINET */}
          <div className="p-6 bg-white border border-yellow-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <h3 className="text-2xl font-bold text-yellow-600">Infinet</h3>
            <p className="text-gray-500 mt-2">
              Servicios de conectividad, telecomunicaciones, soporte de redes e
              infraestructura óptica avanzada.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <Network className="text-yellow-500" />
              <span className="font-semibold text-yellow-600">
                98.7% Estabilidad de Red
              </span>
            </div>
          </div>

        </div>

        {/* ======================== GRÁFICO 3D ======================== */}
        <div className="mt-10">
          <GraficoComparativo3D />
        </div>

        {/* ================= CRECIMIENTO MENSUAL ================= */}
        <div className="mt-14 bg-white border border-gray-200 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Crecimiento anual — Ventas de planes empresariales
          </h2>
          <ReactApexChart options={crecimientoOpt} series={crecimientoSeries} type="area" height={250} />
        </div>

        {/* ================= COMPETITIVIDAD ================= */}
        <div className="mt-14 grid grid-cols-2 gap-10">

          {/* DONUT */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Participación de negocio
            </h2>
            <ReactApexChart options={donutOpt} series={donutSeries} type="donut" height={260} />
          </div>

          {/* RADIAL */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Performance de Servicio (SLA - Calidad)
            </h2>
            <ReactApexChart options={radialOpt} series={radialSeries} type="radialBar" height={260} />
          </div>

        </div>

      </main>
    </div>
  );
}
