# Yaario — Find Your People. ✨

> A MERN-stack social discovery platform that helps people find compatible buddies based on interests, lifestyle, and weekend preferences.

<p align="center">

🌐 **[Live Demo](https://yaario.vercel.app)**  
💻 **[GitHub Repository](https://github.com/Sam-syntax35/Yaario)**  
❤️ **[API Health](https://yaario-backend.onrender.com/api/health)**

</p>

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
