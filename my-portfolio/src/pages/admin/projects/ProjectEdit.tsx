import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../../../styles/admin-projects.css";

interface Project {
  id: number;
  title: string;
  description: string;
  link: string | null;
  thumbnail: string | null;
}

export default function ProjectEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [project, setProject] = useState<Project | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/projects/${id}`).then((res) => {
      const p = res.data;

      setProject(p);
      setTitle(p.title);
      setDescription(p.description);
      setLink(p.link || "");
      setThumbnail(p.thumbnail);
    });
  }, [id]);

  const uploadImage = async (file: File) => {
    const fd = new FormData();
    fd.append("image", file);

    const res = await axios.post("http://localhost:5000/api/upload", fd, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setThumbnail(res.data.url);
  };

  const updateProject = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/projects/${id}`,
        {
          title,
          description,
          link,
          thumbnail,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      navigate("/admin/projects");
    } catch {
      alert("Failed to update project");
    }
  };

  if (!project) return <p>Loading...</p>;

  return (
    <div className="admin-projects-form-container">
      <h1>Edit Project</h1>

      <form onSubmit={updateProject} className="admin-projects-form">

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

        <button className="btn-primary">Save Changes</button>
      </form>
    </div>
  );
}
