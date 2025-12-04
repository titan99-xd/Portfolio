import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
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

interface Tag {
  id: number;
  name: string;
}

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);

  // URL query params
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTag = searchParams.get("tag") || "";
  const pageFromUrl = Number(searchParams.get("page")) || 1;

  // Pagination
  const [page, setPage] = useState(pageFromUrl);
  const [totalPages, setTotalPages] = useState(1);

  const API = "http://localhost:5050/api";

  /* ======================================================
     Load Posts (pagination + tag)
  ====================================================== */
  useEffect(() => {
    async function loadPosts() {
      setLoading(true);

      try {
        const url = `${API}/blog?page=${page}&limit=6${
          selectedTag ? `&tag=${selectedTag}` : ""
        }`;

        const res = await axios.get(url);

        setPosts(res.data.posts);
        setTotalPages(res.data.totalPages);
      } catch  {
        console.error("Failed to load blog posts");
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, [page, selectedTag]);

  /* ======================================================
     Load All Tags
  ====================================================== */
  useEffect(() => {
    async function fetchTags() {
      try {
        const res = await axios.get(`${API}/tags`);
        setTags(res.data);
      } catch  {
        console.error("Failed to load tags");
      }
    }

    fetchTags();
  }, []);

  /* ======================================================
     Handle Tag Click
  ====================================================== */
  const handleTagClick = (tag: string) => {
    if (tag === selectedTag) {
      // Unselect tag
      setSearchParams({});
    } else {
      setSearchParams({ tag });
    }

    setPage(1); // Reset to page 1 when tag changes
  };

  /* ======================================================
     Handle Pagination
  ====================================================== */
  const goToPage = (p: number) => {
    setPage(p);

    if (selectedTag) {
      setSearchParams({ tag: selectedTag, page: String(p) });
    } else {
      setSearchParams({ page: String(p) });
    }
  };

  /* ======================================================
     Loading State
  ====================================================== */
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

      {/* ===================== TAG FILTER BAR ===================== */}
      <div className="tag-filter-bar">
        <button
          className={`tag-btn ${selectedTag === "" ? "active" : ""}`}
          onClick={() => handleTagClick("")}
        >
          All
        </button>

        {tags.map((t) => (
          <button
            key={t.id}
            className={`tag-btn ${selectedTag === t.name ? "active" : ""}`}
            onClick={() => handleTagClick(t.name)}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* ===================== BLOG CARDS ===================== */}
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

      {/* ===================== PAGINATION ===================== */}
      <div className="pagination">
        <button
          className="page-btn"
          onClick={() => goToPage(Math.max(1, page - 1))}
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
              onClick={() => goToPage(n)}
            >
              {n}
            </button>
          );
        })}

        <button
          className="page-btn"
          onClick={() => goToPage(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
        >
          Next →
        </button>
      </div>
    </div>
  );
}