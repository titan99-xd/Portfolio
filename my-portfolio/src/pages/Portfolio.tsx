import Footer from '../components/layout/Footer';
import '../styles/portfolio.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

// Type for project returned by backend
interface Project {
  id: number;
  title: string;
  description: string;
  link: string | null;
  thumbnail: string | null;
}

export default function Portfolio() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const openModal = (image: string) => setSelectedImage(image);
  const closeModal = () => setSelectedImage(null);

  // Fetch projects from backend
  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await axios.get<Project[]>("http://localhost:5000/api/projects");
        setProjects(res.data);
      } catch (err) {
        console.error("Failed to load projects:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  if (loading) {
    return <p className="portfolio-loading">Loading projects...</p>;
  }

  return (
    <div className='portfolio-page'>
      
      {/* Hero Section */}
      <section className='portfolio-hero'>
        <div className='portfolio-hero-background'>
          <div className='gradient-orb orb-1'></div>
          <div className='gradient-orb orb-2'></div>
          <div className='gradient-orb orb-3'></div>
          <div className='grid-pattern'></div>
        </div>
        
        <div className='portfolio-hero-container'>
          <h1 className='portfolio-hero-title'>
            Portfolio
            <span className='gradient-text'> & Case Studies</span>
          </h1>
          
          <p className='portfolio-hero-subtitle'>
            Explore the projects I’ve built and the ideas I’ve brought to life.
            From web apps to mobile solutions, my portfolio highlights the skills I’ve developed
            and the challenges I’ve solved along my journey in tech.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section className='projects-section'>
        <div className='projects-container'>
          {projects.map((project, index) => (
            <div key={project.id} className={`project-card ${index % 2 === 0 ? 'even' : 'odd'}`}>
              
              {/* IMAGES — from DB: only 1 thumbnail */}
              <div className='project-images'>
                {project.thumbnail ? (
                  <img 
                    src={project.thumbnail} 
                    alt={`${project.title} thumbnail`}
                    onClick={() => openModal(project.thumbnail!)}
                  />
                ) : (
                  <div className="no-thumbnail">No Image</div>
                )}
              </div>

              <div className='project-content'>
                <h3 className='project-title'>{project.title}</h3>

                {project.link && (
                  <p className='project-subtitle'>{project.link}</p>
                )}

                <p className='project-description'>{project.description}</p>

                {/* Temporary features section (since DB does not have features yet) */}
                <div className='project-features'>
                  <h4>Main Highlights</h4>
                  <ul>
                    <li>Dynamic project loaded from admin dashboard</li>
                    <li>Thumbnail uploaded via admin panel</li>
                    <li>Rendered using real-time database data</li>
                  </ul>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div className='image-modal' onClick={closeModal}>
          <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            <button className='modal-close' onClick={closeModal} aria-label="Close modal">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            <img src={selectedImage} alt="Full size view" />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
