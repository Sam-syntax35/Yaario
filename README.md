# Yaario — Find Your People. ✨

> A MERN-stack social discovery platform that helps people find compatible buddies based on interests, lifestyle, and weekend preferences.

<p align="center">

🌐 **[Live Demo](https://yaario.vercel.app)**  
💻 **[GitHub Repository](https://github.com/Sam-syntax35/Yaario)**  
❤️ **[API Health](https://yaario-backend.onrender.com/api/health)**

</p>

---
---

## 🎥 Demo

▶️ **[Watch the Yaario Demo on YouTube](https://www.youtube.com/watch?v=hY8AKzQxnno)**

A short walkthrough showcasing the complete Yaario user flow, from onboarding and profile creation to buddy discovery and connection unlocking.

---

## 🚀 What is Yaario?

Yaario is a full-stack social discovery platform built to make finding like-minded people simple and engaging.

Users can create a profile, choose their interests and lifestyle preferences, discover compatible buddies, view profiles, and unlock connections through a Razorpay-powered flow.

### ✨ Core Features

- 👤 Multi-step profile onboarding
- 🎯 Interest & lifestyle based preferences
- 🤝 Buddy matching & compatibility
- 🔎 Profile discovery
- 💳 Razorpay payment integration
- 🔐 Secure backend with Helmet & rate limiting
- 📱 Responsive, people-first UI
- 🌍 Fully deployed frontend & backend

---

## 🛠️ Tech Stack

**Frontend**

`React` · `Vite` · `JavaScript` · `CSS`

**Backend**

`Node.js` · `Express.js` · `MongoDB` · `Mongoose`

**Other**

`Razorpay` · `Helmet` · `CORS` · `Express Rate Limit`

**Deployment**

`Vercel` · `Render` · `MongoDB Atlas`

---

## 🏗️ Architecture

```text
                 User
                  │
                  ▼
        ┌──────────────────┐
        │  React + Vite    │
        │     Vercel       │
        └────────┬─────────┘
                 │
                 │ REST API
                 ▼
        ┌──────────────────┐
        │ Node + Express   │
        │     Render       │
        └───────┬──────────┘
                │
        ┌───────┴────────┐
        ▼                ▼
   MongoDB Atlas      Razorpay

---

## 🔄 User Flow

```text
Landing Page
     ↓
Profile Onboarding
     ↓
Interests + Lifestyle
     ↓
Create Profile
     ↓
Discover Buddies
     ↓
View Match
     ↓
Unlock Connection


🔌 API
Production API
`https://yaario-backend.onrender.com/api`
Health Check
```http
GET /api/health
```
Response:
```json
{
  "success": true,
  "message": "Yaario API is running"
}
```
Main Routes
```text
/api/profiles
/api/matches
/api/payments
/api/health
```
---
📮 API Testing
The backend APIs were tested using Postman.
👉 View Postman Collection
The collection covers the major API flows including profile, matching, payment, and production API testing.
---
🎥 Demo
A short walkthrough demonstrates:
Landing page
Profile onboarding
Interest selection
Buddy discovery
Match viewing
Profile details
Connection unlock flow

Backend
```bash
cd backend
npm install
npm run dev
```
Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend Environment
```env
VITE\_API\_BASE\_URL=http://localhost:5000/api
```
Backend Environment
```env
PORT=5000
CLIENT\_URL=http://localhost:5173
MONGODB\_URI=your\_mongodb\_uri
RAZORPAY\_KEY\_ID=your\_razorpay\_key
RAZORPAY\_KEY\_SECRET=your\_razorpay\_secret
```
---
🔐 Security
Sensitive credentials are stored in environment variables
`.env` files are excluded from Git
Helmet security headers
CORS configuration
Express rate limiting
Razorpay secret remains server-side
---
📌 Assessment Highlights
This project demonstrates:
Full-stack MERN development
REST API design
MongoDB integration
Third-party payment integration
Frontend ↔ Backend integration
Postman API testing
Production deployment
Responsive UI/UX
Secure environment configuration
---
👨‍💻 Developer
Mansi Sharma
💻 GitHub
🌐 Yaario Live Demo
---
<p align="center">
Yaario — Find your people. ❤️
Built with the MERN stack.
</p>
