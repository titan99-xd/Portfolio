import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../..admin-projects.css";

interface Project {
  id: number;
  title: string;
  description: string;
  thumbnail: string | null;
  link: string | null;
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("/api/projects");
      setProjects(res.data);
    } catch {
      console.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: number) => {
    if (!confirm("Delete this project?")) return;

    const token = localStorage.getItem("token");

    try {
      await axios.delete(`/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Failed to delete project");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="admin-projects-page">
      <div className="admin-projects-header">
        <h1>Manage Projects</h1>
        <Link to="/admin/projects/new" className="admin-btn-primary">
          + Add New Project
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="admin-projects-list">
          {projects.map((p) => (
            <div className="admin-project-card" key={p.id}>
              {p.thumbnail && (
                <img src={p.thumbnail} alt={p.title} className="admin-project-thumb" />
              )}

              <div className="admin-project-info">
                <h3>{p.title}</h3>
                <p className="admin-project-desc">{p.description}</p>

                <div className="admin-project-actions">
                  <Link to={`/admin/projects/${p.id}/edit`} className="admin-btn-small">
                    Edit
                  </Link>

                  <button
                    className="admin-btn-danger"
                    onClick={() => deleteProject(p.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
