// src/pages/admin/AdminDashboard.tsx
import { Link } from "react-router-dom";
import "../../styles/admin-dashboard.css";

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <header className="admin-dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back! Manage your portfolio content from here.</p>
      </header>

      <section className="admin-dashboard-grid">
        <Link to="/admin/projects" className="admin-card">
          <h2>Projects</h2>
          <p>Create, edit and manage portfolio projects and images.</p>
          <span className="admin-card-link">Go to Projects →</span>
        </Link>

        <Link to="/admin/blog" className="admin-card">
          <h2>Blog</h2>
          <p>Publish articles, edit posts and manage tags.</p>
          <span className="admin-card-link">Go to Blog →</span>
        </Link>

        <a
          href="/"
          className="admin-card admin-card-secondary"
          target="_blank"
          rel="noreferrer"
        >
          <h2>View Public Site</h2>
          <p>Open the public portfolio in a new tab.</p>
          <span className="admin-card-link">Open site ↗</span>
        </a>
      </section>
    </div>
  );
}