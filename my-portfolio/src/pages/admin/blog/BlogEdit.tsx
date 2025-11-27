import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
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

// NEW: Interface for tag IDs returned by /tags/post/:id
interface PostTagLink {
  id: number;
}

export default function BlogEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [post, setPost] = useState<BlogPost | null>(null);

  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState<string | null>(null);

  // Load blog + tags
  useEffect(() => {
    async function loadData() {
      try {
        // Fetch the blog post
        const postRes = await axios.get(`http://localhost:5000/api/blog/${id}`);
        const postData = postRes.data;

        setPost(postData);
        setTitle(postData.title);
        setSlug(postData.slug);
        setContent(postData.content);
        setCoverImage(postData.cover_image);

        // Load all tags
        const tagRes = await axios.get("http://localhost:5000/api/tags");
        setTags(tagRes.data);

        // Load selected tags for this post
        const tagLinks = await axios.get(
          `http://localhost:5000/api/tags/post/${id}`
        );

        // FIXED: Proper typing
        const tagIds = tagLinks.data.map(
          (t: PostTagLink) => t.id
        );

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
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
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
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Slug</label>
        <input value={slug} disabled />

        <label>Content</label>
        <textarea
          rows={8}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <label>Cover Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            e.target.files && handleImageUpload(e.target.files[0])
          }
        />

        {coverImage && (
          <img src={coverImage} alt="preview" className="cover-preview" />
        )}

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
