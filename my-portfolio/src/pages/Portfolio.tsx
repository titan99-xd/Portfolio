import Footer from '../components/layout/Footer';
import '../styles/portfolio.css';
// import khelsetImg from '../assets//khelset_logo.png';
import khelsetImg1 from '../assets/khelset_1.jpeg';
import khelsetImg2 from '../assets/khelset_2.jpeg';
import khelsetImg3 from '../assets/khelset_3.jpeg';
import ComingSoon from '../assets/comingsoon.png';
import { useState } from 'react';

export default function Portfolio() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = (image: string) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };
  const projects = [
    {
      id: 1,
      title: 'Khelset Live Scoring & Sport Tournament Management Platform',
      subtitle: 'www.khelset.com',
      description: 'Khelset is a comprehensive live-scoring platform for sports like cricket, football, volleyball, futsal, and basketball. It provides real-time match updates, player statistics, live commentary, and complete tournament management tools. With dedicated admin controls for live scoring and a user-friendly app for audiences, Khelset simplifies everything from team registration to event creation and reporting.',
      features: [
        'Multi-sport live scoring (cricket, football, volleyball, futsal, basketball)',
        'Admin dashboard for scoring and event management',
        'User app for live scores, text based live-commentary, and player stats',
        'Automated tournament scheduling and bracket generation',
        'Team registration and event creation tools',
        'Real-time notifications and result publishing',
        'Comprehensive analytics and reporting dashboard'
  ],
  images: [khelsetImg1, khelsetImg2, khelsetImg3]
},

    {
      id: 2,
      title: 'DriveMate',
      subtitle: 'Lauch Date: Q2 2026',
      description: 'DriveMate is a kilometer tracker app designed to help users monitor and log their vehicle mileage for business and personal use. The app automatically tracks trips using GPS, categorizes them, and generates detailed reports that can be exported for tax deductions or reimbursements. With an intuitive interface and robust features, DriveMate simplifies mileage tracking for freelancers, employees, and anyone needing accurate travel logs.',
      features: [
        'Automatic Trip Tracking',
        'Trip Categorization (Business/Personal)',
        'Detailed Reports',
        'Data Export (CSV, PDF)',
        'Intuitive Interface'
      ],
      
      images: [ComingSoon, ComingSoon, ComingSoon]
    },
    {
      id: 3,
      title: 'Event Management Software for Local Conferences',
      subtitle: 'Launch Date: Q3 2026',
      description: 'An end-to-end event management platform that handles every stage of your event from registration to analytics. Ideal for corporate, community, or large-scale public events.',
      features: [
        'Event creation & customization',
        'Attendee registration & ticketing',
        'Agenda & session scheduling',
        'Real-time analytics & reporting',
        'Automated notifications & reminders'
      ],
      
      images: [ComingSoon, ComingSoon, ComingSoon]
    },
  ];

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
          {/* <div className='portfolio-badge'>
            <span>Our Work</span>
          </div> */}
          
          <h1 className='portfolio-hero-title'>
            Portfolio
            <span className='gradient-text'> & Case Studies</span>
          </h1>
          
          <p className='portfolio-hero-subtitle'>
            Explore the projects I’ve built and the ideas I’ve brought to life.
             From web apps to mobile solutions, my portfolio highlights the skills I’ve developed and the challenges I’ve solved along my journey in tech.
             Each project reflects my passion for creating clean, user-friendly, and meaningful digital experiences.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section className='projects-section'>
        <div className='projects-container'>
          {projects.map((project, index) => (
            <div key={project.id} className={`project-card ${index % 2 === 0 ? 'even' : 'odd'}`}>
              <div className='project-images'>
                {project.images.map((img, idx) => (
                  <img 
                    key={idx} 
                    src={img} 
                    alt={`${project.title} screenshot ${idx + 1}`}
                    onClick={() => openModal(img)}
                  />
                ))}
              </div>
              
              <div className='project-content'>
                <h3 className='project-title'>{project.title}</h3>
                {project.subtitle && (
                  <p className='project-subtitle'>{project.subtitle}</p>
                )}
                
                <p className='project-description'>{project.description}</p>
                
                <div className='project-features'>
                  <h4>Key Features:</h4>
                  <ul>
                    {project.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
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


