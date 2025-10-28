# 🏡 GoBnB – AI-Enhanced Accommodation Booking Platform

> Your modern, intelligent property booking platform inspired by Airbnb — built with **Node.js**, **Express**, **MongoDB**, and **Mapbox** 🌍  

![Tech Stack](https://img.shields.io/badge/Stack-MERN-blue?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green)
![Deployed on Render](https://img.shields.io/badge/Deployed-Render-purple)

🔗 **[Live Demo](https://gobnb-3cmh.onrender.com)** | 💻 **[GitHub](https://github.com/asoleshubham0125/GoBnB)** | 📖 **Documentation Coming Soon**

---

## ✨ Overview
**GoBnB** is a full-stack web application designed for property listing, discovery, and booking.  
It integrates **Mapbox** for geolocation, **Cloudinary** for media management, and **Passport.js** for secure authentication — delivering a seamless user experience similar to modern travel platforms.

---

## 🌟 Key Features

| Category | Highlights |
|-----------|-------------|
| 🧑‍💻 **User System** | Secure sign-up, login, logout, session-based authentication |
| 🏠 **Property Listings** | Create, update, delete, and view listings with pricing, location, and photos |
| 💬 **Reviews** | Leave feedback and star ratings for properties |
| 🗺️ **Interactive Maps** | Mapbox-powered map views with geocoding support |
| ☁️ **Image Uploads** | Cloudinary integration with multiple image support |
| 🧱 **Architecture** | Follows clean MVC design for scalability |
| 🔐 **Security** | Input validation, error handling, and session management |

---

## 🧰 Tech Stack

| Layer | Technologies |
|--------|---------------|
| **Backend** | Node.js, Express.js |
| **Frontend** | EJS, Bootstrap, Custom CSS |
| **Database** | MongoDB with Mongoose |
| **Authentication** | Passport.js, express-session, connect-flash |
| **Maps & Geolocation** | Mapbox SDK |
| **File Storage** | Multer + Cloudinary |
| **Validation** | Joi |
| **Dev Tools** | nodemon, dotenv, connect-mongo, method-override |

---

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/asoleshubham0125/GoBnB.git
cd GoBnB

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env

# Run the app
npm start

# Visit the app
http://localhost:8080
```

---

## 🗂️ Project Structure
```
GoBnB/
├── app.js                 # Main app
├── models/                # Mongoose models
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── controllers/           # Route controllers
├── routes/                # Express routers
├── public/                # Static assets (CSS, JS)
├── views/                 # EJS templates
└── utils/                 # Helper utilities
```

---

## 🌍 Architecture Overview
![GoBnB Architecture](https://cdn-icons-png.flaticon.com/512/6646/6646245.png)
> MVC architecture — Models handle data, Views render EJS templates, Controllers manage logic.

---

## ⚙️ Environment Setup

Create a `.env` file:
```bash
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
MAP_TOKEN=your_mapbox_token
ATLASDB=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
```

---

## 🧱 Data Models
| Model | Fields | Relations |
|--------|---------|------------|
| **User** | username, email, password | Owns listings, reviews |
| **Listing** | title, description, price, location, images | Has many reviews |
| **Review** | rating, comment, author | Belongs to listing |

---

## 🧩 Notable Implementations
- 🌐 RESTful API Design  
- 🧠 Async Error Handling (`wrapAsync`, `ExpressError`)  
- 🗺️ Mapbox Geocoding Integration  
- ☁️ Cloudinary CDN for Images  
- 🔐 Secure Authentication Flow  
- 📦 Modular MVC Architecture  

---

## 👨‍💻 Author
**Shubham Dattatray Asole**  
📧 [asoleshubham01@gmail.com](mailto:asoleshubham01@gmail.com)  
🔗 [LinkedIn](https://www.linkedin.com/in/shubham-asole)  
💻 [GitHub](https://github.com/asoleshubham0125)

---

## 🧾 License
MIT License © 2025 [Shubham Asole](https://github.com/asoleshubham0125)

---

> 💡 “GoBnB combines modern web architecture with real-world problem-solving — showcasing scalable, secure, and interactive full-stack development.”