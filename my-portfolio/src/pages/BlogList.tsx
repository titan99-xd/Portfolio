import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/blog-list.css";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  cover_image: string | null;
  created_at: string;
  content: string;
}

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await axios.get("http://localhost:5050/api/blog");
        setPosts(res.data);
      } catch {
        console.error("Failed to load posts");
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (loading) return <p className="blog-loading">Loading posts…</p>;

  return (
    <div className="blog-list-page">
      {/* Header */}
      <header className="blog-header">
        <h1 className="blog-title">Blog</h1>
        <p className="blog-subtitle">
          Articles, tutorials, dev logs & insights from my journey in tech.
        </p>
      </header>

      {/* Blog Grid */}
      <div className="blog-grid">
        {posts.map((post) => (
          <Link key={post.id} to={`/blog/${post.slug}`} className="blog-card">
            
            {/* Cover Image */}
            {post.cover_image ? (
              <img
                src={post.cover_image}
                alt={post.title}
                className="blog-card-image"
              />
            ) : (
              <div className="blog-card-placeholder">No image</div>
            )}

            {/* Content */}
            <div className="blog-card-content">
              <h2 className="blog-card-title">{post.title}</h2>

              <p className="blog-date">
                {new Date(post.created_at).toLocaleDateString()}
              </p>

              <p className="blog-card-excerpt">
                {post.content.replace(/[#_*`>]/g, "").slice(0, 150)}…
              </p>

              <span className="blog-read-more">Read More →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
