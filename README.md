# 📚 Fable – Ebook Sharing Platform

**Fable** is a full-stack digital platform that connects ebook lovers, readers, and collectors with talented writers. The platform allows users to browse, discover, and read original ebooks. Writers can upload and manage their creations, while an admin oversees the entire system with powerful analytics.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js)
![Express](https://img.shields.io/badge/Express.js-black?style=flat-square&logo=express)
![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=flat-square&logo=stripe)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=jsonwebtokens)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=flat-square&logo=vercel)

---

## 🌐 Live URL

🔗 **[https://fable-client-psi.vercel.app](https://fable-client-psi.vercel.app)**

---

## 🔗 GitHub Repositories

| Repository | Link |
|---|---|
| 🖥️ Client (Next.js) | [fable-client](https://github.com/chandan-d-karmaker/fable-client) |
| 🗄️ Server (Express.js) | [fable-server](https://github.com/chandan-d-karmaker/fable-server) |

---

## 🎯 Purpose

Traditional ebook reading is often limited to bookstores or libraries. Fable democratizes access to literature, enables emerging writers to reach global audiences, and provides a secure, streamlined reading experience. The project demonstrates advanced concepts in the Next.js + Node.js + MongoDB ecosystem, including role-based access control, Stripe payment integration, and interactive analytics dashboards.

---

## ✨ Key Features

- 🔐 **Authentication** – JWT-based auth with email/password and Google OAuth via BetterAuth
- 👥 **Role-Based Access** – Separate dashboards and permissions for Readers, Writers, and Admins
- 📖 **Browse & Discover** – Search, filter by genre/availability, and sort ebooks
- 🛒 **Stripe Payments** – Secure ebook purchasing via Stripe Checkout sessions
- 🔖 **Bookmarks** – Save ebooks for later reading or purchase
- 📊 **Admin Analytics** – Revenue cards, monthly sales charts, and genre pie charts
- 🌙 **Dark Mode** – Global dark mode toggle persisted via `next-themes`
- 📱 **Fully Responsive** – Mobile-first design with hamburger nav and responsive grid layouts
- ⚡ **Skeleton Loaders** – Smooth loading states on all data-fetching views
- 🚫 **Custom Error Pages** – 404 page with illustration and error boundary fallback UI

---

## 🖥️ Tech Stack

### Frontend (Client)
| Technology | Badge | Purpose |
|---|---|---|
| Next.js 15 (App Router) | ![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js) | React framework |
| React 19 | ![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react) | UI library |
| HeroUI v2 | ![HeroUI](https://img.shields.io/badge/HeroUI-v2-6366F1?style=flat-square) | UI component library |
| Tailwind CSS | ![Tailwind](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css) | Utility-first styling |
| Framer Motion | ![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=flat-square&logo=framer) | Animations & transitions |
| Recharts | ![Recharts](https://img.shields.io/badge/Recharts-Charts-22C55E?style=flat-square) | Admin dashboard charts |
| Swiper | ![Swiper](https://img.shields.io/badge/Swiper-Carousel-6332F6?style=flat-square&logo=swiper) | Hero banner carousel |
| Stripe.js | ![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=flat-square&logo=stripe) | Payment redirect |
| next-themes | ![next-themes](https://img.shields.io/badge/next--themes-Dark_Mode-black?style=flat-square&logo=next.js) | Dark mode |
| react-hot-toast | ![Toast](https://img.shields.io/badge/react--hot--toast-Notifications-FF4500?style=flat-square) | Toast notifications |
| BetterAuth | ![BetterAuth](https://img.shields.io/badge/BetterAuth-OAuth-4285F4?style=flat-square&logo=google) | Google OAuth integration |

### Backend (Server)
| Technology | Badge | Purpose |
|---|---|---|
| Node.js + Express.js | ![Express](https://img.shields.io/badge/Express.js-black?style=flat-square&logo=express) | REST API server |
| MongoDB Atlas | ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb) | Database |
| JSON Web Token | ![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=jsonwebtokens) | Authentication tokens |
| imgBB API | ![imgBB](https://img.shields.io/badge/imgBB-Image_Hosting-2196F3?style=flat-square) | Image hosting |
| dotenv | ![dotenv](https://img.shields.io/badge/dotenv-Env_Vars-ECD53F?style=flat-square) | Environment variable management |
| CORS | ![CORS](https://img.shields.io/badge/CORS-Middleware-FF6C37?style=flat-square) | Cross-origin request handling |

---

## 📄 Pages & Routes

### Public Pages
| Page | Route | Description |
|---|---|---|
| Home | `/` | Hero banner, featured ebooks, top writers, genre grid |
| Browse Ebooks | `/ebooks` | Grid view with search, filter, sort & pagination |
| Ebook Details | `/ebooks/[id]` | Full ebook info, purchase button, bookmark option |
| Login | `/auth/login` | Email/password or Google login |
| Register | `/auth/signup` | Registration with role selection |

### User (Reader) Dashboard — `/dashboard/reader`
| Page | Description |
|---|---|
| Overview | Dashboard home |
| Purchase History | Table of past purchases |
| Purchased Ebooks | Gallery of owned ebooks |
| Bookmarks | Gallery of saved ebooks |
| Profile | View profile info |

### Writer Dashboard — `/dashboard/writer`
| Page | Description |
|---|---|
| Overview | Dashboard home |
| Manage Ebooks | Table with edit/delete/publish controls |
| Add Ebook | Upload form with imgBB cover image |
| Edit Ebook | Pre-filled edit form |
| Sales History | Table of sales and buyer details |
| Bookmarks | Gallery of saved ebooks |

### Admin Dashboard — `/dashboard/admin`
| Page | Description |
|---|---|
| Overview | Analytics cards + monthly sales + genre charts |
| Manage Users | Table with role change and delete controls |
| Manage All Ebooks | Table with publish/unpublish/delete controls |
| All Transactions | Complete payment transaction log |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB connection string
- Stripe account
- imgBB API key
- Google OAuth credentials

### Client Setup

```bash
git clone https://github.com/chandan-d-karmaker/fable-client.git
cd fable-client
npm install
cp .env.local.example .env.local
# Fill in your environment variables
npm run dev
```

### Server Setup

```bash
git clone https://github.com/chandan-d-karmaker/fable-server.git
cd fable-server
npm install
# Create a .env file with your credentials
npm start
```

---

## 🔑 Environment Variables

### Client (`.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
BETTER_AUTH_SECRET=your_better_auth_secret
```

### Server (`.env`)

```env
PORT=8080
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=sk_test_...
CLIENT_URL=http://localhost:3000
```

---

## 📦 NPM Packages Used

### Client
| Package | Badge | Purpose |
|---|---|---|
| `next` | ![Next.js](https://img.shields.io/badge/next-black?style=flat-square&logo=next.js) | React framework with App Router |
| `react`, `react-dom` | ![React](https://img.shields.io/badge/react-61DAFB?style=flat-square&logo=react) | Core React |
| `@heroui/react` | ![HeroUI](https://img.shields.io/badge/@heroui/react-6366F1?style=flat-square) | UI component library |
| `tailwindcss` | ![Tailwind](https://img.shields.io/badge/tailwindcss-38B2AC?style=flat-square&logo=tailwind-css) | Utility-first CSS |
| `framer-motion` | ![Framer](https://img.shields.io/badge/framer--motion-black?style=flat-square&logo=framer) | Animations |
| `date-fns` | ![date-fns](https://img.shields.io/badge/date--fns-770C56?style=flat-square) | Date formatting |
| `recharts` | ![Recharts](https://img.shields.io/badge/recharts-22C55E?style=flat-square) | Admin dashboard charts |
| `swiper` | ![Swiper](https://img.shields.io/badge/swiper-6332F6?style=flat-square&logo=swiper) | Hero section carousel |
| `next-themes` | ![next-themes](https://img.shields.io/badge/next--themes-black?style=flat-square&logo=next.js) | Dark mode toggle |
| `react-hot-toast` | ![Toast](https://img.shields.io/badge/react--hot--toast-FF4500?style=flat-square) | Toast notifications |
| `better-auth` | ![BetterAuth](https://img.shields.io/badge/better--auth-4285F4?style=flat-square&logo=google) | Google OAuth integration |
| `stripe` | ![Stripe](https://img.shields.io/badge/stripe-635BFF?style=flat-square&logo=stripe) | Stripe payment client |

### Server
| Package | Badge | Purpose |
|---|---|---|
| `express` | ![Express](https://img.shields.io/badge/express-black?style=flat-square&logo=express) | REST API framework |
| `mongoDbAtlas` | ![MongoDB](https://img.shields.io/badge/mongodb-47A248?style=flat-square&logo=mongodb) | MongoDB |
| `jsonwebtoken` | ![JWT](https://img.shields.io/badge/jsonwebtoken-000000?style=flat-square&logo=jsonwebtokens) | JWT token generation & verification |
| `cors` | ![CORS](https://img.shields.io/badge/cors-FF6C37?style=flat-square) | Cross-origin request handling |
| `dotenv` | ![dotenv](https://img.shields.io/badge/dotenv-ECD53F?style=flat-square) | Environment variable loading |

---

## 🔒 Security

- All sensitive credentials are stored in environment variables (never committed to version control)
- MongoDB credentials are secured via `.env` on the server
- JWT tokens expire in 7 days
- Frontend API keys are prefixed with `NEXT_PUBLIC_` only for non-sensitive public keys
- Stripe keys are separated (publishable key on client, secret key on server only)

---

## 📸 Screenshots

<img src="https://i.ibb.co.com/ZnxDJHP/fable.png" alt="Fable – Ebook Sharing Platform Screenshot" width="100%" />

> Visit the live site at **[https://fable-client-psi.vercel.app](https://fable-client-psi.vercel.app)** to explore all features.

---

## 📝 License
![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=flat-square)
This project is under MIT License.