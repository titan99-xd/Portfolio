import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/blog-post.css";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  cover_image: string | null;
  created_at: string;
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/blog/${slug}`
        );
        setPost(res.data);
      } catch {
        console.error("Post not found");
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  if (loading) return <p className="blog-loading">Loading...</p>;
  if (!post) return <p className="blog-error">Post not found.</p>;

  return (
    <article className="blog-post-container">
      {post.cover_image && (
        <img src={post.cover_image} alt={post.title} className="blog-post-cover" />
      )}

      <h1 className="blog-post-title">{post.title}</h1>
      <p className="blog-post-date">
        {new Date(post.created_at).toLocaleDateString()}
      </p>

      <div className="blog-post-content">
        {post.content.split("\n").map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </article>
  );
}
