import { useNavigate } from "react-router";

const PrivateRoute = ({ children, rol }) => {
  const navigate = useNavigate();
  const usuarioLog = JSON.parse(sessionStorage.getItem("token")) || null;
  const rolUsuario = JSON.parse(sessionStorage.getItem("rol")) || null;
  const rutasAdminProtegidas = ["/admin", "/admin/products", "/admin/users"];

  if (!usuarioLog) {
    setTimeout(() => {
      navigate("/");
    }, 100);
  } else if (rol === rolUsuario) {
    return children;
  } else if (
    rolUsuario === "usuario" &&
    rutasAdminProtegidas.includes(location.pathname)
  ) {
    setTimeout(() => {
      navigate("/user");
    }, 100);
  } else {
    return children;
  }
};

export default PrivateRoute;
