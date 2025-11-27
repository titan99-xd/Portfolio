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

interface ProjectImage {
  id: number;
  project_id: number;
  image_url: string;
}

export default function ProjectEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [project, setProject] = useState<Project | null>(null);
  const [images, setImages] = useState<ProjectImage[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  // Load project + images
  useEffect(() => {
    async function load() {
      const proj = await axios.get(`http://localhost:5000/api/projects/${id}`);
      setProject(proj.data);

      setTitle(proj.data.title);
      setDescription(proj.data.description);
      setLink(proj.data.link || "");
      setThumbnail(proj.data.thumbnail);

      // Load project images
      const imgs = await axios.get<ProjectImage[]>(
        `http://localhost:5000/api/project-images/${id}`
      );
      setImages(imgs.data);
    }
    load();
  }, [id]);

  // Upload additional images
  const uploadImage = async (file: File) => {
    const fd = new FormData();
    fd.append("image", file);

    const res = await axios.post(
      `http://localhost:5000/api/project-images/${id}`,
      fd,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setImages((prev) => [...prev, res.data]);
  };

  // Delete image
  const deleteImage = async (imageId: number) => {
    await axios.delete(
      `http://localhost:5000/api/project-images/image/${imageId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  // Update main project info
  const updateProject = async (e: React.FormEvent) => {
    e.preventDefault();

    await axios.put(
      `http://localhost:5000/api/projects/${id}`,
      { title, description, link, thumbnail },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    navigate("/admin/projects");
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

        <label>Main Thumbnail</label>
        <input
          type="text"
          placeholder="Thumbnail URL"
          value={thumbnail || ""}
          onChange={(e) => setThumbnail(e.target.value)}
        />

        {/* Multiple Images Upload */}
        <label>Additional Images</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files && uploadImage(e.target.files[0])}
        />

        {/* Image Gallery */}
        <div className="project-images-gallery">
          {images.map((img) => (
            <div key={img.id} className="project-image-item">
              <img src={img.image_url} className="project-image" />
              <button
                className="delete-image-btn"
                onClick={() => deleteImage(img.id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <button className="btn-primary">Save Changes</button>
      </form>
    </div>
  );
}
