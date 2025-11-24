import { useParams } from "react-router-dom";
import Footer from "../components/layout/Footer";
import "../styles/blog.css";

export default function BlogPost() {
  const { id } = useParams();

  // This will be replaced with backend data later
  const post = {
    title: "How I Built My Portfolio with React + Vite",
    content: `
      Building a portfolio is an essential step for every developer...
    `,
    date: "Nov 24, 2025",
    readTime: 5,
  };

  return (
    <>
      <section className="page-section blog-post">
        <h1 className="blog-post-title">{post.title}</h1>

        <div className="blog-post-meta">
          <span>{post.date}</span> • <span>{post.readTime} min read</span>
        </div>

        <article className="blog-post-content">
          <p>{post.content}</p>
        </article>

        <div className="comment-section">
          <h3>Leave a Comment</h3>
          <form className="comment-form">
            <input type="text" placeholder="Your Name" required />
            <textarea placeholder="Your Comment..." required></textarea>
            <button type="submit">Submit Comment</button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}
