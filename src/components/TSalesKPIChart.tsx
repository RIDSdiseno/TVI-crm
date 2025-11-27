import ReactApexChart from "react-apexcharts";

export default function TSalesKPIChart() {

  const series = [
    {
      name: "Ingresos mensuales",
      data: [32, 35, 38, 42, 46, 51, 55, 58],
      color: "#2563eb"
    },
    {
      name: "Clientes activos",
      data: [210, 228, 241, 260, 281, 300, 312, 320],
      color: "#16a34a"
    },
    {
      name: "Líneas activas",
      data: [8250, 8910, 9400, 9860, 10310, 10950, 11520, 11742],
      color: "#0ea5e9"
    }
  ];

  const options:any = {
    chart: {
      type: "area",
      animations: {
        enabled: true,
        easing: "easeout",
        speed: 900,
      },
      toolbar: { show: false }
    },
    dataLabels: { enabled: false },
    
    stroke: {
      curve: "smooth",
      width: 3
    },
    xaxis: {
      categories: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dic", "Ene"]
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.5,
        opacityTo: 0.1
      }
    },
    legend: { position: "bottom" }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow p-4 mt-10">
      <h3 className="text-lg font-bold text-gray-800 mb-2">KPI — Rendimiento Comercial</h3>
      <ReactApexChart options={options} series={series} height={300} type="area" />
    </div>
  );
}
