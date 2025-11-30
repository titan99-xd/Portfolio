import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../../styles/admin-projects.css";

interface Project {
  id: number;
  title: string;
  description: string;
  link: string | null;
  thumbnail: string | null;
  created_at: string;
}

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await axios.get("http://localhost:5050/api/projects");
        setProjects(res.data);
      } catch {
        console.error("Failed to load projects");
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-projects-container">
      <div className="admin-projects-header">
        <h1>Projects</h1>
        <Link to="/admin/projects/new" className="btn-primary">
          + New Project
        </Link>
      </div>

      <table className="admin-projects-table">
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Link</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {projects.map((p) => (
            <tr key={p.id}>
              <td>
                {p.thumbnail ? (
                  <img src={p.thumbnail} className="project-thumb" />
                ) : (
                  <span className="no-image">No Image</span>
                )}
              </td>
              <td>{p.title}</td>
              <td>{p.link || "—"}</td>
              <td>
                <Link to={`/admin/projects/${p.id}/edit`} className="btn-small">
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
