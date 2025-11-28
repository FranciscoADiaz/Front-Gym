/**
 * Helper para manejo de autenticación y tokens JWT
 * Centraliza toda la lógica de decodificación y verificación de tokens
 */

/**
 * Obtiene el token del sessionStorage
 * @returns {string|null} Token JWT o null si no existe
 */
export const getToken = () => {
  try {
    const token = sessionStorage.getItem("token");
    return token ? JSON.parse(token) : null;
  } catch (error) {
    return null;
  }
};

/**
 * Obtiene el rol del usuario del sessionStorage
 * @returns {string|null} Rol del usuario o null si no existe
 */
export const getRol = () => {
  try {
    const rol = sessionStorage.getItem("rol");
    return rol ? JSON.parse(rol) : null;
  } catch (error) {
    return null;
  }
};

/**
 * Decodifica un token JWT y retorna el payload
 * @param {string} token - Token JWT
 * @returns {object|null} Payload decodificado o null si hay error
 */
export const decodeJWT = (token) => {
  if (!token) return null;
  
  try {
    // Si el token viene como string JSON, parsearlo primero
    const tokenString = typeof token === 'string' && token.startsWith('"') 
      ? JSON.parse(token) 
      : token;
    
    const payloadBase64 = tokenString.split(".")[1];
    if (!payloadBase64) return null;
    
    const payload = JSON.parse(atob(payloadBase64));
    return payload;
  } catch (error) {
    console.error("Error decodificando token:", error);
    return null;
  }
};

/**
 * Obtiene el ID del usuario desde el token
 * @returns {string|null} ID del usuario o null
 */
export const getIdUsuario = () => {
  const token = getToken();
  if (!token) return null;
  
  const payload = decodeJWT(token);
  return payload?.idUsuario || null;
};

/**
 * Obtiene el nombre del usuario desde el token
 * @returns {string|null} Nombre del usuario o null
 */
export const getNombreUsuario = () => {
  const token = getToken();
  if (!token) return null;
  
  const payload = decodeJWT(token);
  return payload?.nombreUsuario || null;
};

/**
 * Verifica si el usuario está autenticado
 * @returns {boolean} True si está autenticado
 */
export const isAuthenticated = () => {
  return getToken() !== null;
};

/**
 * Verifica si el usuario es administrador
 * @returns {boolean} True si es admin
 */
export const isAdmin = () => {
  const rol = getRol();
  return rol === "admin";
};

/**
 * Obtiene toda la información del usuario desde el token
 * @returns {object|null} Objeto con idUsuario, nombreUsuario, etc. o null
 */
export const getUserInfo = () => {
  const token = getToken();
  if (!token) return null;
  
  return decodeJWT(token);
};

/**
 * Limpia la sesión del usuario
 */
export const clearSession = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("rol");
};






