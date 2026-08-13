# Workloom 🚀

> **Where projects come together.**

Workloom is a modern, full-stack Project Management application designed to streamline team collaboration, task tracking, and project organization. Built with the MERN stack (MongoDB, Express, React, Node.js), it offers a highly responsive, beautiful UI with powerful backend capabilities.

## ✨ Features

- **Robust Authentication:** Secure JWT-based login, registration, and email verification.
- **Project Workspaces:** Create projects, manage team members, and assign custom roles/permissions.
- **Advanced Task Management:** Create, assign, and track tasks & subtasks. Includes priority levels, statuses, and due dates.
- **Cloud Storage:** Integrated with Cloudinary for seamless, permanent attachment and avatar uploads.
- **Activity Tracking:** Detailed timeline logs for all actions within a project (creation, updates, deletions).
- **Real-time Notifications:** In-app notification center to keep users updated on task assignments and project changes.
- **Modern UI/UX:** Built with React, Tailwind CSS, and Framer Motion for a sleek, dark-themed, and highly interactive user experience.

## 🛠️ Tech Stack

### Frontend
- **React.js** (Vite)
- **Tailwind CSS** (Styling)
- **React Query** (Server state & caching)
- **Zustand** (Global client state & persistence)
- **React Router v6** (Routing)
- **Lucide React** (Icons)

### Backend
- **Node.js & Express.js**
- **MongoDB & Mongoose** (Database & ODM)
- **Cloudinary** (Media & File Storage)
- **Nodemailer / Mailgen** (Email services)
- **JWT** (Authentication)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- Cloudinary account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/workloom.git
   cd workloom
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   - Create a `.env` file in the `backend` directory and add your credentials (MongoDB, JWT Secrets, Cloudinary, etc.).
   - Run the development server:
   ```bash
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```
   - Create a `.env` file in the `frontend` directory:
   ```env
   VITE_API_BASE_URL=http://localhost:8080/api/v1
   ```
   - Run the frontend:
   ```bash
   npm run dev
   ```

## 🌐 Deployment
- **Frontend:** Optimized for deployment on [Vercel](https://vercel.com) (includes `vercel.json` for React Router support).
- **Backend:** Optimized for deployment on [Render](https://render.com) or similar Node.js hosting platforms.
