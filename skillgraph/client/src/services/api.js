import axios from "axios";

const configuredBaseURL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

const apiBaseURL = configuredBaseURL.endsWith("/api")
  ? configuredBaseURL
  : `${configuredBaseURL}/api`;

const api = axios.create({
  baseURL: apiBaseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// =========================================================
// CAREERS
// =========================================================

export const getCareers = async () => {
  const response = await api.get("/careers");

  return response.data;
};

// =========================================================
// OLD CAREER APIs
// =========================================================

export const getCareerSkills = async (career) => {
  const response = await api.get(
    `/careers/${encodeURIComponent(career)}/skills`
  );

  return response.data;
};

export const getCareerTechnologies = async (career) => {
  const response = await api.get(
    `/careers/${encodeURIComponent(career)}/technologies`
  );

  return response.data;
};

export const getCareerProjects = async (career) => {
  const response = await api.get(
    `/careers/${encodeURIComponent(career)}/projects`
  );

  return response.data;
};

// =========================================================
// ROADMAP
// =========================================================

export const getRoadmap = async (career) => {
  const response = await api.get(
    `/roadmaps/${encodeURIComponent(career)}`
  );

  return response.data;
};

export const exploreSkill = async (skill) => {
  const response = await api.get(
    `/skills/${encodeURIComponent(skill)}/explore`
  );

  return response.data;
};

export default api;

