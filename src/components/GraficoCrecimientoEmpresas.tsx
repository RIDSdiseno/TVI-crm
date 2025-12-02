import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

export default function GraficoCrecimientoEmpresas() {

  const series = [
    {
      name: "TSales — Ventas Empresa",
      data: [38, 42, 45, 48, 52, 58, 63, 69, 74, 81, 88, 94],
      color: "#2563eb",
    },
    {
      name: "VPrime — Clientes VIP Corporativos",
      data: [41, 44, 46, 49, 53, 57, 60, 64, 67, 72, 76, 81],
      color: "#dc2626",
    },
    {
      name: "Infinet — Planes fibra óptica empresa",
      data: [11, 14, 18, 22, 28, 32, 37, 44, 52, 60, 66, 71],
      color: "#ca8a04",
    }
  ];

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: "area",
      zoom: { enabled: false },
      animations: { enabled: true, speed: 1200 },
      toolbar: { show: false },
    },
    stroke: {
      curve: "smooth",
      width: 4,
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: [
        "Ene","Feb","Mar","Abr","May","Jun",
        "Jul","Ago","Sep","Oct","Nov","Dic"
      ]
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.5,
        opacityFrom: 0.45,
        opacityTo: 0.9,
        stops: [0, 75, 100],
      }
    },
    legend: {
      position: "bottom",
      fontSize: "15px"
    }
  };

  return (
    <div className=" bg-white border border-gray-200 rounded-2xl shadow-xl p-6 mt-12">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Crecimiento anual — Ventas de planes empresariales
      </h2>

      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={350}
      />
    </div>
  );
}
