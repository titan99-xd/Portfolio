import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getProjects,
  SERVER_URL,
} from "../../../services/projects.api";

import "../../../styles/admin-projects.css";
import type { Project } from "../../../types/Project";

export default function AdminProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error("Failed to load projects", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <p>Loading…</p>;

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
                  <img
                    src={`${SERVER_URL}/${p.thumbnail}`}
                    className="project-thumb"
                    alt={p.title}
                  />
                ) : (
                  <span className="no-image">No Thumbnail</span>
                )}
              </td>

              <td>{p.title}</td>
              <td>{p.link || "—"}</td>

              <td>
                <Link
                  to={`/admin/projects/${p.id}`}
                  className="btn-small"
                >
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