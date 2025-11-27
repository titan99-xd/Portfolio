import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import ScrollToTop from "./components/ScrollToTop";
import ContactButton from "./components/ui/contact-me-btn";

import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Blog from "./pages/blog";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

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
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* ADMIN AUTH ROUTE */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* PROTECTED ADMIN ROUTE */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
