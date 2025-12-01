import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";

import "highlight.js/styles/github.css";
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

  const API = "http://localhost:5050/api";

  const [post, setPost] = useState<BlogPost | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);

  /* --------------------------------------------------------
     Load post + tags
  -------------------------------------------------------- */
  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`${API}/blog/${slug}`);
        const post = res.data;
        setPost(post);

        // load tags for this post
        if (post.id) {
          const tagRes = await axios.get(`${API}/tags/post/${post.id}`);
          setTags(tagRes.data);
        }
      } catch (err) {
        console.error("Failed to load blog post:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [slug]);

  if (loading) return <p className="blog-loading">Loading article...</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div className="blog-post-page">

      {/* HEADER */}
      <header className="blog-post-header">
        <h1>{post.title}</h1>

        <p className="blog-post-date">
          {new Date(post.created_at).toLocaleDateString()}
        </p>

        {/* TAGS */}
        {tags.length > 0 && (
          <div className="blog-tag-list">
            {tags.map((tag) => (
              <span key={tag.id} className="blog-tag">
                {tag.name}
              </span>
            ))}
          </div>
        )}

        {/* COVER IMAGE */}
        {post.cover_image && (
          <img
            className="blog-cover"
            src={post.cover_image}
            alt={post.title}
          />
        )}
      </header>

      {/* MARKDOWN CONTENT */}
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