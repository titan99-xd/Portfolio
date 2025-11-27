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
        const res = await axios.get("http://localhost:5000/api/blog");
        setPosts(res.data);
      } catch {
        console.error("Failed to load posts");
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (loading) return <p className="blog-loading">Loading...</p>;

  return (
    <section className="blog-list-section">
      <h1 className="blog-title">Blog</h1>

      <div className="blog-grid">
        {posts.map((post) => (
          <Link key={post.id} to={`/blog/${post.slug}`} className="blog-card">
            {post.cover_image && (
              <img
                src={post.cover_image}
                alt={post.title}
                className="blog-card-image"
              />
            )}

            <div className="blog-card-content">
              <h2>{post.title}</h2>
              <p className="blog-date">
                {new Date(post.created_at).toLocaleDateString()}
              </p>

              <p className="blog-card-excerpt">
                {post.content.slice(0, 120)}...
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
