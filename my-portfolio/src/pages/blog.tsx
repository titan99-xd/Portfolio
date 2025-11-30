import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/blog-public.css";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  cover_image: string | null;
  created_at: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const API = "http://localhost:5050/api";

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get(`${API}/blog`);
        setPosts(res.data);
      } catch {
        console.error("Failed to load blog posts");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) return <p className="blog-loading">Loading blog...</p>;

  return (
    <div className="blog-public-page">

      <header className="blog-header">
        <h1>Insights & Stories</h1>
        <p>Thoughts, tutorials, and engineering notes from my journey.</p>
      </header>

      <div className="blog-grid">
        {posts.map((post) => (
          <Link to={`/blog/${post.slug}`} key={post.id} className="blog-card">
            
            <div className="blog-image-wrapper">
              {post.cover_image ? (
                <img src={post.cover_image} alt={post.title} />
              ) : (
                <div className="no-blog-image">No Image</div>
              )}
            </div>

            <div className="blog-card-content">
              <h3>{post.title}</h3>
              <p className="blog-date">
                {new Date(post.created_at).toLocaleDateString()}
              </p>
              <span className="blog-read-more">Read Article →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
