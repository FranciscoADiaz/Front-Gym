import { BrowserRouter as Router, Routes, Route } from "react-router";
import "./App.css";


import RegisterPage from "./pages/RegisterPage";  
import LoginPage from "./pages/LoginPage";



const App = () => {
  return (
    <>
      <Router>
       
        <Routes>
          
          <Route path="/registrarse" element={<RegisterPage />} />
          <Route path="/iniciarsesion" element={<LoginPage />} />

      

        </Routes>
       
      </Router>
    </>
  );
};

export default App;
