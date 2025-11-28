import { useEffect, useState } from "react";
import Footer from "../components/layout/Footer";
import "../styles/portfolio.css";
import { getProjects, getProjectImages } from "../services/projects.api";
import type { Project } from "../types/Project";
import type { ProjectImage } from "../types/ProjectImage";

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [images, setImages] = useState<Record<number, string[]>>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Load all projects + images
  useEffect(() => {
    async function load() {
      try {
        const proj = await getProjects();
        setProjects(proj);

        const imgMap: Record<number, string[]> = {};

        for (const p of proj) {
          try {
            const imgs: ProjectImage[] = await getProjectImages(p.id);
            imgMap[p.id] = imgs.map(
              (img) => `http://localhost:5050/${img.image_url}`
            );
          } catch {
            imgMap[p.id] = [];
          }
        }

        setImages(imgMap);
      } catch (err) {
        console.error("Failed to load portfolio:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const openModal = (image: string) => setSelectedImage(image);
  const closeModal = () => setSelectedImage(null);

  if (loading) {
    return (
      <div className="portfolio-loading">
        <p>Loading portfolio...</p>
      </div>
    );
  }

  return (
    <div className="portfolio-page">
      {/* Hero Section */}
      <section className="portfolio-hero">
        <div className="portfolio-hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
          <div className="grid-pattern"></div>
        </div>

        <div className="portfolio-hero-container">
          <h1 className="portfolio-hero-title">
            Portfolio
            <span className="gradient-text"> & Case Studies</span>
          </h1>

          <p className="portfolio-hero-subtitle">
            Explore real projects built for clients and my own startup ideas.
            Clean, functional, and meaningful digital experiences.
          </p>
        </div>
      </section>

      {/* Project Cards */}
      <section className="projects-section">
        <div className="projects-container">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card ${index % 2 === 0 ? "even" : "odd"}`}
            >
              <div className="project-images">
                {(images[project.id] || []).map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${project.title} image ${idx + 1}`}
                    onClick={() => openModal(img)}
                  />
                ))}
              </div>

              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>

                {project.link && (
                  <p className="project-subtitle">{project.link}</p>
                )}

                <p className="project-description">{project.description}</p>

                {project.features && (
                  <div className="project-features">
                    <h4>Key Features:</h4>
                    <ul>
                      {project.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div className="image-modal" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={closeModal}
              aria-label="Close modal"
            >
              ✕
            </button>
            <img src={selectedImage} alt="Full size view" />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
