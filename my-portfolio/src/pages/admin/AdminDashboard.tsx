import AdminLayout from "../../components/admin/AdminLayout";

export default function AdminDashboard() {
  return (
    <AdminLayout title="Admin Dashboard">
      <div className="admin-grid">

        <div className="admin-card">
          <div className="admin-number">📁</div>
          <h2>Projects</h2>
          <p>Manage projects and images</p>
          <a href="/admin/projects">Go →</a>
        </div>

        <div className="admin-card">
          <div className="admin-number">📝</div>
          <h2>Blog</h2>
          <p>Manage blog posts</p>
          <a href="/admin/blog">Go →</a>
        </div>

        <div className="admin-card">
          <div className="admin-number">🌐</div>
          <h2>Public Site</h2>
          <p>Open your portfolio</p>
          <a href="/" target="_blank">Visit →</a>
        </div>

      </div>
    </AdminLayout>
  );
}