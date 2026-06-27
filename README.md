# Fable - Ebook Sharing Platform

**Fable** — an ebook sharing platform built with Next.js, HeroUI, and Tailwind CSS.

## Purpose
- Traditional ebook reading is often limited to bookstores or libraries. An online ebook sharing platform democratizes access to literature, enables emerging writers to reach global audiences, and provides a secure, streamlined reading experience. The project demonstrates advanced MERN stack concepts including role-based access, payment integration, and interactive features and analytics

## Live URL
> https://fable-ebooks.vercel.app

## Tech Stack
- Next.js 15 (App Router, JSX)
- HeroUI v2 (UI components)
- Tailwind CSS
- Framer Motion (animations)
- Recharts (admin analytics charts)
- Axios (HTTP client)
- Stripe (payment redirect)
- next-themes (dark mode)
- react-hot-toast (notifications)

## Key Features
- 🔐 JWT auth with email/password and Google login (BetterAuth ready)
- 📚 Browse, search, filter, and sort ebooks
- 🛒 Stripe checkout for purchasing ebooks
- 🔖 Bookmark system for readers and writers
- 📊 Admin analytics dashboard with charts
- 🌙 Dark mode toggle
- 📱 Fully responsive 
- ⚡ Skeleton loaders on all data-fetching views
- 🚫 Custom 404 and error boundary pages

## Page Structure

```
├── 📁 app
│   ├── 📁 (auth)
│   │   ├── 📁 auth
│   │   │   ├── 📁 login
│   │   │   │   └── 📄 page.jsx
│   │   │   └── 📁 signup
│   │   │       └── 📄 page.jsx
│   │   └── 📄 layout.jsx
│   ├── 📁 (dashboard)
│   │   └── 📁 dashboard
│   │       ├── 📁 admin
│   │       │   ├── 📁 manage-ebooks
│   │       │   │   ├── 📄 ManageEbookTable.jsx
│   │       │   │   └── 📄 page.jsx
│   │       │   ├── 📁 manage-users
│   │       │   │   ├── 📄 ManageUserTable.jsx
│   │       │   │   ├── 📄 loading.jsx
│   │       │   │   └── 📄 page.jsx
│   │       │   ├── 📁 transactions
│   │       │   │   ├── 📄 loading.jsx
│   │       │   │   ├── 📄 page.jsx
│   │       │   │   └── 📄 transactionHistoryTable.jsx
│   │       │   ├── 📄 AdminCharts.jsx
│   │       │   ├── 📄 layout.jsx
│   │       │   └── 📄 page.jsx
│   │       ├── 📁 reader
│   │       │   ├── 📁 bookmarks
│   │       │   │   └── 📄 page.jsx
│   │       │   ├── 📁 profile
│   │       │   │   └── 📄 page.jsx
│   │       │   ├── 📁 purchased-ebooks
│   │       │   │   └── 📄 page.jsx
│   │       │   ├── 📁 purchased-history
│   │       │   │   ├── 📄 PurchaseHistoryTable.jsx
│   │       │   │   └── 📄 page.jsx
│   │       │   ├── 📄 layout.jsx
│   │       │   └── 📄 page.jsx
│   │       ├── 📁 writer
│   │       │   ├── 📁 add-ebook
│   │       │   │   └── 📄 page.jsx
│   │       │   ├── 📁 bookmark
│   │       │   │   └── 📄 page.jsx
│   │       │   ├── 📁 edit
│   │       │   │   ├── 📁 [id]
│   │       │   │   │   └── 📄 page.jsx
│   │       │   │   ├── 📄 EditBookForm.jsx
│   │       │   │   └── 📄 page.jsx
│   │       │   ├── 📁 manage-ebook
│   │       │   │   ├── 📄 WriterEbooksTable.jsx
│   │       │   │   ├── 📄 loading.jsx
│   │       │   │   └── 📄 page.jsx
│   │       │   ├── 📁 sales-history
│   │       │   │   ├── 📄 SalesHistoryTable.jsx
│   │       │   │   ├── 📄 loading.jsx
│   │       │   │   └── 📄 page.jsx
│   │       │   ├── 📄 layout.jsx
│   │       │   └── 📄 page.jsx
│   │       ├── 📄 layout.jsx
│   │       └── 📄 loading.jsx
│   ├── 📁 (main)
│   │   ├── 📁 ebooks
│   │   │   ├── 📁 [id]
│   │   │   │   ├── 📄 loading.jsx
│   │   │   │   └── 📄 page.jsx
│   │   │   ├── 📁 cancel
│   │   │   │   └── 📄 page.jsx
│   │   │   ├── 📁 success
│   │   │   │   └── 📄 page.jsx
│   │   │   ├── 📄 ebookActions.jsx
│   │   │   ├── 📄 loading.jsx
│   │   │   └── 📄 page.jsx
│   │   ├── 📁 forbidden
│   │   │   └── 📄 page.jsx
│   │   ├── 📁 onboarding
│   │   │   └── 📄 page.jsx
│   │   ├── 📁 unauthorized
│   │   │   └── 📄 page.jsx
│   │   ├── 📄 layout.jsx
│   │   ├── 📄 loading.jsx
│   │   └── 📄 page.js
│   ├── 📁 api
│   │   ├── 📁 auth
│   │   │   └── 📁 [...all]
│   │   │       └── 📄 route.js
│   │   └── 📁 checkout_sessions
│   │       └── 📄 route.js
│   ├── 📁 providers
│   │   └── 📄 theme-provider.jsx
│   ├── 📄 favicon.ico
│   ├── 🎨 globals.css
│   ├── 📄 layout.js
│   └── 📄 not-found.jsx
├── 📁 assets
│   ├── 🖼️ Book.svg
│   ├── 🖼️ Error404.svg
│   ├── 🖼️ Login.svg
│   ├── 🖼️ Money.svg
│   └── 🖼️ logo.png
├── 📁 components
│   ├── 📁 dashboard
│   │   └── 📄 SideBar.jsx
│   ├── 📁 main
│   │   ├── 📄 Banner.jsx
│   │   ├── 📄 Featured.jsx
│   │   ├── 📄 Genre.jsx
│   │   └── 📄 TopWriter.jsx
│   └── 📁 shared
│       ├── 📄 BackButton.jsx
│       ├── 📄 BookCard.jsx
│       ├── 📄 BookFilters.jsx
│       ├── 📄 BooksContainer.jsx
│       ├── 📄 DeleteEbook.jsx
│       ├── 📄 DeleteUser.jsx
│       ├── 📄 EditProfile.jsx
│       ├── 📄 Footer.jsx
│       ├── 📄 Navbar.jsx
│       ├── 📄 Navlink.jsx
│       ├── 📄 SideNavLink.jsx
│       └── 📄 theme-toggle.jsx
├── 📁 lib
│   ├── 📁 actions
│   │   ├── 📄 ebooks.js
│   │   ├── 📄 payments.js
│   │   └── 📄 user.js
│   ├── 📁 api
│   │   ├── 📄 bookmarks.js
│   │   ├── 📄 ebooks.js
│   │   ├── 📄 payments.js
│   │   └── 📄 users.js
│   ├── 📁 core
│   │   ├── 📄 server.js
│   │   └── 📄 session.js
│   ├── 📁 utilits
│   ├── 📄 auth-client.js
│   ├── 📄 auth.js
│   └── 📄 stripe.js
└── 📄 proxy.js
```

---

## Setup

```bash
git clone <repo-url>
cd fable-client
npm install
cp .env.local.example .env.local
# Fill in your .env.local values
npm run dev
```

## Environment Variables
```
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

## npm Packages Used
- `@heroui/react` — UI component library
- `next` — React framework (App Router)
- `react`, `react-dom` — Core React
- `framer-motion` — Animations
- `recharts` — Charts for admin dashboard
- `react-hot-toast` — Toast notifications
- `next-themes` — Dark mode
- `swiper` — Carousel/slider (hero section)
- `tailwindcss` — Utility-first CSS

