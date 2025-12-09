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
      <h1 className="portfolio-title">Portfolio & Case Studies</h1>

      <div className="portfolio-grid">
        {projects.map((p, index) => {
          // Use only ONE image (first one)
          const firstImage =
            images[p.id] && images[p.id].length > 0
              ? images[p.id][0].image_url
              : null;

          return (
            <div
              key={p.id}
              className={`portfolio-card ${index % 2 !== 0 ? "reverse" : ""}`}
            >
              {/* Image Section */}
              <div className="portfolio-image-wrapper">
                {firstImage ? (
                  <img
                    src={`${SERVER_URL}/${firstImage}`}
                    alt={p.title}
                    onClick={() =>
                      setSelectedImage(`${SERVER_URL}/${firstImage}`)
                    }
                  />
                ) : (
                  <div className="portfolio-no-image">No Image Available</div>
                )}
              </div>

              {/* Content Section */}
              <div className="portfolio-content">
                <h2>{p.title}</h2>
                <p className="portfolio-description">{p.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen Image Modal */}
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