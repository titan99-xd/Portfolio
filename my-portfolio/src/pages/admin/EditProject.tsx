import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/admin-projects.css";

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
    thumbnail: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`/api/projects/${id}`).then((res) => {
      setForm(res.data);
    });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(
        `/api/projects/${id}`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate("/admin/projects");
    } catch {
      alert("Failed to update project");
    }
  };

  return (
    <div className="admin-project-form">
      <h1>Edit Project</h1>

      <form onSubmit={submit}>
        <label>Title</label>
        <input name="title" value={form.title} onChange={handleChange} required />

        <label>Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} required />

        <label>Project Link</label>
        <input name="link" value={form.link} onChange={handleChange} />

        <label>Thumbnail URL</label>
        <input name="thumbnail" value={form.thumbnail} onChange={handleChange} />

        <button className="admin-btn-primary">Save Changes</button>
      </form>
    </div>
  );
}
