import { Link } from "react-router-dom";
import "../styles/blog.css";

export default function BlogCard({ post }) {
  return (
    <div className="blog-card">
      <img src={post.thumbnail} alt={post.title} className="blog-thumb" />

      <div className="blog-card-content">
        <h2>{post.title}</h2>
        <p className="blog-excerpt">{post.excerpt}</p>

        <div className="blog-meta">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime} min read</span>
        </div>

        <Link to={`/blog/${post.id}`} className="blog-read-btn">
          Read More →
        </Link>
      </div>
    </div>
  );
}
