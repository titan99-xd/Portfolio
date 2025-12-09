import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import MarkdownToolbar from "../../../components/admin/MarkdownToolbar";
import "../../../styles/admin/blog/blog-edit.css";
import AdminLayout from "../../../components/admin/AdminLayout";

/* ----------------------------------------------
   Types
---------------------------------------------- */
interface Tag {
  id: number;
  name: string;
}

export default function BlogEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState<string | null>(null);

  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]); // tag names

  const [loading, setLoading] = useState(true);

  /* ----------------------------------------------
     Load Post + All Tags + Selected Tags
  ---------------------------------------------- */
  useEffect(() => {
    async function loadData() {
      try {
        // Fetch post data
        const postRes = await axios.get(`http://localhost:5050/api/blog/${id}`);
        const post = postRes.data;

        setTitle(post.title);
        setSlug(post.slug);
        setContent(post.content);
        setCoverImage(post.cover_image);

        // Fetch all available tags
        const tagsRes = await axios.get("http://localhost:5050/api/tags");
        setTags(tagsRes.data);

        // Fetch selected tags for this post
        const selectedRes = await axios.get(
          `http://localhost:5050/api/tags/post/${id}`
        );

        setSelectedTags(selectedRes.data.map((t: Tag) => t.name));
      } catch (err) {
        console.error(err);
        alert("Failed to load blog post");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  /* ----------------------------------------------
     Toggle tag (name-based)
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
        headers: { Authorization: `Bearer ${token}` },
      });

      setCoverImage(res.data.url);
    } catch (err) {
      console.error(err);
      alert("Failed to upload image");
    }
  };

  /* ----------------------------------------------
     Save updated post
  ---------------------------------------------- */
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) return alert("Not authenticated");

    try {
      await axios.put(
        `http://localhost:5050/api/blog/${id}`,
        {
          title,
          slug,        // slug stays same unless editable
          content,
          cover_image: coverImage,
          tags: selectedTags, // names only
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate("/admin/blog");
    } catch (err) {
      console.error(err);
      alert("Failed to update post");
    }
  };

  /* ----------------------------------------------
     UI
  ---------------------------------------------- */
  if (loading) return <p>Loading…</p>;

  return (
    <AdminLayout title ="">
    <div className="admin-blog-form-container">
      <h1>Edit Blog Post</h1>

      <form onSubmit={handleUpdate} className="admin-blog-form">

        {/* Title */}
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />

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

        {/* Markdown Editor */}
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

        <button className="btn-primary">Save Changes</button>
      </form>
    </div>
    </AdminLayout>
  );
}