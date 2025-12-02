# 🚀 Personal Portfolio Website (Full-Stack)

A full-stack personal portfolio website built with:

- **React + TypeScript (Vite)**
- **Node.js + Express + TypeScript**
- **MySQL (with connection pool)**
- **JWT authentication**
- **Multer image uploads**
- **Admin dashboard (protected)**
- **Dynamic projects & blog system**

This project showcases my work, projects, skills, and includes a complete admin panel to manage content.

---

# 🌟 Features

### 🎨 Public Website

- Modern animated hero sections
- About page
- Fully responsive Portfolio section
- Dynamic project cards
- Multiple images per project (gallery)
- Contact form (stores messages in DB)
- Sticky contact button
- Blog section (optional)

### 🔐 Admin Dashboard

- Login system with JWT authentication
- Protected pages using authorization middleware
- Manage projects (create, edit, delete)
- Upload multiple images per project
- Manage blog posts & tags
- View messages

### 🗄 Backend API

- REST API with Express + TypeScript
- Strong validation & error handling
- Secure password hashing (bcryptjs)
- File upload handling with Multer
- Database connection with MySQL Pool
- MVC architecture (controllers, routes, middleware)

---

# 🧱 Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- Axios
- Custom CSS

### Backend

- Node.js
- Express
- TypeScript
- JWT Authentication
- Multer (image upload)
- bcryptjs
- MySQL2 (promise)

### Database

- MySQL
- ERD includes:
  - users
  - blog_posts
  - tags
  - post_tags
  - projects
  - project_images
  - messages

---

# 📁 Folder Structure

```bash
my-portfolio/
│
├── frontend/              # React + TypeScript code
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── hooks/
│   │   └── App.tsx
│   └── vite.config.ts
│
└── server/                # Node.js + Express backend
    ├── src/
    │   ├── controllers/
    │   ├── middleware/
    │   ├── routes/
    │   ├── db/
    │   └── index.ts
    ├── uploads/           # Uploaded project images
    ├── api.rest           # REST Client testing
    └── package.json
```

```bash
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(150) UNIQUE,
    password_hash VARCHAR(255),
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT,
    cover_image VARCHAR(255),
    author_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE post_tags (
    post_id INTEGER REFERENCES blog_posts(id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200),
    description TEXT,
    link VARCHAR(255),
    thumbnail VARCHAR(255)
);

CREATE TABLE project_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT,
    image_url VARCHAR(255)
);
```
