import { BrowserRouter as Router, Routes, Route } from "react-router";
import "./App.css";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ReservaPage from "./pages/ReservaPage";
import AdminHomePage from "./pages/AdminHomePage";
import AdminClasesPage from "./pages/AdminClasesPage";
import AdminPlanesPage from "./pages/AdminPlanesPage";
import Navbar from "./components/navbar/NavbarC";
import Footer from "./components/footer/FooterC";
import HomePage from "./pages/HomePage";
import RecuperarContrasenia from "./pages/RecuperarContrasenia";
import AdminUsersPage from "./pages/AdminUsersPage";
import Sobrenosotros from "./pages/Sobrenosotros";
import Contacto from "./pages/ContactoPage";
import PlanDetalle from "./components/planes/DetallesPlanC";
import PlanesPage from "./pages/PlanesPage";
import MiPlanPage from "./pages/MiPlanPage";
import InscripcionPage from "./pages/InscripcionPage";
import PagoExitosoPage from "./pages/PagoExitosoPage";
import PagoFallidoPage from "./pages/PagoFallidoPage";
import Error404 from "./pages/Error404";
import ProductoSuplementosPage from "./pages/ProductoSuplementosPage";
import ProductoAccesoriosPage from "./pages/ProductoAccesoriosPage";
import ProductoRopaPage from "./pages/ProductoRopaPage";

const App = () => {
  return (
    <>
      <Router>
        <div className="app-contenido">
          <Navbar />
          <main className="main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/user" element={<HomePage />} />
              <Route path="/planes" element={<PlanesPage />} />
              <Route path="/mi-plan" element={<MiPlanPage />} />
              <Route path="/planes/:slug" element={<PlanDetalle />} />
              <Route path="/inscripcion/:slug" element={<InscripcionPage />} />
              <Route path="/pago-exitoso" element={<PagoExitosoPage />} />
              <Route path="/pago-fallido" element={<PagoFallidoPage />} />
              <Route path="/registrarse" element={<RegisterPage />} />
              <Route path="/iniciarsesion" element={<LoginPage />} />
              <Route path="/reservar" element={<ReservaPage />} />
              <Route path="/admin" element={<AdminHomePage />} />
              <Route path="/admin/usuarios" element={<AdminUsersPage />} />
              <Route path="/admin/clases" element={<AdminClasesPage />} />
              <Route path="/admin/planes" element={<AdminPlanesPage />} />
              <Route
                path="/recuperarcontrasenia"
                element={<RecuperarContrasenia />}
              />

              <Route path="/sobre-nosotros" element={<Sobrenosotros />} />
              <Route path="/contacto" element={<Contacto />} />

              {/* Rutas de productos que muestran 404 */}
              <Route
                path="/productos/suplementos"
                element={<ProductoSuplementosPage />}
              />
              <Route
                path="/productos/accesorios"
                element={<ProductoAccesoriosPage />}
              />
              <Route
                path="/productos/ropa-deportiva"
                element={<ProductoRopaPage />}
              />

              {/* Ruta 404 para cualquier otra página no encontrada */}
              <Route path="*" element={<Error404 />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </>
  );
};

export default App;
