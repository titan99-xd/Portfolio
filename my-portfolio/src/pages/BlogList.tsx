// src/pages/BlogList.tsx

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

  // Pagination state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const API = "http://localhost:5050/api/blog";

  useEffect(() => {
    async function loadPage() {
      setLoading(true);
      try {
        const res = await axios.get(`${API}?page=${page}&limit=6`);
        setPosts(res.data.posts);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.warn("Failed to load blog posts", err);
      } finally {
        setLoading(false);
      }
    }

    loadPage();
  }, [page]);

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
            
            {post.cover_image ? (
              <img
                src={post.cover_image}
                alt={post.title}
                className="blog-card-image"
              />
            ) : (
              <div className="blog-card-placeholder">No image</div>
            )}

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

      {/* Pagination */}
      <div className="pagination">
        <button
          className="page-btn"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          ← Prev
        </button>

        {[...Array(totalPages)].map((_, i) => {
          const n = i + 1;
          return (
            <button
              key={n}
              className={`page-number ${page === n ? "active" : ""}`}
              onClick={() => setPage(n)}
            >
              {n}
            </button>
          );
        })}

        <button
          className="page-btn"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next →
        </button>
      </div>
    </div>
  );
}