import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

  // auto-generate slug
  useEffect(() => {
    const generated = title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    setSlug(generated);
  }, [title]);

  // load tags from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/tags").then((res) => {
      setTags(res.data);
    });
  }, []);

  // handle tag selection
  const toggleTag = (id: number) => {
    setSelectedTags((prev) =>
      prev.includes(id)
        ? prev.filter((tagId) => tagId !== id)
        : [...prev, id]
    );
  };

  // upload image
  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await axios.post(
      "http://localhost:5000/api/upload",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setCoverImage(res.data.url);
  };

  // save blog post
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
          author_id: 1, // you only have 1 admin
          tags: selectedTags,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/admin/blog");
    } catch {
      alert("Failed to create blog post");
    }
  };

  return (
    <div className="admin-blog-form-container">
      <h1>Create Blog Post</h1>

      <form onSubmit={handleSubmit} className="admin-blog-form">

        {/* TITLE */}
        <label>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* SLUG */}
        <label>Slug</label>
        <input value={slug} disabled />

        {/* CONTENT */}
        <label>Content</label>
        <textarea
          rows={8}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        {/* IMAGE UPLOADER */}
        <label>Cover Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files && handleImageUpload(e.target.files[0])}
        />

        {coverImage && (
          <img
            src={coverImage}
            alt="preview"
            className="cover-preview"
          />
        )}

        {/* TAGS */}
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

        <button className="btn-primary">Create Post</button>
      </form>
    </div>
  );
}
