import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getCareers = async () => {
  const response = await api.get("/careers");

  return response.data;
};

export const getCareerSkills = async (title) => {
  const response = await api.get(
    `/careers/${encodeURIComponent(title)}/skills`
  );

  return response.data;
};

export const getCareerTechnologies = async (title) => {
  const response = await api.get(
    `/careers/${encodeURIComponent(title)}/technologies`
  );

  return response.data;
};

export const getCareerProjects = async (title) => {
  const response = await api.get(
    `/careers/${encodeURIComponent(title)}/projects`
  );

  return response.data;
};

export const getCareerGraph = async (title) => {
  const response = await api.get(
    `/careers/${encodeURIComponent(title)}/graph`
  );

  return response.data;
};

export default api;