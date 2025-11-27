import React from "react";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

export default function GraficoComparativo3D() {
  const series = [
    {
      name: "TSales",
      data: [58, 320, 89],
      color: "#2563eb", // azul
    },
    {
      name: "VPrime",
      data: [71, 140, 94],
      color: "#dc2626", // rojo
    },
    {
      name: "Infinet",
      data: [32, 480, 97],
      color: "#ca8a04", // amarillo
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
      },
      toolbar: {
        show: true,
      },
      foreColor: "#4b5563",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
        borderRadius: 6,
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "12px",
        fontWeight: "bold",
      },
    },
    stroke: {
      show: true,
      width: 3,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Ventas ($M)", "Clientes activos", "Tickets resueltos"],
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    grid: {
      borderColor: "#e5e7eb",
    },
    legend: {
      position: "bottom",
      fontSize: "14px",
    },
    tooltip: {
      theme: "light",
    },
    fill: {
      opacity: 0.95,
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.4,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 0.9,
        opacityTo: 1,
        stops: [0, 50, 100],
      },
    },
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Comparativo 3D de KPIs
      </h2>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
}
