import { Routes, Route, Navigate } from "react-router-dom";

// Login principal
import LoginPage from "./pages/login_page";

// Selección empresa (solo admin)
import SeleccionEmpresaPage from "./pages/empresa/SeleccionEmpresaPage";

// ======================
//      INFINET
// ======================
import HomeInfinetPage from "./pages/empresa/infinet/HomeInfinetPage";
import ConfigurarPageInfinet from "./pages/empresa/infinet/ConfigurarPageInfinet";
import DrivePageInfinet from "./pages/empresa/infinet/DrivePageInfinet";
import PersonasPageInfinet from "./pages/empresa/infinet/PersonasPageInfinet";
import SoportePageInfinet from "./pages/empresa/infinet/SoportePageInfinet";
import TareasPageInfinet from "./pages/empresa/infinet/TareasPageInfinet";
import TicketsPageInfinet from "./pages/empresa/infinet/TicketsPageInfinet";

// ======================
//      TSALES
// ======================
import HomeTsalesPage from "./pages/empresa/tsales/HomeTsalesPage";
import ConfigurarTsalesPage from "./pages/empresa/tsales/ConfigurarTsalesPage";
import DriveTsalesPage from "./pages/empresa/tsales/DriveTsalesPage";
import PersonasTsalesPage from "./pages/empresa/tsales/PersonasTsalesPage";
import SoporteTsalesPage from "./pages/empresa/tsales/SoporteTsalesPage";
import TareasTsalesPage from "./pages/empresa/tsales/TareasTsalesPage";

// ======================
//        TVI
// ======================
import HomeTviPage from "./pages/empresa/tvi/HomeTviPage";

// ======================
//        VPRIME
// ======================
import HomeVprimePage from "./pages/empresa/vprime/HomeVprimePage";
import ConfigurarPageVprime from "./pages/empresa/vprime/ConfigurarPageVprime";
import DrivePageVprime from "./pages/empresa/vprime/DrivePageVprime";
import PersonasPageVprime from "./pages/empresa/vprime/PersonasPageVprime";
import SoportePageVprime from "./pages/empresa/vprime/SoportePageVprime";
import TareasPageVprime from "./pages/empresa/vprime/TareasPageVprime";
import TicketsPageVprime from "./pages/empresa/vprime/TicketsPageVprime";

function App() {
  return (
    <Routes>
      {/* Login principal */}
      <Route path="/" element={<LoginPage />} />

      {/* Selección empresa */}
      <Route path="/seleccion-empresa" element={<SeleccionEmpresaPage />} />

      {/* =====================
              INFINET
      ====================== */}
      <Route path="/infinet/home" element={<HomeInfinetPage />} />
      <Route path="/infinet/configurar" element={<ConfigurarPageInfinet />} />
      <Route path="/infinet/drive" element={<DrivePageInfinet />} />
      <Route path="/infinet/personas" element={<PersonasPageInfinet />} />
      <Route path="/infinet/soporte" element={<SoportePageInfinet />} />
      <Route path="/infinet/tareas" element={<TareasPageInfinet />} />
      <Route path="/infinet/tickets" element={<TicketsPageInfinet />} />

      {/* =====================
              TSALES
      ====================== */}
      <Route path="/tsales/home" element={<HomeTsalesPage />} />
      <Route path="/tsales/configurar" element={<ConfigurarTsalesPage />} />
      <Route path="/tsales/drive" element={<DriveTsalesPage />} />
      <Route path="/tsales/personas" element={<PersonasTsalesPage />} />
      <Route path="/tsales/soporte" element={<SoporteTsalesPage />} />
      <Route path="/tsales/tareas" element={<TareasTsalesPage />} />

      {/* =====================
                TVI
      ====================== */}
      <Route path="/tvi/home" element={<HomeTviPage />} />

      {/* =====================
              VPRIME
      ====================== */}
      <Route path="/vprime/home" element={<HomeVprimePage />} />
      <Route path="/vprime/configurar" element={<ConfigurarPageVprime />} />
      <Route path="/vprime/drive" element={<DrivePageVprime />} />
      <Route path="/vprime/personas" element={<PersonasPageVprime />} />
      <Route path="/vprime/soporte" element={<SoportePageVprime />} />
      <Route path="/vprime/tareas" element={<TareasPageVprime />} />
      <Route path="/vprime/tickets" element={<TicketsPageVprime />} />

      {/* Cualquier ruta NO válida */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
