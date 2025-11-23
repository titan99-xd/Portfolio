import ContactForm from "../components/ContactForm";
import Footer from "../components/layout/Footer";

export default function Contact() {
  return (
    <>
      <section className="page-section contact-page">
        <header className="contact-header">
          {/* <h1 className="highlight">Contact Me</h1> */}
        </header>

        <div className="contact-grid">
          <div className="contact-left">
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
