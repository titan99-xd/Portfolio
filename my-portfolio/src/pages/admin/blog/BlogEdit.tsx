import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import MarkdownToolbar from "../../../components/admin/MarkdownToolbar";
import "../../../styles/admin-blog.css";

interface Tag {
  id: number;
  name: string;
}

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  cover_image: string | null;
  created_at: string;
}

interface PostTagLink {
  id: number;
}

export default function BlogEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [post, setPost] = useState<BlogPost | null>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState<string | null>(null);

  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  // Load post + tags
  useEffect(() => {
    async function loadData() {
      try {
        const postRes = await axios.get(
          `http://localhost:5000/api/blog/${id}`
        );

        const p = postRes.data;
        setPost(p);
        setTitle(p.title);
        setSlug(p.slug);
        setContent(p.content);
        setCoverImage(p.cover_image);

        const tagRes = await axios.get("http://localhost:5000/api/tags");
        setTags(tagRes.data);

        const tagLinkRes = await axios.get(
          `http://localhost:5000/api/tags/post/${id}`
        );

        const tagIds = tagLinkRes.data.map((t: PostTagLink) => t.id);
        setSelectedTags(tagIds);
      } catch {
        alert("Failed to load blog post");
      }
    }

    loadData();
  }, [id]);

  const toggleTag = (tagId: number) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((t) => t !== tagId)
        : [...prev, tagId]
    );
  };

  const handleImageUpload = async (file: File) => {
    const form = new FormData();
    form.append("image", file);

    const res = await axios.post(
      "http://localhost:5000/api/upload",
      form,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setCoverImage(res.data.url);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/blog/${id}`,
        {
          title,
          slug,
          content,
          cover_image: coverImage,
          tags: selectedTags,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate("/admin/blog");
    } catch {
      alert("Failed to update post");
    }
  };

  if (!post) return <p>Loading…</p>;

  return (
    <div className="admin-blog-form-container">
      <h1>Edit Blog Post</h1>

      <form onSubmit={handleUpdate} className="admin-blog-form">

        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Slug</label>
        <input value={slug} disabled />

        <label>Cover Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            e.target.files && handleImageUpload(e.target.files[0])
          }
        />

        {coverImage && <img src={coverImage} className="cover-preview" />}

        <label>Content (Markdown)</label>

        <MarkdownToolbar
          value={content}
          onChange={setContent}
          textareaRef={textareaRef}
        />

        <div className="markdown-container">
          <div className="markdown-editor">
            <textarea
              ref={textareaRef}
              rows={14}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="markdown-preview">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>

        <label>Tags</label>
        <div className="tags-container">
          {tags.map((tag) => (
            <button
              key={tag.id}
              type="button"
              className={
                selectedTags.includes(tag.id)
                  ? "tag-btn selected"
                  : "tag-btn"
              }
              onClick={() => toggleTag(tag.id)}
            >
              {tag.name}
            </button>
          ))}
        </div>

        <button className="btn-primary">Update Post</button>
      </form>
    </div>
  );
}
