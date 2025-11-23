import Footer from '../components/layout/Footer';
import '../styles/PrivacyPolicy.css';

export default function PrivacyPolicy() {
  return (
    <div className='privacy-page'>
      <section className='privacy-hero'>
        <div className='privacy-hero-background'>
          <div className='gradient-orb orb-1'></div>
          <div className='gradient-orb orb-2'></div>
          <div className='grid-pattern'></div>
        </div>
        
        <div className='privacy-hero-container'>
          <h1 className='privacy-hero-title'>
            Privacy <span className='gradient-text'>Policy</span>
          </h1>
          <p className='privacy-last-updated'>Last updated: November 2025</p>
        </div>
      </section>

      <section className='privacy-content'>
        <div className='privacy-container'>
          <div className='privacy-intro'>
            <p>
              Trinova Technology Oy ("we", "our", "us") values your privacy. 
              This Privacy Policy explains how we collect, use, and protect personal information when you visit our website{' '}
              <a href="https://trinovatech.fi" target="_blank" rel="noopener noreferrer">https://trinovatech.fi</a>{' '}
              or contact us through it.
            </p>
          </div>

          <div className='privacy-section'>
            <h2>1. Who We Are</h2>
            <ul className='info-list'>
              <li><strong>Company name:</strong> Trinova Technology Oy</li>
              <li><strong>Business ID (Y-tunnus):</strong> 3567279-8</li>
              <li><strong>Registered office:</strong> Helsinki, Finland</li>
              <li><strong>Email:</strong> <a href="mailto:info@trinovatech.fi">info@trinovatech.fi</a></li>
            </ul>
            <p>We are a Finland-registered software company offering IT and digital development services.</p>
          </div>

          <div className='privacy-section'>
            <h2>2. Information We Collect</h2>
            <p>We may collect and process the following personal data:</p>
            <ul>
              <li>Contact information (name, email, phone, company, message) submitted via contact forms.</li>
              <li>Technical data such as IP address, browser type, operating system, referring URLs, and pages visited.</li>
              <li>Cookies and analytics data used to improve site performance and understand user behaviour.</li>
            </ul>
            <p>We do not intentionally collect sensitive personal data.</p>
          </div>

          <div className='privacy-section'>
            <h2>3. How We Use Your Information</h2>
            <p>We process personal data only for legitimate business purposes, including:</p>
            <ul>
              <li>Responding to inquiries or service requests.</li>
              <li>Communicating about our services or partnerships.</li>
              <li>Maintaining and improving our website performance and security.</li>
              <li>Analysing website usage through tools such as Google Analytics.</li>
            </ul>
          </div>

          <div className='privacy-section'>
            <h2>4. Legal Basis for Processing (GDPR)</h2>
            <p>Our processing is based on one or more of the following:</p>
            <ul>
              <li><strong>Consent:</strong> When you voluntarily submit a contact form.</li>
              <li><strong>Legitimate Interest:</strong> To operate and secure our website and respond to inquiries.</li>
              <li><strong>Legal Obligation:</strong> To comply with Finnish or EU laws if required.</li>
            </ul>
          </div>

          <div className='privacy-section'>
            <h2>5. Data Retention</h2>
            <p>
              We retain personal data only for as long as necessary to fulfil the purposes outlined above or to comply with legal obligations. 
              Contact form data is typically kept for up to 12 months unless ongoing communication requires longer retention.
            </p>
          </div>

          <div className='privacy-section'>
            <h2>6. Data Sharing</h2>
            <p>We do not sell or rent your personal information. We may share data only with:</p>
            <ul>
              <li>Trusted service providers (e.g., hosting, analytics, or email systems) under strict confidentiality.</li>
              <li>Authorities, when legally required.</li>
            </ul>
            <p>All partners are GDPR-compliant.</p>
          </div>

          <div className='privacy-section'>
            <h2>7. Cookies</h2>
            <p>
              Our website may use cookies to enhance user experience and collect anonymous usage statistics. 
              You can adjust your browser settings to refuse cookies or delete them at any time.
            </p>
          </div>

          <div className='privacy-section'>
            <h2>8. Data Security</h2>
            <p>
              We take appropriate technical and organizational measures to protect your data against loss, misuse, 
              unauthorized access, or disclosure.
            </p>
          </div>

          <div className='privacy-section'>
            <h2>9. Your Rights</h2>
            <p>Under the EU GDPR, you have the following rights:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of your personal data.</li>
              <li><strong>Rectification:</strong> Correct inaccurate or incomplete data.</li>
              <li><strong>Erasure ("Right to be Forgotten"):</strong> Ask us to delete your personal data.</li>
              <li><strong>Restriction of Processing and Data Portability.</strong></li>
              <li><strong>Withdraw Consent</strong> at any time.</li>
            </ul>
            <p>
              To exercise these rights, contact us at{' '}
              <a href="mailto:info@trinovatech.fi">info@trinovatech.fi</a>.
            </p>
          </div>

          <div className='privacy-section'>
            <h2>10. International Data Transfers</h2>
            <p>
              If any processing involves systems outside the EU/EEA (for example, our Nepal-based development team), 
              we ensure that adequate data-protection safeguards (such as EU-approved Standard Contractual Clauses) are in place.
            </p>
          </div>

          <div className='privacy-section'>
            <h2>11. Updates to This Policy</h2>
            <p>
              We may update this Privacy Policy occasionally. The latest version will always be available on this page 
              with an updated date.
            </p>
          </div>

          <div className='privacy-section'>
            <h2>12. Contact</h2>
            <p>If you have any questions or requests regarding this Privacy Policy, please contact:</p>
            <div className='contact-box'>
              <p><strong>Trinova Technology Oy</strong></p>
              <p>Email: <a href="mailto:info@trinovatech.fi">info@trinovatech.fi</a></p>
              <p>Address: Arentikuja 1 D 291 C, Helsinki, Finland</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
