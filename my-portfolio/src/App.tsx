// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Header from './components/layout/Header'
// import Home from './pages/Home'
// import About from './pages/About'
// import Portfolio  from './pages/Portfolio'
// import Blog from './pages/blog'
// import PrivacyPolicy from './pages/PrivacyPolicy'
// import ScrollToTop from './components/ScrollToTop'
// import './styles/app.css'



// function App() {
//   return (
//     <BrowserRouter>
//       <ScrollToTop />
//       <Header />
//       <main className="app-main">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/portfolio" element={<Portfolio />} />
//           <Route path="/blog" element={<Blog  />} />
//           <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//         </Routes>
//       </main>
//     </BrowserRouter>
//   )
// }

// export default App


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio  from './pages/Portfolio';
import Blog from './pages/blog';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ScrollToTop from './components/ScrollToTop';
import ContactButton from './components/ui/contact-me-btn';
import './styles/app.css';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />

      {/* Floating Contact Me button */}
      <ContactButton />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blog" element={<Blog  />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
