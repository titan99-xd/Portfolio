import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import MarkdownToolbar from "../../../components/admin/MarkdownToolbar";
import "../../../styles/admin/blog/blog-create.css";
import AdminLayout from "../../../components/admin/AdminLayout";

/* ----------------------------------------------
   Types
---------------------------------------------- */
interface Tag {
  id: number;
  name: string;
}

export default function BlogCreate() {
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState<string | null>(null);

  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]); // names

  const token = localStorage.getItem("token");

  /* ----------------------------------------------
     Auto-generate slug from title
  ---------------------------------------------- */
  useEffect(() => {
    const generated = title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    setSlug(generated);
  }, [title]);

  /* ----------------------------------------------
     Load all tag options
  ---------------------------------------------- */
  useEffect(() => {
    async function loadTags() {
      try {
        const res = await axios.get("http://localhost:5050/api/tags");
        setTags(res.data);
      } catch (error) {
        console.error("Failed to load tags", error);
      }
    }

    loadTags();
  }, []);

  /* ----------------------------------------------
     Toggle tag selection (names)
  ---------------------------------------------- */
  const toggleTag = (name: string) => {
    setSelectedTags((prev) =>
      prev.includes(name)
        ? prev.filter((t) => t !== name)
        : [...prev, name]
    );
  };

  /* ----------------------------------------------
     Upload cover image
  ---------------------------------------------- */
  const handleImageUpload = async (file: File) => {
    if (!token) return alert("Not authenticated");

    const form = new FormData();
    form.append("image", file);

    try {
      const res = await axios.post("http://localhost:5050/api/upload", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCoverImage(res.data.url);
    } catch (error) {
      console.error(error);
      alert("Failed to upload image");
    }
  };

  /* ----------------------------------------------
     Submit blog post
  ---------------------------------------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) return alert("You are not logged in");

    try {
      await axios.post(
        "http://localhost:5050/api/blog",
        {
          title,
          slug,
          content,
          cover_image: coverImage,
          tags: selectedTags, // sending names only
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // required
          },
        }
      );

      navigate("/admin/blog");
    } catch (error) {
      console.error(error);
      alert("Failed to create post");
    }
  };

  /* ----------------------------------------------
     Render
  ---------------------------------------------- */
  return (
    <AdminLayout title="" >
      <div className="admin-blog-form-container">
      <h1>Create Blog Post</h1>

      <form onSubmit={handleSubmit} className="admin-blog-form">
        
        {/* Title */}
        <label>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Slug */}
        <label>Slug</label>
        <input value={slug} disabled />

        {/* Cover Image */}
        <label>Cover Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            e.target.files?.[0] && handleImageUpload(e.target.files[0])
          }
        />

        {coverImage && (
          <img src={coverImage} className="cover-preview" alt="Preview" />
        )}

        {/* Content */}
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

        {/* Tags */}
        <label>Tags</label>
        <div className="tags-container">
          {tags.map((tag) => (
            <button
              key={tag.id}
              type="button"
              className={
                selectedTags.includes(tag.name)
                  ? "tag-btn selected"
                  : "tag-btn"
              }
              onClick={() => toggleTag(tag.name)}
            >
              {tag.name}
            </button>
          ))}
        </div>

        {/* Submit */}
        <button className="btn-primary">Create Post</button>
      </form>
    </div>
    </AdminLayout>
  );
}