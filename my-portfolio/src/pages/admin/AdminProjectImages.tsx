import { useEffect, useState } from "react";
import axios from "axios";

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

  // Load images when component mounts
  useEffect(() => {
    const loadImages = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:5050/api/projects/${projectId}/images`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setImages(res.data);
      } catch {
        setError("Failed to load images");
      }
    };

    loadImages();
  }, [projectId]); // only runs when projectId changes

  // Upload image handler
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("file", file);

      await axios.post(
        `http://localhost:5050/api/projects/${projectId}/images`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // refresh image list
      const updated = await axios.get(
        `http://localhost:5050/api/projects/${projectId}/images`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setImages(updated.data);
    } catch {
      setError("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // Delete image handler
  const deleteImage = async (imageId: number) => {
    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:5050/api/projects/${projectId}/images/${imageId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setImages((prev) => prev.filter((i) => i.id !== imageId));
  };

  return (
    <div className="image-manager">
      <h2>Project Images</h2>

      {/* Upload input */}
      <div>
        <input type="file" onChange={handleUpload} disabled={uploading} />
        {uploading && <p>Uploading...</p>}
      </div>

      {/* Error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Image grid */}
      <div className="image-grid">
        {images.map((img) => (
          <div key={img.id} className="image-item">
            <img
              src={`http://localhost:5050/${img.image_url}`}
              alt=""
              className="thumb"
            />
            <button onClick={() => deleteImage(img.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
