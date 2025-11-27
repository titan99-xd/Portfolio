import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../styles/admin-blog.css";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  cover_image: string | null;
  created_at: string;
}

export default function BlogAdminList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await axios.get("http://localhost:5000/api/blog");
        setPosts(res.data);
      } catch {
        console.error("Failed to load blog posts");
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-blog-container">
      <div className="admin-blog-header">
        <h1>Blog Posts</h1>
        <Link className="btn-primary" to="/admin/blog/new">+ New Post</Link>
      </div>

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
          {posts.map(post => (
            <tr key={post.id}>
              <td>
                {post.cover_image ? (
                  <img src={post.cover_image} alt={post.title} className="blog-thumb"/>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
