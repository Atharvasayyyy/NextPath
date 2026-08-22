import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getRoadmap = async (career) => {
  const response = await api.get(
    `/roadmaps/${encodeURIComponent(career)}`
  );

  return response.data;
};

export default api;