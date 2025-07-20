import { BrowserRouter as Router, Routes, Route } from "react-router";
import "./App.css";


import RegisterPage from "./pages/RegisterPage";  
import LoginPage from "./pages/LoginPage";
import ReservaPage from "./pages/ReservaPage"; 
import AdminHomePage from "./pages/AdminHomePage"; 
import Navbar from "./components/navbar/NavbarC"; 
import Footer from "./components/footer/FooterC"; 
import HomePage from "./pages/HomePage";
import RecuperarContrasenia from "./pages/RecuperarContrasenia"; 
import AdminUsersPage from "./pages/AdminUsersPage"; 


const App = () => {
  return (
    <>
      <Router>
        <div className="app-contenido">
          <Navbar />
          <main className="main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/registrarse" element={<RegisterPage />} />
              <Route path="/iniciarsesion" element={<LoginPage />} />
              <Route path="/reservar" element={<ReservaPage />} />
              <Route path="/admin" element={<AdminHomePage />} />
              <Route path="/admin/usuarios" element={<AdminUsersPage/>} />
              <Route
                path="/recuperarcontrasenia"
                element={<RecuperarContrasenia />}
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </>
  );
};

export default App;
