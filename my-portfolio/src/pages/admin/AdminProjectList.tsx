import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getProjects,
  deleteProject,
} from "../../services/projects.api";
import type { Project } from "../../types/Project";

export default function AdminProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function load() {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      console.error("Failed to load projects:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  // Delete a project
  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Failed to delete project:", err);
      alert("Could not delete project");
    }
  }

  if (loading) {
    return (
      <div className="admin-loading">
        <p>Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Projects</h1>
        <button
          className="admin-btn primary"
          onClick={() => navigate("/admin/projects/new")}
        >
          + Add New Project
        </button>
      </div>

      {projects.length === 0 ? (
        <p>No projects added yet.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Link</th>
              <th style={{ width: "130px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>{project.id}</td>
                <td>{project.title}</td>
                <td>{project.link || "—"}</td>

                <td className="admin-actions">
                  <Link
                    to={`/admin/projects/${project.id}/edit`}
                    className="admin-btn small"
                  >
                    Edit
                  </Link>

                  <button
                    className="admin-btn danger small"
                    onClick={() => handleDelete(project.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
