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
