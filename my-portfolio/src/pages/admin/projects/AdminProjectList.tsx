import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Services
import { getProjects, SERVER_URL } from "../../../services/projects.api";

// Layout
import AdminLayout from "../../../components/admin/AdminLayout";
// import ConfirmModal from "../../../components/admin/ConfirmModal";

// Styles
import "../../../styles/admin-projects.css";

// Types
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
        console.error("Failed to load projects:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <AdminLayout title="Projects">
      <div className="admin-projects-container">

        <div className="admin-projects-header">
          <h1>Admin access only</h1>
          <Link to="/admin/projects/new" className="btn-primary">
            + New Project
          </Link>
        </div>

        {loading ? (
          <p>Loading…</p>
        ) : (
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

                  <td>
                    {p.link ? (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {p.link}
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>

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
        )}

        {/* Confirm Delete Modal */}
              {/* <ConfirmModal
                isOpen={modalOpen}
                title="Delete This Project?"
                message="This action cannot be undone. Are you sure?"
                confirmLabel="Delete"
                cancelLabel="Cancel"
                onConfirm={confirmDelete}
                onCancel={closeDeleteModal}
              /> */}

      </div>
    </AdminLayout>
  );
}