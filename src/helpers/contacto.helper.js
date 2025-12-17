import clientAxios from "./axios.config.helper";

const DEFAULT_ERROR_MESSAGE =
  "No pudimos enviar tu mensaje. Intenta nuevamente en unos minutos.";

export const sendContactMessage = async (contactData) => {
  try {
    const response = await clientAxios.post("/contacto", contactData);
    return response.data;
  } catch (error) {
    const backendMessage = error?.response?.data?.msg;
    const message = backendMessage || DEFAULT_ERROR_MESSAGE;
    throw new Error(message);
  }
};

export default sendContactMessage;

