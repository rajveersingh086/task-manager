# task-manager
# 🚀 Team Task Manager

A full-stack Task Management Application built using **MERN Stack (MongoDB, Express, React, Node.js)**.

---

## 🔥 Features

- ✅ User Authentication (Register / Login with JWT)
- ✅ Create, Update, Delete Tasks
- ✅ Assign Tasks
- ✅ Task Status Tracking (Pending / Completed)
- ✅ Dashboard with:
  - Total Tasks
  - Completed Tasks
  - Pending Tasks
  - Overdue Tasks

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

---

## 📂 Project Structure

task-manager/
│
├── backend/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── server.js
│
├── frontend/
│ ├── src/
│ ├── pages/
│ └── services/
│
└── README.md

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
Authentication Flow
User registers → password hashed using bcrypt
Login → JWT token generated
Token stored in localStorage
API requests authenticated using Bearer Token

API Endpoints
Auth
POST /api/auth/register
POST /api/auth/login
Tasks
GET /api/tasks
POST /api/tasks
PUT /api/tasks/:id
DELETE /api/tasks/:id
🚀 Future Improvements
Role-based access control
Project-based task grouping
Notifications
UI improvements
📸 Demo

👉 (Add Railway deployment link here)
https://lucid-enthusiasm-production-66b1.up.railway.app/

👨‍💻 Author
Rajveer Singh
