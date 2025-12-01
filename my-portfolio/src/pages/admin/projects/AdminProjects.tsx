import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Services
import {
  getProjects,
  deleteProject,
  SERVER_URL,
} from "../../../services/projects.api";

// Types
import type { Project } from "../../../types/Project";

// Styles
import "../../../styles/admin-projects.css";

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Load all projects
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error("Failed to load projects:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // Handle delete
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this project?")) return;

    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert("Failed to delete project");
      console.error(err);
    }
  };

  if (loading) return <p>Loading…</p>;

  return (
    <div className="admin-projects-page">
      <div className="admin-projects-header">
        <h1>Manage Projects</h1>
        <Link to="/admin/projects/new" className="admin-btn-primary">
          + Add New Project
        </Link>
      </div>

      <div className="admin-projects-list">
        {projects.map((p) => (
          <div className="admin-project-card" key={p.id}>
            {p.thumbnail ? (
              <img
                src={`${SERVER_URL}/${p.thumbnail}`}
                alt={p.title}
                className="admin-project-thumb"
              />
            ) : (
              <div className="admin-project-thumb no-image">No Image</div>
            )}

            <div className="admin-project-info">
              <h3>{p.title}</h3>
              <p className="admin-project-desc">{p.description}</p>

              <div className="admin-project-actions">
                <Link
                  to={`/admin/projects/${p.id}`}
                  className="admin-btn-small"
                >
                  Edit
                </Link>

                <button
                  className="admin-btn-danger"
                  onClick={() => handleDelete(p.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}