import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

/* LOGIN */
import LoginPage from "./pages/login_page";

/* SELECCIÓN EMPRESA */
import SeleccionEmpresaPage from "./pages/empresa/SeleccionEmpresaPage";

/* PERSONAL */
import GestionPersonalPage from "./pages/empresa/GestionPersonalPage";

/* INFINET */
import HomeInfinetPage from "./pages/empresa/infinet/HomeInfinetPage";
import ConfigurarPageInfinet from "./pages/empresa/infinet/ConfigurarPageInfinet";
import DrivePageInfinet from "./pages/empresa/infinet/DrivePageInfinet";
import PersonasPageInfinet from "./pages/empresa/infinet/PersonasPageInfinet";
import SoportePageInfinet from "./pages/empresa/infinet/SoportePageInfinet";
import TareasPageInfinet from "./pages/empresa/infinet/TareasPageInfinet";
import TicketsPageInfinet from "./pages/empresa/infinet/TicketsPageInfinet";

/* TSALES */
import HomeTsalesPage from "./pages/empresa/tsales/HomeTsalesPage";
import ConfigurarTsalesPage from "./pages/empresa/tsales/ConfigurarTsalesPage";
import DriveTsalesPage from "./pages/empresa/tsales/DriveTsalesPage";
import PersonasTsalesPage from "./pages/empresa/tsales/PersonasTsalesPage";
import SoporteTsalesPage from "./pages/empresa/tsales/SoporteTsalesPage";
import TareasTsalesPage from "./pages/empresa/tsales/TareasTsalesPage";
import ReportesTSalesPage from "./pages/empresa/tsales/ReportesTSalesPage";

/* TVI */
import HomeTviPage from "./pages/empresa/tvi/HomeTviPage";

/* VPRIME */
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
      {/* Login SIN protección */}
      <Route path="/" element={<LoginPage />} />

      {/* Selección empresa protegida */}
      <Route
        path="/seleccion-empresa"
        element={
          <ProtectedRoute>
            <SeleccionEmpresaPage />
          </ProtectedRoute>
        }
      />

      {/* PERSONAL */}
      <Route path="/GestionPersonal" element={<GestionPersonalPage/>} />

      {/* INFINET */}
      <Route
        path="/infinet/home"
        element={
          <ProtectedRoute>
            <HomeInfinetPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/infinet/configurar"
        element={
          <ProtectedRoute>
            <ConfigurarPageInfinet />
          </ProtectedRoute>
        }
      />

      <Route
        path="/infinet/drive"
        element={
          <ProtectedRoute>
            <DrivePageInfinet />
          </ProtectedRoute>
        }
      />

      <Route
        path="/infinet/personas"
        element={
          <ProtectedRoute>
            <PersonasPageInfinet />
          </ProtectedRoute>
        }
      />

      <Route
        path="/infinet/soporte"
        element={
          <ProtectedRoute>
            <SoportePageInfinet />
          </ProtectedRoute>
        }
      />

      <Route
        path="/infinet/tareas"
        element={
          <ProtectedRoute>
            <TareasPageInfinet />
          </ProtectedRoute>
        }
      />

      <Route
        path="/infinet/tickets"
        element={
          <ProtectedRoute>
            <TicketsPageInfinet />
          </ProtectedRoute>
        }
      />

      {/* TSALES */}
      <Route
        path="/tsales/home"
        element={
          <ProtectedRoute>
            <HomeTsalesPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tsales/configurar"
        element={
          <ProtectedRoute>
            <ConfigurarTsalesPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tsales/drive"
        element={
          <ProtectedRoute>
            <DriveTsalesPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tsales/personas"
        element={
          <ProtectedRoute>
            <PersonasTsalesPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tsales/soporte"
        element={
          <ProtectedRoute>
            <SoporteTsalesPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tsales/tareas"
        element={
          <ProtectedRoute>
            <TareasTsalesPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tsales/reportes"
        element={
          <ProtectedRoute>
            <ReportesTSalesPage />
          </ProtectedRoute>
        }
      />

      {/* TVI */}
      <Route
        path="/tvi/home"
        element={
          <ProtectedRoute>
            <HomeTviPage />
          </ProtectedRoute>
        }
      />

      {/* VPRIME */}
      <Route
        path="/vprime/home"
        element={
          <ProtectedRoute>
            <HomeVprimePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/vprime/configurar"
        element={
          <ProtectedRoute>
            <ConfigurarPageVprime />
          </ProtectedRoute>
        }
      />

      <Route
        path="/vprime/drive"
        element={
          <ProtectedRoute>
            <DrivePageVprime />
          </ProtectedRoute>
        }
      />

      <Route
        path="/vprime/personas"
        element={
          <ProtectedRoute>
            <PersonasPageVprime />
          </ProtectedRoute>
        }
      />

      <Route
        path="/vprime/soporte"
        element={
          <ProtectedRoute>
            <SoportePageVprime />
          </ProtectedRoute>
        }
      />

      <Route
        path="/vprime/tareas"
        element={
          <ProtectedRoute>
            <TareasPageVprime />
          </ProtectedRoute>
        }
      />

      <Route
        path="/vprime/tickets"
        element={
          <ProtectedRoute>
            <TicketsPageVprime />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
