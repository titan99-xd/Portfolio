import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import ConfirmModal from "../../../components/admin/ConfirmModal";
import "../../../styles/admin-blog.css";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  cover_image: string | null;
  created_at: string;
}

interface Tag {
  id: number;
  name: string;
}

export default function BlogAdminList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);

  // Search + filter
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");

  // Delete modal
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const token = localStorage.getItem("token");

  /* ===============================
     Load posts (paginated)
  =============================== */
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const res = await axios.get(
          `http://localhost:5050/api/blog?page=${page}&limit=6`
        );

        setPosts(res.data.posts);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error("Failed to load posts:", err);
      } finally {
        setLoading(false);
      }

      // Load tags (only first time)
      try {
        const tagRes = await axios.get("http://localhost:5050/api/tags");
        setTags(tagRes.data);
      } catch (err) {
        console.error("Failed to load tags:", err);
      }
    }

    load();
  }, [page]);

  /* ===============================
     Delete Modal Logic
  =============================== */
  const openDeleteModal = (id: number) => {
    setDeleteId(id);
    setModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteId(null);
    setModalOpen(false);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      await axios.delete(`http://localhost:5050/api/blog/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove instantly without refresh
      setPosts((prev) => prev.filter((p) => p.id !== deleteId));

      closeDeleteModal();
    } catch (err) {
      console.error("Delete failed", err);
      closeDeleteModal();
    }
  };

  /* ===============================
     Filter posts (client-side)
  =============================== */
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase());

    if (selectedTag === "all") return matchesSearch;

    return matchesSearch && post.slug.includes(selectedTag.toLowerCase());
  });

  /* ===============================
     Render
  =============================== */
  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-blog-container">
      <div className="admin-blog-header">
        <h1>Blog Posts</h1>
        <Link className="btn-primary" to="/admin/blog/new">
          + New Post
        </Link>
      </div>

      {/* Search Bar */}
      <input
        className="admin-search-input"
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Tags Filter */}
      <div className="tag-filter-row">
        <button
          className={selectedTag === "all" ? "tag-btn selected" : "tag-btn"}
          onClick={() => setSelectedTag("all")}
        >
          All
        </button>

        {tags.map((tag) => (
          <button
            key={tag.id}
            className={selectedTag === tag.name ? "tag-btn selected" : "tag-btn"}
            onClick={() => setSelectedTag(tag.name)}
          >
            {tag.name}
          </button>
        ))}
      </div>

      {/* Table */}
      <table className="admin-blog-table">
        <thead>
          <tr>
            <th>Cover</th>
            <th>Title</th>
            <th>Slug</th>
            <th>Created</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {filteredPosts.map((post) => (
            <tr key={post.id}>
              <td>
                {post.cover_image ? (
                  <img src={post.cover_image} alt={post.title} className="blog-thumb" />
                ) : (
                  <span className="no-image">No Image</span>
                )}
              </td>

              <td>{post.title}</td>
              <td>{post.slug}</td>
              <td>{new Date(post.created_at).toLocaleDateString()}</td>

              <td>
                <Link className="btn-small" to={`/admin/blog/${post.id}/edit`}>
                  Edit
                </Link>

                <button
                  className="btn-small delete-btn"
                  onClick={() => openDeleteModal(post.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination-row">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>

        <span>
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={modalOpen}
        title="Delete Blog Post?"
        message="This action cannot be undone. Are you sure?"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={confirmDelete}
        onCancel={closeDeleteModal}
      />
    </div>
  );
}