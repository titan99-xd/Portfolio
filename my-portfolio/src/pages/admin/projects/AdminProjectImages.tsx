import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../../services/projects.api";

interface ProjectImage {
  id: number;
  project_id: number;
  image_url: string;
}

interface Props {
  projectId: number;
}

export default function AdminProjectImages({ projectId }: Props) {
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${SERVER_URL}/api/projects/${projectId}/images`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setImages(res.data);
      } catch {
        setError("Failed to load images");
      }
    };

    loadImages();
  }, [projectId]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${SERVER_URL}/api/projects/${projectId}/images`,
        (() => {
          const fd = new FormData();
          fd.append("file", file);
          return fd;
        })(),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Refresh list
      const res = await axios.get(
        `${SERVER_URL}/api/projects/${projectId}/images`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setImages(res.data);
    } catch {
      setError("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (imageId: number) => {
    const token = localStorage.getItem("token");

    await axios.delete(
      `${SERVER_URL}/api/projects/${projectId}/images/${imageId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setImages((prev) => prev.filter((i) => i.id !== imageId));
  };

  return (
    <div className="image-manager">
      <h2>Project Images</h2>

      <input type="file" onChange={handleUpload} disabled={uploading} />

      {uploading && <p>Uploading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="image-grid">
        {images.map((img) => (
          <div key={img.id} className="image-item">
            <img
              src={`${SERVER_URL}/${img.image_url}`}
              className="thumb"
            />
            <button onClick={() => deleteImage(img.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}