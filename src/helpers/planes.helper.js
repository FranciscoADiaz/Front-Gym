import clientAxios, { configHeaders } from "./axios.config.helper";

export const obtenerPlanes = async () => {
  const res = await clientAxios.get("/planes");
  return res.data;
};

export const obtenerPlanPorId = async (id) => {
  const res = await clientAxios.get(`/planes/${id}`);
  return res.data;
};

export const contratarPlan = async (datosPlan) => {
  return clientAxios.post("/planes/contratar", datosPlan, configHeaders());
};

export const renovarPlan = async (planId) => {
  return clientAxios.put(`/planes/${planId}/renovar`, {}, configHeaders());
};

export const cancelarPlan = async (planId) => {
  return clientAxios.put(`/planes/${planId}/cancelar`, {}, configHeaders());
};
