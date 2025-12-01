import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProject } from "../../../services/projects.api";

import "../../../styles/admin-projects.css";

export default function AdminProjectCreate() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
    thumbnail: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await createProject(form);
      const projectId = res.id || res.insertId;

      navigate(`/admin/projects/${projectId}`);
    } catch (err) {
      alert("Failed to create project");
      console.error(err);
    }
  };

  return (
    <div className="admin-projects-form-container">
      <h1>Create New Project</h1>

      <form onSubmit={submit} className="admin-projects-form">
        
        <label>Title</label>
        <input name="title" value={form.title} onChange={handleChange} required />

        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={6}
          required
        />

        <label>Project Link</label>
        <input name="link" value={form.link} onChange={handleChange} />

        <label>Thumbnail URL</label>
        <input
          name="thumbnail"
          value={form.thumbnail}
          onChange={handleChange}
        />

        <button className="btn-primary">Create Project</button>
      </form>
    </div>
  );
}