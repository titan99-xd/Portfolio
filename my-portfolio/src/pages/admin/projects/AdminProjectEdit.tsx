import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  updateProject,
  SERVER_URL,
} from "../../../services/projects.api";

import axios from "axios";
import AdminProjectImages from "./AdminProjectImages";

import "../../../styles/admin-project-edit.css";

interface Project {
  id: number;
  title: string;
  description: string;
  link: string | null;
  thumbnail?: string | null;
}

export default function AdminProjectEdit() {
  const { id } = useParams();
  const projectId = Number(id);

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${SERVER_URL}/api/projects/${projectId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProject(res.data);
      } catch {
        setMsg("Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [projectId]);

  const handleSave = async () => {
    if (!project) return;

    setSaving(true);
    setMsg(null);

    try {
      await updateProject(projectId, project);
      setMsg("Saved successfully!");
    } catch {
      setMsg("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading project…</p>;
  if (!project) return <p>Project not found.</p>;

  return (
    <div className="admin-project-edit">
      <h1>Edit Project</h1>

      {msg && <p className="info">{msg}</p>}

      <div className="project-form">

        <label>Title
          <input
            type="text"
            value={project.title}
            onChange={(e) => setProject({ ...project, title: e.target.value })}
          />
        </label>

        <label>Description
          <textarea
            rows={6}
            value={project.description}
            onChange={(e) =>
              setProject({ ...project, description: e.target.value })
            }
          />
        </label>

        <label>Project Link
          <input
            type="text"
            value={project.link || ""}
            onChange={(e) => setProject({ ...project, link: e.target.value })}
          />
        </label>

        <label>Thumbnail
          <input
            type="text"
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
  );
}