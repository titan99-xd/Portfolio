import { Link, useNavigate } from "react-router-dom";
import "../../styles/admin-layout.css";

export default function AdminLayout({ title, children }: {
  title: string;
  children: React.ReactNode;
}) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo">Admin Panel</div>

        <nav className="admin-nav">
          <Link className="admin-nav-item" to="/admin">Dashboard</Link>
          <Link className="admin-nav-item" to="/admin/projects">Projects</Link>
          <Link className="admin-nav-item" to="/admin/blog">Blog</Link>
          <Link className="admin-nav-item" to="/admin/messages">Messages</Link>
        </nav>

        <button className="admin-logout-btn" onClick={logout}>
          Logout
        </button>
      </aside>

      {/* Content */}
      <main className="admin-content">
        <div className="admin-topbar">
          <h1 className="admin-page-title">{title}</h1>
        </div>

        {children}
      </main>
    </div>
  );
}