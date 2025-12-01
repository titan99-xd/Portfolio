import { useEffect, useState } from "react";
import {
  getProjectImages,
  uploadProjectImage,
  deleteProjectImage,
  SERVER_URL,
} from "../../../services/projects.api";

import type { ProjectImage } from "../../../types/ProjectImage";

interface Props {
  projectId: number;
}

export default function AdminProjectImages({ projectId }: Props) {
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load all images for the project
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProjectImages(projectId);
        setImages(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load images");
      }
    };

    load();
  }, [projectId]);

  // Upload new image
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      await uploadProjectImage(projectId, file);

      // Reload images from server
      const data = await getProjectImages(projectId);
      setImages(data);
    } catch (err) {
      console.error(err);
      setError("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // Delete an image
  const handleDelete = async (imageId: number) => {
    try {
      await deleteProjectImage(projectId, imageId);
      setImages((prev) => prev.filter((img) => img.id !== imageId));
    } catch (err) {
      console.error(err);
      setError("Failed to delete image");
    }
  };

  return (
    <div className="image-manager">
      <h2>Project Images</h2>

      <input type="file" onChange={handleUpload} disabled={uploading} />

      {uploading && <p>Uploading…</p>}
      {error && <p className="error">{error}</p>}

      <div className="image-grid">
        {images.map((img) => (
          <div key={img.id} className="image-item">
            <img
              src={`${SERVER_URL}/${img.image_url}`}
              className="thumb"
              alt=""
            />
            <button onClick={() => handleDelete(img.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}