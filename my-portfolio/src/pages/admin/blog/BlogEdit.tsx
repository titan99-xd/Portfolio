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

export default function BlogEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState<string | null>(null);

  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]); // using tag names

  const [loading, setLoading] = useState(true);

  /* ============================================
       LOAD POST + TAGS
  ============================================ */
  useEffect(() => {
    async function load() {
      try {
        // Load blog post
        const postRes = await axios.get(`http://localhost:5050/api/blog/${id}`);
        const post = postRes.data;

        setTitle(post.title);
        setContent(post.content);
        setCoverImage(post.cover_image);

        // Load all available tags
        const tagsRes = await axios.get("http://localhost:5050/api/tags");
        setTags(tagsRes.data);

        // Load this post’s tags
        const postTagsRes = await axios.get(
          `http://localhost:5050/api/tags/post/${id}`
        );

        // Convert to tag names
        setSelectedTags(postTagsRes.data.map((t: Tag) => t.name));
      } catch (err) {
        console.error(err);
        alert("Failed to load post data");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  /* ============================================
       TOGGLE TAG
  ============================================ */
  const toggleTag = (name: string) => {
    setSelectedTags((prev) =>
      prev.includes(name)
        ? prev.filter((t) => t !== name)
        : [...prev, name]
    );
  };

  /* ============================================
       HANDLE IMAGE UPLOAD
  ============================================ */
  const handleImageUpload = async (file: File) => {
    const form = new FormData();
    form.append("image", file);

    const res = await axios.post("http://localhost:5050/api/upload", form, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setCoverImage(res.data.url);
  };

  /* ============================================
       SAVE CHANGES
  ============================================ */
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5050/api/blog/${id}`,
        {
          title,
          content,
          cover_image: coverImage,
          tags: selectedTags, // send tag NAMES
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate("/admin/blog");
    } catch (err) {
      console.error(err);
      alert("Failed to update blog post");
    }
  };

  if (loading) return <p>Loading…</p>;

  return (
    <div className="admin-blog-form-container">
      <h1>Edit Blog Post</h1>

      <form onSubmit={handleUpdate} className="admin-blog-form">
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />

        {/* Cover Image */}
        <label>Cover Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            e.target.files && handleImageUpload(e.target.files[0])
          }
        />

        {coverImage && <img src={coverImage} className="cover-preview" />}

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

        <button className="btn-primary">Update Post</button>
      </form>
    </div>
  );
}