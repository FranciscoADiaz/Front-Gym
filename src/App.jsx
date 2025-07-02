import { BrowserRouter as Router, Routes, Route } from "react-router";
import "./App.css";


import RegisterPage from "./pages/RegisterPage";  
import LoginPage from "./pages/LoginPage";
import ReservaPage from "./pages/ReservaPage"; 
import AdminHomePage from "./pages/AdminHomePage"; 



const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/registrarse" element={<RegisterPage />} />
          <Route path="/iniciarsesion" element={<LoginPage />} />
          <Route path="/reservar" element={<ReservaPage />} />
          <Route path="/admin" element={<AdminHomePage />} />

        </Routes>
      </Router>
    </>
  );
};

export default App;
