# 🚀 My Portfolio — Full-Stack Web App (React + Node + MySQL)

A modern full-stack portfolio website with a full admin dashboard, blog system, project manager, and contact message system.

Frontend: **React + Vite + TypeScript**  
Backend: **Node.js + Express + MySQL**  
Admin Panel: **Fully styled dashboard with CRUD for Projects, Blog, Images, Messages**

---

## 🌟 Features

### 🖥 Public Website

- Fully responsive modern UI  
- Animated Home page  
- About page  
- Portfolio with project gallery  
- Contact form (messages stored in database)  
- Blog system:
  - Pagination  
  - Tag filtering  
  - Search  
  - Markdown rendering  
  - Individual blog pages  

### 🔐 Admin Dashboard

Protected by JWT Authentication.

Includes:

- **Blog Management**
  - Create / Edit / Delete blog posts
  - Markdown editor with toolbar + live preview
  - Cover image upload
  - Tag system (create-on-post)
  - Paginated list with search + tag filter

- **Project Management**
  - Create / Edit projects
  - Upload unlimited images
  - Edit titles, descriptions, links
  - Delete images & projects
  - Clean responsive admin table

- **Messages**
  - View contact form submissions
  - Delete messages


---

## 📦 Tech Stack

### Frontend

- React (Vite)
- TypeScript
- React Router
- Axios
- React Markdown
- Custom CSS (no Tailwind)

### Backend

- Node.js + Express
- MySQL2
- Multer (image uploads)
- JWT Authentication
- Bcrypt (password hashing)
- dotenv
- CORS

---

## 📁 Project Structure

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

---

# ⚙️ Backend Setup

### 1️⃣ Install dependencies

```sh
cd server
npm install
express
cors
dotenv
jsonwebtoken
mysql2
bcryptjs
multer
typescript. ( Dev Pacakages)
ts-node
nodemon
@types/node
@types/express
@types/cors


###  Create a .env
```sh
PORT=5050
JWT_SECRET=your_secret_key

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=portfolio_db
```