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
    case "Contacto":
      document.title = "Contacto - Tucumán Gym";
      break;
    case "iniciarsesion":
      document.title = "Iniciar Sesion";
      break;
    case "registrarse":
      document.title = "Registrarse";
      break;
    case "reservar":
      document.title = "Mis Clases - Tucumán Gym";
      break;
    case "recuperarcontrasenia":
      document.title = "Recuperar Contraseña";
      break;
    case "Sobre Nosotros":
      document.title = "Sobre Nosotros - Tucumán Gym";
      break;
    case "Planes":
      document.title = "Planes - Tucumán Gym";
      break;
    case "Pago Exitoso":
      document.title = "Pago Exitoso - Tucumán Gym";
      break;
    case "Pago Fallido":
      document.title = "Pago Fallido - Tucumán Gym";
      break;
    case "Inscripción":
      document.title = "Inscripción - Tucumán Gym";
      break;
    case "Administrar Usuarios":
      document.title = "Administrar Usuarios - Tucumán Gym";
      break;
    case "Administrar Planes":
      document.title = "Administrar Planes - Tucumán Gym";
      break;
    case "Administrar Clases":
      document.title = "Administrar Clases - Tucumán Gym";
      break;
    case "404":
      document.title = "Página no encontrada - Tucumán Gym";
      break;
    case "Suplementos":
      document.title = "Suplementos - Tucumán Gym";
      break;
    case "Accesorios":
      document.title = "Accesorios - Tucumán Gym";
      break;
    case "Ropa Deportiva":
      document.title = "Ropa Deportiva - Tucumán Gym";
      break;
    case "Mi Plan":
      document.title = "Mi Plan - Tucumán Gym";
      break;
    default:
      document.title = "Tucumán Gym";
      break;
  }
};
export const useChangeTitlePage = (idPage) => {
  useChangeTitle(idPage);
  return null;
};
