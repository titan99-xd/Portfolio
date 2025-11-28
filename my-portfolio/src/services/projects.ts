import axios from "axios";

const API_URL = "http://localhost:5050/api/projects";

export const getProjects = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getProjectImages = async (projectId: number) => {
  const res = await axios.get(`${API_URL}/${projectId}/images`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};
