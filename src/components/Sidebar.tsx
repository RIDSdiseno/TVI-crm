import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/tvi/home" },
    { name: "Configurar", path: "/tvi/configurar" },
    { name: "Drive", path: "/tvi/drive" },
    { name: "Personas", path: "/tvi/personas" },
    { name: "Soporte", path: "/tvi/soporte" },
    { name: "Tareas", path: "/tvi/tareas" },
    { name: "Tickets", path: "/tvi/tickets" },
  ];

  return (
    <div className="h-screen w-64 bg-[#091a2c] text-white flex flex-col shadow-xl fixed left-0 top-0">

      {/* LOGO */}
      <div className="p-6 border-b border-white/10">
        <img
          src="/img/TVI.jpg"
          alt="Logo"
          className="w-20 mx-auto rounded-lg shadow-lg"
        />
        <h1 className="text-center mt-3 text-xl font-semibold tracking-wide">
          Panel TVI
        </h1>
      </div>

      {/* NAVIGATION */}
      <nav className="flex flex-col p-4 gap-2">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-3 rounded-lg font-medium transition ${
                active
                  ? "bg-blue-600 shadow-md"
                  : "hover:bg-blue-900/40 hover:translate-x-1"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div className="mt-auto p-4 text-center text-sm opacity-70">
        © {new Date().getFullYear()} TVI
      </div>
    </div>
  );
}
