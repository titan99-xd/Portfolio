import { Link } from 'react-router-dom'
import Footer from '../components/layout/Footer.tsx'
// import trinovaLogo from '../assets/trinova_logo.png'
import '../styles/home.css'
import '../styles/home-hero.css'
import '../styles/home-ser.css'
import ProjectCard from '../components/ProjectCard.tsx'
// import ContactButton from '../components/ui/contact-me-btn.tsx'



export default function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        {/* Animated Background Elements */}
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
          <div className="grid-pattern"></div>
        </div>

        <div className="hero-container">
          <div className="hero-content">
            <div className="badge-container">
             
            </div>
            
            <h1 className="hero-title">
              Welcome to My
              <span className="highlight-block">
                <span className="highlight">Website</span>
                <span className="highlight-underline"></span>
              </span>
            </h1>
            
            <p className="hero-subtitle">
              Hei, I am <span className="subtitle-highlight">Abhinav Gautam, </span>,a Nepal-born developer studying ICT Engineering in Finland. My tech journey started with modding a GTA V FiveM server, which sparked my passion for coding. Since then, I’ve grown into web, mobile, and software development, always aiming to create simple, accessible, and meaningful digital solutions. I love exploring new technologies, solving problems, and building experiences that make tech easier for everyone.
            </p>
            
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-icon">☕</div>
                <div className="stat-content">
                  <div className="stat-number">1000+</div>
                  <div className="stat-label">Cups of Coffee Consumed</div>
                </div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-icon">🏆</div>
                <div className="stat-content">
                  <div className="stat-number">30k+</div>
                  <div className="stat-label">Gaming Hours</div>
                </div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-icon">🌐</div>
                <div className="stat-content">
                  <div className="stat-number">5+</div>
                  <div className="stat-label">Country Visited</div>
                </div>
              </div>
            </div>
            
            <div className="hero-cta">
              <Link to="/portfolio" className="btn btn-primary">
                <span className="btn-text">Explore My Work</span>
                <span className="btn-icon-wrapper">
                  <svg className="btn-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </Link>
              <Link to="/about" className="btn btn-secondary">
                <span className="btn-text">About Me</span>
                <span className="btn-shimmer"></span>
              </Link>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="hero-illustration">
              {/* Floating Elements Background */}
              <div className="floating-shapes">
                <div className="shape shape-circle"></div>
                <div className="shape shape-square"></div>
                <div className="shape shape-triangle"></div>
              </div>

              {/* Main Dashboard Card */}
              <div className="feature-card dashboard-card">
                <div className="card-header">
                  <div className="header-left">
                    <div className="card-icon">💻</div>
                    <div className="card-title">
                      <div className="title-text">Development</div>
                      <div className="title-subtitle">In Progress</div>
                    </div>
                  </div>
                  <div className="card-status">
                    <span className="status-dot"></span>
                    <span className="status-text">Live</span>
                  </div>
                </div>
                <div className="card-body">
                  <div className="progress-bars">
                    <div className="progress-item">
                      <div className="progress-label">
                        <span>Frontend</span>
                        <span className="progress-value">85%</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill progress-85"></div>
                      </div>
                    </div>
                    <div className="progress-item">
                      <div className="progress-label">
                        <span>Backend</span>
                        <span className="progress-value">92%</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill progress-92"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Analytics Card */}
              <div className="feature-card analytics-card">
                <div className="analytics-header">
                  <span className="analytics-title">📊 Performance</span>
                  <span className="trend-badge">
                    <span className="trend-icon">↗</span>
                    <span className="trend-value">+24%</span>
                  </span>
                </div>
                <div className="mini-chart">
                  <div className="chart-bar bar-1"></div>
                  <div className="chart-bar bar-2"></div>
                  <div className="chart-bar bar-3"></div>
                  <div className="chart-bar bar-4"></div>
                  <div className="chart-bar bar-5"></div>
                  <div className="chart-bar bar-6"></div>
                </div>
              </div>
              
              {/* Mobile App Card */}
              <div className="feature-card mobile-card">
                <div className="mobile-device">
                  <div className="mobile-frame">
                    <div className="mobile-screen">
                      <div className="mobile-notch"></div>
                      <div className="mobile-header">
                        <div className="mobile-time">9:41</div>
                      </div>
                      <div className="mobile-content">
                        <div className="mobile-element"></div>
                        <div className="mobile-element short"></div>
                        <div className="mobile-element medium"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Success Notification */}
              <div className="feature-card notification-card">
                <div className="notification-content">
                  <div className="notification-icon">✓</div>
                  <div className="notification-text">
                    <div className="notification-title">Deployed Successfully!</div>
                    <div className="notification-time">Just now</div>
                  </div>
                </div>
              </div>

              {/* Code Window */}
              <div className="feature-card code-card">
                <div className="code-header">
                  <div className="code-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                  </div>
                  <span className="code-title">App.tsx</span>
                </div>
                <div className="code-body">
                  <div className="code-line">
                    <span className="line-number">1</span>
                    <span className="code-text">const app = ...</span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">2</span>
                    <span className="code-text">return ( )</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="trusted-by-section">
        <div className="trusted-container">
          <h2 className="trusted-title">My Stack</h2>
          
          <div className="logos-scroll-wrapper">
            <div className="logos-scroll-track">
              {/* First set of logos */}
              <div className="logo-card">
                <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' alt='React' className="client-logo-color"/>
              </div>
              <div className="logo-card">
                <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' alt='Node.js' className="client-logo-color" />
              </div>
              <div className="logo-card">
                <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' alt='Python' className="client-logo-color" />
              </div>
              <div className="logo-card">
                <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' alt='Django' className="client-logo-color"/>
              </div>
              <div className="logo-card">
                <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' alt='TypeScript' className="client-logo-color" />
              </div>
              <div className="logo-card">
                <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' alt='Figma' className="client-logo-color" />
              </div>
              <div className="logo-card">
                <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' alt='Firebase' className="client-logo-color"  />
              </div>
              <div className="logo-card">
                <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg' alt='Swift' className="client-logo-color" />
              </div>
              <div className='logo-card'>
                  <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' alt='AWS' className="client-logo-color" />
                </div>
              <div className='logo-card'>
                  <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' alt='Docker' className="client-logo-color" />
                </div>
                <div className='logo-card'>
                  <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' alt='PostgreSQL' className="client-logo-color" />
                </div> 
                <div className='logo-card'>
                  <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' alt='MongoDB' className="client-logo-color" />
                </div>
                <div className='logo-card'>
                  <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' alt='MySQL' className="client-logo-color" />
                </div>
                <div className='logo-card'>
                  <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' alt='Flutter' className="client-logo-color" />
                </div>
                <div className='logo-card'>
                  <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg' alt='.NET' className="client-logo-color" />
                </div>
                <div className='logo-card'>
                  <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' alt='Express' className="client-logo-color" />
                </div>
                {/* Duplicate set for seamless loop */}
              <div className="logo-card">
                <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' alt='React' className="client-logo-color"/>
              </div>
              <div className="logo-card">
                <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' alt='Node.js' className="client-logo-color" />
              </div>
              <div className="logo-card">
                <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' alt='Python' className="client-logo-color" />
              </div>
              <div className="logo-card">
                <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' alt='Django' className="client-logo-color"/>
              </div>
              <div className="logo-card">
                <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' alt='TypeScript' className="client-logo-color" />
              </div>
              <div className="logo-card">
                <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' alt='Figma' className="client-logo-color" />
              </div>
              <div className="logo-card">
                <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' alt='Firebase' className="client-logo-color"  />
              </div>
              <div className="logo-card">
                <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg' alt='Swift' className="client-logo-color" />
              </div>
              <div className='logo-card'>
                  <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' alt='AWS' className="client-logo-color" />
                </div>
              <div className='logo-card'>
                  <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' alt='Docker' className="client-logo-color" />
                </div>
                <div className='logo-card'>
                  <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' alt='PostgreSQL' className="client-logo-color" />
                </div> 
                <div className='logo-card'>
                  <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' alt='MongoDB' className="client-logo-color" />
                </div>
                <div className='logo-card'>
                  <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' alt='MySQL' className="client-logo-color" />
                </div>
                <div className='logo-card'>
                  <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' alt='Flutter' className="client-logo-color" />
                </div>
                <div className='logo-card'>
                  <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg' alt='.NET' className="client-logo-color" />
                </div>
                <div className='logo-card'>
                  <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' alt='Express' className="client-logo-color" />
                </div> 
            </div>
          </div>
        </div>
      </section>
      <ProjectCard />
            {/* Services Section */}
      <section className="services-section">
        <div className="services-container">
          <div className="services-header">
            <h2 className="services-title">
              My <span className="title-highlight">Expertise</span>
            </h2>
            <p className="services-subtitle">
              Delivering innovative digital solutions that drive business transformation, enhance efficiency, and fuel sustainable growth
            </p>
          </div>

          <div className="services-grid">
            {/* Web Development */}
            <div className="service-card">
              <div className="service-icon-wrapper">
                <div className="service-icon">🌐</div>
                <div className="icon-glow"></div>
              </div>
              <h3 className="service-title">Web Development</h3>
              <p className="service-description">
                Custom websites and web applications built with modern technologies for optimal performance and user experience.
              </p>
              <div className="service-features">
                <span className="feature-tag">React</span>
                <span className="feature-tag">Node.js</span>
                <span className="feature-tag">Responsive</span>
              </div>
            </div>

            {/* Mobile App Development */}
            <div className="service-card">
              <div className="service-icon-wrapper">
                <div className="service-icon">📱</div>
                <div className="icon-glow"></div>
              </div>
              <h3 className="service-title">Mobile App Development</h3>
              <p className="service-description">
                Android and iOS apps with great UX, delivering seamless experiences across all mobile platforms.
              </p>
              <div className="service-features">
                <span className="feature-tag">iOS</span>
                <span className="feature-tag">Android</span>
                <span className="feature-tag">Cross-Platform</span>
              </div>
            </div>
            {/* UI/UX Design */}
            <div className="service-card">
              <div className="service-icon-wrapper">
                <div className="service-icon">🎨</div>
                <div className="icon-glow"></div>
              </div>
              <h3 className="service-title">UI/UX Design</h3>
              <p className="service-description">
                Intuitive and visually engaging interfaces that delight users and enhance brand experiences across all touchpoints.
              </p>
              <div className="service-features">
                <span className="feature-tag">Figma</span>
                <span className="feature-tag">Prototyping</span>
                <span className="feature-tag">User-Centric</span>
              </div>
            </div>

            {/* Software Development */}
            <div className="service-card">
              <div className="service-icon-wrapper">
                <div className="service-icon">⚙️</div>
                <div className="icon-glow"></div>
              </div>
              <h3 className="service-title">Software Development</h3>
              <p className="service-description">
                Tailored software solutions for businesses designed to streamline operations and boost productivity.
              </p>
              <div className="service-features">
                <span className="feature-tag">Custom</span>
                <span className="feature-tag">Enterprise</span>
                <span className="feature-tag">Efficient</span>
              </div>
            </div>
            {/* Digital Marketing Support */}
            <div className="service-card">
              <div className="service-icon-wrapper">
                <div className="service-icon">📈</div>
                <div className="icon-glow"></div>
              </div>
              <h3 className="service-title">Digital Marketing Support</h3>
              <p className="service-description">
                SEO, social media, and online campaigns that amplify your brand reach and convert visitors into customers.
              </p>
              <div className="service-features">
                <span className="feature-tag">SEO</span>
                <span className="feature-tag">Social Media</span>
                <span className="feature-tag">Growth</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  )
}
