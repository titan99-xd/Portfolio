import BlogCard from "../components/BlogCard";
import Footer from "../components/layout/Footer";
import TagBadge from "../components/TagBadge";
import "../styles/blog.css";

export default function Blog() {
  const samplePosts = [
    {
      id: 1,
      title: "How I Built My Portfolio with React + Vite",
      excerpt: "A breakdown of tools, components, and deployment steps...",
      thumbnail: "https://picsum.photos/seed/1/600/400",
      date: "Nov 24, 2025",
      readTime: 5,
      tags: ["react", "frontend"],
    },
    {
      id: 2,
      title: "Why Every Developer Needs a Portfolio",
      excerpt: "If you're job hunting or freelancing, a portfolio is essential...",
      thumbnail: "https://picsum.photos/seed/2/600/400",
      date: "Nov 20, 2025",
      readTime: 4,
      tags: ["career", "tips"],
    },
  ];

  return (
    <>
      <section className="page-section blog-page">
        <h1 className="highlight blog-title">My Blog</h1>

        <div className="tag-list">
          <TagBadge label="react" />
          <TagBadge label="design" />
          <TagBadge label="portfolio" />
          <TagBadge label="career" />
        </div>

        <div className="blog-grid">
          {samplePosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
