import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Services
import { createProject } from "../../../services/projects.api";

// Layout
import AdminLayout from "../../../components/admin/AdminLayout";

// Styles
import "../../../styles/admin/project/project-create.css";

export default function AdminProjectCreate() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
    thumbnail: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await createProject(form);
      const projectId = res.id || res.insertId;

      navigate(`/admin/projects/${projectId}`);
    } catch (error) {
      alert("Failed to create project");
      console.error(error);
    }
  };

  return (
    <AdminLayout title="Create New Project">
      <div className="admin-projects-form-container">
        <form onSubmit={submit} className="admin-projects-form">

          <label>Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            rows={6}
            onChange={handleChange}
            required
          />

          <label>Project Link</label>
          <input name="link" value={form.link} onChange={handleChange} />

          <label>Thumbnail URL</label>
          <input
            name="thumbnail"
            placeholder="Optional — you can upload images after creating"
            value={form.thumbnail}
            onChange={handleChange}
          />

          <button className="btn-primary">Create Project</button>
        </form>
      </div>
    </AdminLayout>
  );
}