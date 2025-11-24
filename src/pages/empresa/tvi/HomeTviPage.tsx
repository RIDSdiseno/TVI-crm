import Sidebar from "../../../components/Sidebar";

export default function HomeTviPage() {
  return (
    <div className="flex">

      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENIDO PRINCIPAL */}
      <div className="ml-64 p-10 w-full">
        <h1 className="text-3xl font-bold">Dashboard TVI</h1>

        <p className="mt-4 text-gray-600">
          Bienvenido al panel principal de TVI.
        </p>
      </div>

    </div>
  );
}
