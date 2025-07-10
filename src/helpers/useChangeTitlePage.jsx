export const useChangeTitle = (idPage) => {
  switch (idPage) {
    case "Inicio":
      document.title = "Home - Tucumán Gym";
      break;
    case "admin":
      document.title = "Panel Administrador";
      break;
    case "contact":
      document.title = "Contacto";
      break;
    case "iniciarsesion":
      document.title = "Iniciar Sesion";
      break;
    case "registrarse":
      document.title = "Registrarse";
      break;
    case "reservar":
      document.title = "Reservar Clase";
      break;
    case "recuperarcontrasenia":
      document.title = "Recuperar Contraseña";
      break;

    default:
      document.title = "Error";
      break;
  }
};
export const useChangeTitlePage = (idPage) => {
  useChangeTitle(idPage);
  return null; 
};
