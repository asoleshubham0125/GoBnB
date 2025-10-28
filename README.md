# 🏡 GoBnB – Full-Stack Accommodation Booking Platform

A full-stack web application inspired by Airbnb, built using **Node.js**, **Express.js**, **MongoDB**, and **EJS**.  
GoBnB allows users to create, browse, and review property listings with integrated maps, secure authentication, and cloud-based image storage.

---

## 🚀 Live Demo
🔗 **[View GoBnB on Render](https://gobnb-3cmh.onrender.com)**  
💻 **[GitHub Repository](https://github.com/asoleshubham0125/GoBnB)**

---

## 🧰 Tech Stack

### Backend
- **Node.js** (v22.12.0)
- **Express.js** (v5.1.0)
- **MongoDB** (v6.20.0) with **Mongoose** (v8.19.2)

### Frontend
- **EJS (Embedded JavaScript)** templating
- **EJS-Mate** for layouts
- **Bootstrap (via CDN)** for styling
- **Custom CSS**

### Authentication & Security
- **Passport.js** with **passport-local** strategy
- **express-session** for session management
- **connect-flash** for flash messages
- **Joi** for input validation
- **bcrypt** for password hashing
- Optional **CSRF protection** (via `csurf`)

### File Uploads & Cloud Storage
- **Multer** for handling multipart uploads
- **Cloudinary** for image hosting & CDN delivery

### Maps & Geolocation
- **Mapbox SDK** for geocoding and interactive maps
- Stores location data in **GeoJSON** format

---

## 🧩 Features

### 👥 User Management
- Register, login, and logout securely
- Profile creation and session persistence
- Flash messages for feedback

### 🏠 Listing Management
- CRUD operations for property listings
- Upload multiple images (stored on Cloudinary)
- Location geocoding using Mapbox
- Interactive maps for each property
- Price, description, and rating display

### 💬 Review System
- Add or delete reviews for listings
- Star rating (1–5) and comment support
- Cascade delete reviews when a listing is removed

### 🗺️ Maps Integration
- Dynamic Mapbox map for each listing
- Pinpoint property location on map
- Reverse geocoding for address lookup

### 🖼️ Image Management
- Image upload with `Multer`
- Cloud storage via Cloudinary
- Automatic optimization and fast delivery via CDN

### 🔒 Security & Validation
- Password hashing via `passport-local-mongoose`
- Session handling with secure cookies
- Server-side input validation with `Joi`
- XSS protection via EJS escaping
- Graceful error handling middleware

---

## 🧠 Project Architecture

GoBnB/
├── app.js # Main application file
├── cloudConfig.js # Cloudinary configuration
├── middleware.js # Custom middleware
├── schema.js # Joi validation schemas
├── controllers/ # Route controllers
│ ├── listings.js
│ ├── reviews.js
│ └── users.js
├── models/ # Mongoose models
│ ├── listing.js
│ ├── review.js
│ └── user.js
├── routes/ # Express routes
│ ├── listing.js
│ ├── review.js
│ └── user.js
├── public/ # Static files (CSS, JS)
│ ├── css/
│ └── js/
├── views/ # EJS templates
│ ├── layouts/
│ ├── includes/
│ ├── listings/
│ └── users/
└── utils/
├── ExpressError.js
└── wrapAsync.js


---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```bash
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
MAP_TOKEN=your_mapbox_token
ATLASDB=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
