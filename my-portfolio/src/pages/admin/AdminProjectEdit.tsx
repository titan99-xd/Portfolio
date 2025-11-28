import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AdminProjectImages from "./AdminProjectImages";
import "../../styles/admin-project-edit.css";

interface Project {
  id: number;
  title: string;
  description: string;
  link: string | null;
}

export default function AdminProjectEdit() {
  const { id } = useParams(); // project ID from URL
  const projectId = Number(id);

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Load project on mount
  useEffect(() => {
    const loadProject = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:5050/api/projects/${projectId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setProject(res.data);
      } catch {
        setError("Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [projectId]);

  // Save project changes
  const handleSave = async () => {
    if (!project) return;

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5050/api/projects/${projectId}`,
        project,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccess("Project updated successfully!");
    } catch {
      setError("Failed to save project");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading project...</p>;
  if (!project) return <p>Project not found.</p>;

  return (
    <div className="admin-project-edit">
      <h1>Edit Project</h1>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      {/* Project Form */}
      <div className="project-form">
        <label>
          Title
          <input
            type="text"
            value={project.title}
            onChange={(e) =>
              setProject({ ...project, title: e.target.value })
            }
          />
        </label>

        <label>
          Description
          <textarea
            rows={5}
            value={project.description}
            onChange={(e) =>
              setProject({ ...project, description: e.target.value })
            }
          />
        </label>

        <label>
          Project Link
          <input
            type="text"
            value={project.link || ""}
            onChange={(e) =>
              setProject({ ...project, link: e.target.value })
            }
          />
        </label>

        <button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Images Section */}
      <h2>Project Images</h2>

      <AdminProjectImages projectId={projectId} />
    </div>
  );
}
