import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProject } from "../../services/projects.api";
import type { Project } from "../../types/Project";

export default function AdminProjectCreate() {
  const navigate = useNavigate();

  const [form, setForm] = useState<Partial<Project>>({
    title: "",
    description: "",
    link: "",
    features: [],
  });

  const [newFeature, setNewFeature] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function addFeature() {
    if (!newFeature.trim()) return;
    setForm({
      ...form,
      features: [...(form.features || []), newFeature.trim()],
    });
    setNewFeature("");
  }

  function removeFeature(index: number) {
    setForm({
      ...form,
      features: form.features?.filter((_, i) => i !== index) || [],
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.title || !form.description) {
      alert("Title and description are required.");
      return;
    }

    setLoading(true);

    try {
      const result = await createProject(form);
      const newId = result.projectId;

      alert("Project created successfully!");

      navigate(`/admin/projects/${newId}/edit`);
    } catch (err) {
      console.error("Failed to create project:", err);
      alert("Could not create project.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-page">
      <h1>Create New Project</h1>

      <form className="admin-form" onSubmit={handleSubmit}>
        {/* Title */}
        <label>Project Title</label>
        <input
          type="text"
          name="title"
          value={form.title || ""}
          onChange={handleChange}
          placeholder="Project name"
        />

        {/* Description */}
        <label>Description</label>
        <textarea
          name="description"
          value={form.description || ""}
          onChange={handleChange}
          rows={5}
          placeholder="Describe the project..."
        />

        {/* Link */}
        <label>Project Link (optional)</label>
        <input
          type="text"
          name="link"
          value={form.link || ""}
          onChange={handleChange}
          placeholder="https://example.com"
        />

        {/* Features */}
        <label>Features</label>
        <div className="admin-feature-row">
          <input
            type="text"
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            placeholder="Add a feature"
          />
          <button type="button" className="admin-btn small" onClick={addFeature}>
            Add
          </button>
        </div>

        {form.features && form.features.length > 0 && (
          <ul className="admin-feature-list">
            {form.features.map((f, index) => (
              <li key={index}>
                {f}
                <button
                  type="button"
                  className="admin-btn danger small"
                  onClick={() => removeFeature(index)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}

        <button className="admin-btn primary" disabled={loading}>
          {loading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </div>
  );
}
