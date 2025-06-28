export const useChangeTitle = (idPage) => {
  switch (idPage) {
    case "home":
      document.title = "Pagina Pricipal";
      break;
    case "aboutUs":
      document.title = "Sobre Nosotros";
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

    default:
      document.title = "Error";
      break;
  }
};
export const useChangeTitlePage = (idPage) => {
  useChangeTitle(idPage);
  return null; 
};