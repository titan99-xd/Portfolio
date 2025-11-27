import { Link } from "react-router-dom";
import "../styles/admin-dashboard.css";

export default function AdminDashboard() {
  return (
    <div className="admin-layout">

      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2 className="admin-logo">Dashboard</h2>

        <nav className="admin-nav">
          <Link to="/admin" className="admin-nav-item">
            Overview
          </Link>
          <Link to="/admin/projects" className="admin-nav-item">
            Manage Projects
          </Link>
          <Link to="/admin/posts" className="admin-nav-item">
            Manage Blog Posts
          </Link>
          <Link to="/admin/tags" className="admin-nav-item">
            Tags
          </Link>
          <Link to="/admin/messages" className="admin-nav-item">
            Messages
          </Link>
        </nav>

        <button
          className="admin-logout-btn"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/admin/login";
          }}
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="admin-content">
        <div className="admin-topbar">
          <h1>Welcome, Admin 👋</h1>
        </div>

        <div className="admin-grid">

          <div className="admin-card">
            <h3>Total Projects</h3>
            <p className="admin-number">—</p>
          </div>

          <div className="admin-card">
            <h3>Total Blog Posts</h3>
            <p className="admin-number">—</p>
          </div>

          <div className="admin-card">
            <h3>Messages Received</h3>
            <p className="admin-number">—</p>
          </div>

        </div>
      </main>
    </div>
  );
}
