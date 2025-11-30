import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import MarkdownToolbar from "../../../components/admin/MarkdownToolbar";
import "../../../styles/admin-blog.css";

interface Tag {
  id: number;
  name: string;
}

export default function BlogCreate() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState<string | null>(null);

  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const token = localStorage.getItem("token");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-generate slug
  useEffect(() => {
    const generated = title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    setSlug(generated);
  }, [title]);

  // Load tags
  useEffect(() => {
    axios.get("http://localhost:5000/api/tags").then((res) => {
      setTags(res.data);
    });
  }, []);

  const toggleTag = (id: number) => {
    setSelectedTags((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleImageUpload = async (file: File) => {
    const form = new FormData();
    form.append("image", file);

    const res = await axios.post("http://localhost:5000/api/upload", form, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setCoverImage(res.data.url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/blog",
        {
          title,
          slug,
          content,
          cover_image: coverImage,
          author_id: 1,
          tags: selectedTags,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate("/admin/blog");
    } catch {
      alert("Failed to create post");
    }
  };

  return (
    <div className="admin-blog-form-container">
      <h1>Create Blog Post</h1>

      <form onSubmit={handleSubmit} className="admin-blog-form">

        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Slug</label>
        <input value={slug} disabled />

        <label>Cover Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files && handleImageUpload(e.target.files[0])}
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
              placeholder="Write your blog content in Markdown…"
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
                selectedTags.includes(tag.id) ? "tag-btn selected" : "tag-btn"
              }
              onClick={() => toggleTag(tag.id)}
            >
              {tag.name}
            </button>
          ))}
        </div>

        <button className="btn-primary">Create Post</button>
      </form>
    </div>
  );
}
