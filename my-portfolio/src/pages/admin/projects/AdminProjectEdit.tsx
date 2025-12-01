import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Services
import {
  getProjectById,
  updateProject,
} from "../../../services/projects.api";

// Components
import AdminProjectImages from "./AdminProjectImages";
import AdminLayout from "../../../components/admin/AdminLayout";

// Types
import type { Project } from "../../../types/Project";

// Styles
import "../../../styles/admin-project-edit.css";

export default function AdminProjectEdit() {
  const { id } = useParams();
  const projectId = Number(id);

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Load project
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProjectById(projectId);
        setProject(data);
      } catch {
        setMessage("❌ Failed to load project.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [projectId]);

  const handleSave = async () => {
    if (!project) return;

    setSaving(true);
    setMessage(null);

    try {
      await updateProject(projectId, project);
      setMessage("✅ Project updated successfully!");
    } catch {
      setMessage("❌ Failed to update project.");
    } finally {
      setSaving(false);
    }
  };

if (loading)
  return (
    <AdminLayout title="Edit Project">
      <p>Loading…</p>
    </AdminLayout>
  );

if (!project)
  return (
    <AdminLayout title="Edit Project">
      <p>Project not found.</p>
    </AdminLayout>
  );

  return (
    <AdminLayout title="Edit Project">

      <div className="admin-project-edit">

        {message && <p className="info">{message}</p>}

        <div className="project-form">
          <label>
            Title
            <input
              value={project.title}
              onChange={(e) =>
                setProject({ ...project, title: e.target.value })
              }
            />
          </label>

          <label>
            Description
            <textarea
              rows={6}
              value={project.description}
              onChange={(e) =>
                setProject({ ...project, description: e.target.value })
              }
            />
          </label>

          <label>
            Project Link
            <input
              value={project.link || ""}
              onChange={(e) =>
                setProject({ ...project, link: e.target.value })
              }
            />
          </label>

          <label>
            Thumbnail URL
            <input
              value={project.thumbnail || ""}
              onChange={(e) =>
                setProject({ ...project, thumbnail: e.target.value })
              }
            />
          </label>

          <button onClick={handleSave} disabled={saving}>
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>

        <h2>Project Images</h2>
        <AdminProjectImages projectId={projectId} />

      </div>

    </AdminLayout>
  );
}