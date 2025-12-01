import { useEffect, useState } from "react";
import "../styles/portfolio.css";

import {
  getProjects,
  getProjectImages,
  SERVER_URL,
} from "../services/projects.api";

import type { Project } from "../types/Project";
import type { ProjectImage } from "../types/ProjectImage";

type ImageMap = Record<number, ProjectImage[]>;

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [images, setImages] = useState<ImageMap>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const proj = await getProjects();
        setProjects(proj);

        const imgMap: ImageMap = {};

        for (const p of proj) {
          const imgs = await getProjectImages(p.id);
          imgMap[p.id] = imgs;
        }

        setImages(imgMap);
      } catch (err) {
        console.error("Failed to load projects", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <p>Loading portfolio...</p>;

  return (
    <div className="portfolio-page">
      <h1 className="portfolio-title">Portfolio</h1>

      <div className="portfolio-grid">
        {projects.map((p) => (
          <div key={p.id} className="portfolio-card">
            {/* Thumbnail */}
            {p.thumbnail ? (
              <img
                src={`${SERVER_URL}/${p.thumbnail}`}
                alt={p.title}
                className="portfolio-thumb"
              />
            ) : (
              <div className="portfolio-no-thumb">No Thumbnail</div>
            )}

            <h2>{p.title}</h2>
            <p>{p.description}</p>

            {/* Images gallery */}
            <div className="portfolio-gallery">
              {images[p.id]?.map((img) => (
                <img
                  key={img.id}
                  src={`${SERVER_URL}/${img.image_url}`}
                  className="portfolio-gallery-image"
                  onClick={() =>
                    setSelectedImage(`${SERVER_URL}/${img.image_url}`)
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      {selectedImage && (
        <div
          className="portfolio-fullscreen"
          onClick={() => setSelectedImage(null)}
        >
          <img src={selectedImage} />
        </div>
      )}
    </div>
  );
}