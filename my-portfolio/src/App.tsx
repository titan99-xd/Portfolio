import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import Header from "./components/layout/Header";
import ScrollToTop from "./components/ScrollToTop";
import ContactButton from "./components/ui/contact-me-btn";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";

// Public Blog
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";

// Admin & Auth
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

// Admin Blog Pages
import BlogAdminList from "./pages/admin/blog/BlogList";
import BlogCreate from "./pages/admin/blog/BlogCreate";
import BlogEdit from "./pages/admin/blog/BlogEdit";

import ProjectList from "./pages/admin/projects/ProjectList";
import ProjectCreate from "./pages/admin/projects/ProjectCreate";
import ProjectEdit from "./pages/admin/projects/ProjectEdit";
import AdminProjectEdit from "./pages/admin/AdminProjectEdit";
import AdminProjectList from "./pages/admin/AdminProjectList";
import AdminProjectCreate from "./pages/admin/AdminProjectCreate";



import "./styles/app.css";


function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <ContactButton />

      <main className="app-main">
        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* PUBLIC BLOG */}
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />

          {/* ADMIN LOGIN */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* ADMIN DASHBOARD */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* ADMIN BLOG CRUD */}
          <Route
            path="/admin/blog"
            element={
              <ProtectedRoute>
                <BlogAdminList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/blog/new"
            element={
              <ProtectedRoute>
                <BlogCreate />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/blog/:id/edit"
            element={
              <ProtectedRoute>
                <BlogEdit />
              </ProtectedRoute>
            }
          />
          <Route
  path="/admin/projects"
  element={
    <ProtectedRoute>
      <ProjectList />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/projects/new"
  element={
    <ProtectedRoute>
      <ProjectCreate />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/projects/:id/edit"
  element={
    <ProtectedRoute>
      <ProjectEdit />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/projects"
  element={
    <ProtectedRoute>
      <AdminProjectList />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/projects/new"
  element={
    <ProtectedRoute>
      <AdminProjectCreate />
    </ProtectedRoute>
  }
/>
<Route path="/admin/projects/:id" element={<ProtectedRoute><AdminProjectEdit /></ProtectedRoute>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
