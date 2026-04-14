# 🎵 Photography Website

A full-stack web application that allows users to browse music albums and enables administrators to manage album content through a secure admin panel.

---

## 🚀 Overview

This project demonstrates a modern full-stack architecture using React, Node.js, and MongoDB with cloud-based image handling.

- Users can explore albums and view details
- Admins can securely manage albums (Add / Edit / Delete)
- Images are stored in the cloud using Cloudinary

---

## ✨ Features

### 🌐 Public Website
- View all albums in a responsive grid
- View detailed album information
- Clean and modern UI

### 🔐 Admin Panel
- Secure admin login (JWT authentication)
- Dashboard overview
- Add new albums with image upload
- Edit and delete albums

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

### Security
- JWT Authentication
- bcrypt password hashing

### Cloud & Deployment
- Cloudinary (image storage)
- Vercel (frontend)
- Render (backend)
- MongoDB Atlas (database)

---

## 🏗 Architecture

Frontend (React)  
⬇️  
Backend API (Express)  
⬇️  
MongoDB (Database)  
⬇️  
Cloudinary (Image Storage)

---

## 🔌 API Endpoints

### Auth
- POST /api/auth/login

### Albums
- GET /api/albums
- GET /api/albums/:id
- POST /api/albums (Admin only)
- PUT /api/albums/:id (Admin only)
- DELETE /api/albums/:id (Admin only)

---

## 🔐 Authentication Flow

1. Admin logs in with email & password  
2. Password verified using bcrypt  
3. JWT token generated  
4. Token stored in browser  
5. Token used for protected routes  

---

## 🖼 Image Upload Flow

1. Admin uploads image  
2. Backend receives file (Multer)  
3. Image uploaded to Cloudinary  
4. Cloudinary returns image URL  
5. URL stored in MongoDB  
6. Displayed in frontend  

---

## 🌍 Environment Variables

### Backend (.env)
