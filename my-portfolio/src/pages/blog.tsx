import Footer from '../components/layout/Footer.tsx';
import '../styles/blog.css';
// import ContactButton from '../components/ui/contact-me-btn.tsx'

export default function Blog() {
  return (
    <div className="blog-page">
      <header className="blog-header">
        <div className="blog-header-container">
          <h1 className="blog-title">Blog</h1>
        </div>
      </header>

      <main className="blog-content">
        <section className="blog-section">
          <h2 className="blog-section-title">Welcome to the Blog</h2>
          <p className="blog-section-text">
            Stay tuned for updates, articles, and insights on the latest in technology and innovation.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  )
}