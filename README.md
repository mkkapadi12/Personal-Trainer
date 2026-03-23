# 🏋️ Personal Trainer

A full-stack web application for a personal training business — featuring fitness articles, product shop, appointment booking, user authentication, and more.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [API Routes](#api-routes)
- [Pages & Routes](#pages--routes)
- [Scripts](#scripts)

---

## Overview

Personal Trainer is a modern full-stack web application built with **React + Vite** on the frontend and **Node.js + Express** on the backend, connected to a **MongoDB** database. It provides a complete platform for a personal training business including user accounts, article browsing, product shopping, appointment scheduling, cart & wishlist management.

---

## 🛠 Tech Stack

### Frontend

| Technology                  | Purpose                     |
| --------------------------- | --------------------------- |
| React 19                    | UI library                  |
| Vite 7                      | Build tool & dev server     |
| React Router DOM 7          | Client-side routing         |
| Redux Toolkit + React Redux | Global state management     |
| Tailwind CSS 4              | Utility-first styling       |
| Shadcn UI / Radix UI        | Accessible UI components    |
| React Hook Form + Zod       | Form handling & validation  |
| Axios                       | HTTP client                 |
| Lucide React & Heroicons    | Icon libraries              |
| Embla Carousel              | Carousel/slider component   |
| Sonner                      | Toast notifications         |
| next-themes                 | Dark/light theme management |

### Backend

| Technology          | Purpose                         |
| ------------------- | ------------------------------- |
| Node.js + Express 5 | REST API server                 |
| MongoDB + Mongoose  | Database & ODM                  |
| JWT (jsonwebtoken)  | Authentication tokens           |
| bcrypt              | Password hashing                |
| CORS                | Cross-origin resource sharing   |
| dotenv              | Environment variable management |
| nodemon             | Development auto-reload         |

---

## 📁 Project Structure

```
Personal Trainer/
├── backend/                  # Express REST API
│   ├── controllers/          # Route handler logic
│   │   ├── auth.controller.js
│   │   ├── address.controller.js
│   │   ├── article.controller.js
│   │   ├── appo.controller.js
│   │   └── product.controller.js
│   ├── models/               # Mongoose schemas
│   │   ├── user.model.js
│   │   ├── address.model.js
│   │   ├── article.model.js
│   │   ├── appo.model.js
│   │   └── product.model.js
│   ├── routes/               # API route definitions
│   │   ├── auth.routes.js
│   │   ├── address.routes.js
│   │   ├── article.routes.js
│   │   ├── appo.routes.js
│   │   └── product.routes.js
│   ├── middlewares/          # Custom middleware (error handling, auth)
│   ├── .env                  # Environment variables
│   └── index.js              # App entry point
│
├── src/                      # React frontend
│   ├── components/           # Reusable UI components
│   │   ├── Layout/           # App shell (Navbar, Footer)
│   │   ├── home/             # Homepage sections
│   │   └── ui/               # Shadcn UI primitives
│   ├── pages/                # Page-level components
│   │   ├── Auth/             # Login, Register, Profile
│   │   ├── Address/          # User address management
│   │   ├── Appointment/      # Book & view appointments
│   │   ├── Article/          # Articles list & detail
│   │   ├── Products/         # Collections, product list & detail
│   │   ├── Cart/             # Shopping cart
│   │   ├── WishList/         # Saved items
│   │   ├── Private/          # Protected route wrapper
│   │   ├── Home.jsx
│   │   ├── AboutUs.jsx
│   │   ├── Services.jsx
│   │   ├── Contact.jsx
│   │   └── Faqs.jsx
│   ├── Store/                # Redux store & slices
│   ├── constants/            # App-wide constants
│   ├── lib/                  # Utility helpers
│   ├── App.jsx               # Router configuration
│   └── main.jsx              # React entry point
│
├── public/                   # Static assets
├── index.html                # HTML template
├── vite.config.js            # Vite configuration
└── package.json              # Frontend dependencies
```

---

## ✨ Features

- 🔐 **Authentication** — Register, login, and JWT-secured protected routes
- 👤 **User Profile** — View and manage profile, saved addresses
- 📅 **Appointment Booking** — Book personal training sessions and view existing appointments
- 📰 **Articles** — Browse and read fitness/health articles
- 🛍️ **Product Shop** — Browse product collections by category, view product details
- 🛒 **Shopping Cart** — Add/remove products, manage quantities
- ❤️ **Wishlist** — Save products for later
- 📱 **Responsive Design** — Mobile-first layout with Tailwind CSS

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or above)
- [MongoDB](https://www.mongodb.com/) (local instance or Atlas URI)
- npm (comes with Node.js)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mkkapadi12/Personal-Trainer.git
   cd Personal-Trainer
   ```

2. **Install frontend dependencies:**

   ```bash
   npm install
   ```

3. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

### Environment Variables

Create a `.env` file inside the `backend/` directory:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/personal_trainer
JWT_SECRET_KEY=your_jwt_secret_key
```

> ⚠️ Never commit your `.env` file to version control.

### Running the App

You need two terminals — one for the frontend and one for the backend.

**Start the backend server:**

```bash
cd backend
npm run dev
```

> Backend runs on `http://localhost:3000`

**Start the frontend dev server:**

```bash
# From the project root
npm run dev
```

> Frontend runs on `http://localhost:5173` (default Vite port)

---

## 🔌 API Routes

All API routes are prefixed with `/api`.

| Method | Endpoint                  | Description           | Auth Required |
| ------ | ------------------------- | --------------------- | :-----------: |
| POST   | `/api/auth/register`      | Register a new user   |      ❌       |
| POST   | `/api/auth/login`         | Login & receive JWT   |      ❌       |
| GET    | `/api/user/addresses`     | Get user addresses    |      ✅       |
| POST   | `/api/user/addresses`     | Add a new address     |      ✅       |
| PUT    | `/api/user/addresses/:id` | Update an address     |      ✅       |
| DELETE | `/api/user/addresses/:id` | Delete an address     |      ✅       |
| GET    | `/api/article`            | Get all articles      |      ❌       |
| GET    | `/api/article/:id`        | Get single article    |      ❌       |
| GET    | `/api/appointment`        | Get user appointments |      ✅       |
| POST   | `/api/appointment`        | Book an appointment   |      ✅       |
| GET    | `/api/products`           | Get all products      |      ❌       |
| GET    | `/api/products/:id`       | Get single product    |      ❌       |

---

## 🧭 Pages & Routes

| Path                              | Page                 | Protected |
| --------------------------------- | -------------------- | :-------: |
| `/`                               | Home                 |    ❌     |
| `/account/register`               | Register             |    ❌     |
| `/account/login`                  | Login                |    ❌     |
| `/account/profile`                | Profile              |    ✅     |
| `/account/profile/address`        | Manage Addresses     |    ✅     |
| `/account/appointment`            | My Appointments      |    ✅     |
| `/account/cart`                   | Shopping Cart        |    ✅     |
| `/account/wishlist`               | Wishlist             |    ✅     |
| `/pages/about`                    | About Us             |    ❌     |
| `/pages/contact`                  | Contact              |    ❌     |
| `/pages/faqs`                     | FAQs                 |    ❌     |
| `/pages/services`                 | Services             |    ❌     |
| `/pages/appointment`              | Book Appointment     |    ❌     |
| `/articles`                       | All Articles         |    ❌     |
| `/articles/:id`                   | Article Detail       |    ❌     |
| `/products`                       | Collections          |    ❌     |
| `/products/collections/:category` | Products by Category |    ❌     |
| `/products/:id`                   | Product Detail       |    ❌     |

---

## 📜 Scripts

### Frontend (root)

| Command                | Description                   |
| ---------------------- | ----------------------------- |
| `npm run dev`          | Start Vite development server |
| `npm run build`        | Build for production          |
| `npm run preview`      | Preview production build      |
| `npm run lint`         | Run ESLint                    |
| `npm run lint:fix`     | Auto-fix lint errors          |
| `npm run format`       | Format code with Prettier     |
| `npm run format:check` | Check formatting              |

### Backend (`/backend`)

| Command       | Description                             |
| ------------- | --------------------------------------- |
| `npm run dev` | Start server with nodemon (auto-reload) |
| `npm start`   | Start server with node                  |

---

## 📄 License

This project is licensed under the **ISC License**.
