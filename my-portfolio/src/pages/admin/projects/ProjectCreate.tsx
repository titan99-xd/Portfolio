import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../styles/admin-projects.css";

export default function ProjectCreate() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  const uploadImage = async (file: File) => {
    const fd = new FormData();
    fd.append("image", file);

    const res = await axios.post("http://localhost:5000/api/upload", fd, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setThumbnail(res.data.url);
  };

  const createProject = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/projects",
        {
          title,
          description,
          link,
          thumbnail
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      navigate("/admin/projects");
    } catch {
      alert("Failed to create project");
    }
  };

  return (
    <div className="admin-projects-form-container">
      <h1>New Project</h1>

      <form onSubmit={createProject} className="admin-projects-form">

        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Description</label>
        <textarea
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label>Project Link</label>
        <input value={link} onChange={(e) => setLink(e.target.value)} />

        <label>Thumbnail</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            e.target.files && uploadImage(e.target.files[0])
          }
        />

        {thumbnail && <img src={thumbnail} className="project-thumb-preview" />}

        <button className="btn-primary">Create Project</button>
      </form>
    </div>
  );
}
