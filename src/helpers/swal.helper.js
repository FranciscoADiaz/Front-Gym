/**
 * Helper para confirmaciones y alertas con SweetAlert2
 * Centraliza las configuraciones comunes de SweetAlert
 */

import Swal from "sweetalert2";

/**
 * Muestra una confirmación de eliminación
 * @param {string} title - Título del mensaje
 * @param {string} text - Texto descriptivo
 * @returns {Promise} Promise que se resuelve si se confirma
 */
export const confirmDelete = (title = "¿Estás seguro?", text = "Esta acción no se puede deshacer") => {
  return Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmColor: "#d33",
    cancelColor: "#3085d6",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  });
};

/**
 * Muestra una confirmación genérica
 * @param {string} title - Título del mensaje
 * @param {string} text - Texto descriptivo
 * @param {string} confirmText - Texto del botón de confirmación
 * @param {string} cancelText - Texto del botón de cancelación
 * @returns {Promise} Promise que se resuelve si se confirma
 */
export const confirmAction = (
  title = "¿Estás seguro?",
  text = "Esta acción no se puede deshacer",
  confirmText = "Sí, confirmar",
  cancelText = "Cancelar"
) => {
  return Swal.fire({
    title,
    text,
    icon: "question",
    showCancelButton: true,
    confirmColor: "#3085d6",
    cancelColor: "#6c757d",
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
  });
};

/**
 * Muestra un mensaje de éxito
 * @param {string} title - Título del mensaje
 * @param {string} text - Texto descriptivo
 */
export const showSuccess = (title = "¡Éxito!", text = "Operación realizada correctamente") => {
  return Swal.fire({
    title,
    text,
    icon: "success",
    confirmButtonColor: "#3085d6",
  });
};

/**
 * Muestra un mensaje de error
 * @param {string} title - Título del mensaje
 * @param {string} text - Texto descriptivo
 */
export const showError = (title = "Error", text = "Ocurrió un error inesperado") => {
  return Swal.fire({
    title,
    text,
    icon: "error",
    confirmButtonColor: "#d33",
  });
};

/**
 * Muestra un mensaje de advertencia
 * @param {string} title - Título del mensaje
 * @param {string} text - Texto descriptivo
 */
export const showWarning = (title = "Advertencia", text = "") => {
  return Swal.fire({
    title,
    text,
    icon: "warning",
    confirmButtonColor: "#ffc107",
  });
};

/**
 * Muestra un mensaje de información
 * @param {string} title - Título del mensaje
 * @param {string} text - Texto descriptivo
 */
export const showInfo = (title = "Información", text = "") => {
  return Swal.fire({
    title,
    text,
    icon: "info",
    confirmButtonColor: "#3085d6",
  });
};






