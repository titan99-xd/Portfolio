import { Link } from 'react-router-dom'
import './footer.css'
import linkedIn from '../assets/LI-In-Bug.png';
import facebook from '../assets/Facebook_Logo_Primary.png';
import instagram from '../assets/Instagram_Glyph_Gradient.png';

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Footer Main Content */}
        <div className="footer-main">
          {/* Company Info */}
          <div className="footer-column footer-about">
            <div className="footer-logo">
              <span className="footer-logo-text">Trinova Technology</span>
            </div>
            <p className="footer-description">
              Finland-led. Nepal-backed. Empowering businesses with cutting-edge technology to turn digital visions into reality.
              <br />In Partner with <a href="https://uranus-tech.com/"> Uranus Tech Nepal Pvt</a>. Ltd <br />(ISO 27001:2022 Certified Company).
            </p>
            <div className="footer-social">
              <a href="https://www.facebook.com/profile.php?id=61582664181309" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                <img src={facebook} alt='facebook' />
              </a>
              
              <a href="https://www.linkedin.com/company/trinova3/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                <img src={linkedIn} alt='LinkedIn' />
              </a>
              <a href="https://www.instagram.com/trinovatech.oy/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                <img src={instagram} alt='Instagram' />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/portfolio" className="footer-link">Portfolio</Link></li>
              <li><Link to="/careers" className="footer-link">Careers</Link></li>
              
            </ul>
          </div>

          {/* Services */}
          <div className="footer-column">
            <h3 className="footer-heading">Services</h3>
            <ul className="footer-links">
              <li><a href="#services" className="footer-link">Web Development</a></li>
              <li><a href="#services" className="footer-link">Mobile Apps</a></li>
              <li><a href="#services" className="footer-link">Cloud Solutions</a></li>
              <li><a href="#services" className="footer-link">UI/UX Design</a></li>
              <li><a href="#services" className="footer-link">IT Consulting</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-column">
            <h3 className="footer-heading">Contact Us</h3>
            <ul className="footer-contact">
              <li className="contact-item">
                <span className="contact-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </span>
                <a href="mailto:info@trinovatech.fi" className="contact-link">
                  info@trinovatech.fi
                </a>
              </li>
              <li className="contact-item">
                <span className="contact-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                </span>
                <a href="tel:+358407017910" className="contact-link">
                  +358 40 701 7910
                </a>
              </li>
              <li className="contact-item">
                <span className="contact-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </span>
                <div className="contact-link">
                   Helsinki Finland
                </div>
              </li>
            </ul>
            <div className="company-info-text">
              {/* <div className="company-name">Trinova Technology Oy</div> */}
              <div className="company-id">Y-tunnus: 3567279-8</div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © {currentYear} Trinova Technology Oy. All rights reserved.
            </p>
            <div className="footer-legal">
              <Link to="/privacy-policy" className="legal-link">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
