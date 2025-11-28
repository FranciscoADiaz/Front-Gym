/**
 * Helper para verificación de permisos de administrador
 * Centraliza la lógica de verificación de admin
 */

import { useNavigate } from "react-router";
import { useEffect } from "react";
import { getToken, getRol, isAdmin } from "./auth.helper";
import { showError } from "./swal.helper";

/**
 * Hook personalizado para verificar si el usuario es admin
 * Redirige si no es admin o no está autenticado
 * @param {function} navigate - Función navigate de react-router
 */
export const useAdminAuth = (navigate) => {
  useEffect(() => {
    const token = getToken();
    const rol = getRol();

    if (!token) {
      showError("Error", "Debes iniciar sesión");
      navigate("/iniciarsesion");
      return;
    }

    if (!isAdmin()) {
      showError("Error", "No tienes permisos de administrador");
      navigate("/");
      return;
    }
  }, [navigate]);
};

/**
 * Verifica si el usuario es admin (versión síncrona)
 * Útil para verificaciones fuera de componentes
 * @returns {boolean} True si es admin
 */
export const checkAdminAuth = () => {
  return isAdmin() && getToken() !== null;
};






