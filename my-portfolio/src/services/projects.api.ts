import axios from "axios";
import type { Project } from "../types/Project";
import type { ProjectImage } from "../types/ProjectImage";

export const SERVER_URL = "http://localhost:5050";
const API_BASE = `${SERVER_URL}/api`;

// =========================
// GET ALL PROJECTS (PUBLIC)
// =========================
export async function getProjects(): Promise<Project[]> {
  const res = await axios.get(`${API_BASE}/projects`);
  return res.data;
}

// ===============================
// GET IMAGES FOR A PROJECT (ADMIN)
// ===============================
export async function getProjectImages(
  projectId: number
): Promise<ProjectImage[]> {
  const res = await axios.get(`${API_BASE}/projects/${projectId}/images`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });
  return res.data;
}

// =========================
// ADD PROJECT (ADMIN)
// =========================
export async function createProject(project: Partial<Project>) {
  const res = await axios.post(`${API_BASE}/projects`, project, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });
  return res.data;
}

// =========================
// UPDATE PROJECT (ADMIN)
// =========================
export async function updateProject(id: number, project: Partial<Project>) {
  const res = await axios.put(`${API_BASE}/projects/${id}`, project, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });
  return res.data;
}

// =========================
// DELETE PROJECT (ADMIN)
// =========================
export async function deleteProject(id: number) {
  const res = await axios.delete(`${API_BASE}/projects/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });
  return res.data;
}

// =========================
// UPLOAD IMAGE (ADMIN)
// =========================
export async function uploadProjectImage(projectId: number, file: File) {
  const form = new FormData();
  form.append("file", file);

  const res = await axios.post(
    `${API_BASE}/projects/${projectId}/images`,
    form,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    }
  );

  return res.data;
}
// =============================
// GET ONE PROJECT BY ID
// =============================
export async function getProjectById(id: number): Promise<Project> {
  const res = await axios.get(`${API_BASE}/projects/${id}`);
  return res.data;
}
// =================================
// DELETE IMAGE (ADMIN)
// =========================
export async function deleteProjectImage(projectId: number, imageId: number) {
  const res = await axios.delete(
    `${API_BASE}/projects/${projectId}/images/${imageId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    }
  );

  return res.data;
}