import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";

import "highlight.js/styles/github.css"; // GitHub-style code blocks
import "../styles/blog-public.css";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  cover_image: string | null;
  content: string;
  created_at: string;
}

interface Tag {
  id: number;
  name: string;
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();

  const [post, setPost] = useState<BlogPost | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);

  const API = "http://localhost:5050/api";

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch blog post
        const res = await axios.get(`${API}/blog/${slug}`);
        setPost(res.data);

        // Fetch tags linked to this post
        if (res.data.id) {
          const tagRes = await axios.get(`${API}/tags/post/${res.data.id}`);
          setTags(tagRes.data);
        }

      } catch (err) {
        console.error("Failed to load post", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  if (loading) return <p className="blog-loading">Loading article...</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div className="blog-post-page">
      <header className="blog-post-header">
        <h1>{post.title}</h1>

        <p className="blog-post-date">
          {new Date(post.created_at).toLocaleDateString()}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="blog-tag-list">
            {tags.map((t) => (
              <span key={t.id} className="blog-tag">
                {t.name}
              </span>
            ))}
          </div>
        )}

        {/* Cover Image */}
        {post.cover_image && (
          <img
            className="blog-cover"
            src={post.cover_image}
            alt={post.title}
          />
        )}
      </header>

      {/* MARKDOWN RENDERER */}
      <article className="blog-post-content">
        <ReactMarkdown
          children={post.content}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeHighlight]}
        />
      </article>
    </div>
  );
}
