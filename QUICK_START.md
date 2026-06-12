# ChampFlimz - Quick Start Guide

Get up and running in 10 minutes!

## Prerequisites

- Node.js 18+
- PostgreSQL 13+
- Git
- Code editor (VS Code recommended)

## 🚀 5-Minute Setup

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/champflimz.git
cd champflimz
```

### 2. Backend Setup (Terminal 1)
```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with:
# DATABASE_URL=postgresql://postgres:password@localhost:5432/champflimz

# Initialize database
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed

# Start backend
npm run dev
```

Backend runs on: `http://localhost:5000`

### 3. Frontend Setup (Terminal 2)
```bash
cd frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Start frontend
npm run dev
```

Frontend runs on: `http://localhost:3000`

### 4. Access Application
Open browser: `http://localhost:3000`

### 5. Test Login
**User credentials:**
```
Email: user@champflimz.com
Password: user123
```

**Admin credentials:**
```
Email: admin@champflimz.com
Password: admin123
```

---

## 🎯 What's Included

✅ Complete full-stack application
✅ User authentication with JWT
✅ 10+ sample movies pre-loaded
✅ Admin dashboard
✅ Search & filtering
✅ My List feature
✅ Watch history tracking
✅ Responsive design
✅ Production-ready code
✅ Comprehensive documentation

---

## 📁 Project Structure

```
champflimz/
├── frontend/              # Next.js 15 app
│   ├── src/
│   │   ├── app/          # Pages & layouts
│   │   ├── components/   # Reusable components
│   │   ├── context/      # Auth context
│   │   ├── hooks/        # Custom hooks
│   │   └── types/        # TypeScript types
│   └── package.json
│
├── backend/               # Express.js API
│   ├── src/
│   │   ├── controllers/  # Business logic
│   │   ├── routes/       # API endpoints
│   │   ├── middleware/   # Auth, validation
│   │   └── seed.ts       # Sample data
│   ├── prisma/           # Database schema
│   └── package.json
│
└── docs/                  # Documentation
    ├── API.md
    ├── SETUP.md
    ├── DEPLOYMENT.md
    └── ARCHITECTURE.md
```

---

## 🔐 Authentication

### Register
```
Click "Sign Up" → Fill form → Create Account
```

### Login
```
Click "Login" → Enter credentials → Access dashboard
```

### Logout
```
Click user menu → Click "Logout"
```

---

## 🎬 Features

### Home Page
- Auto-playing hero slider
- Trending movies
- Popular movies
- Latest releases
- Continue watching

### Search
- Real-time search
- Filter by genre, year, rating
- Search suggestions
- Browse all genres

### Movie Details
- Full movie information
- Cast members
- Trailer embed
- Similar movies
- Add to My List

### My List
- Save favorite movies
- View saved collection
- Remove from list

### Admin Dashboard
- View analytics
- Add/edit/delete movies
- Manage users
- Platform statistics

---

## 🔧 Common Commands

### Backend
```bash
npm run dev              # Start development
npm run build            # Build for production
npm start                # Run production build
npm run prisma:studio    # Open database UI
npm run prisma:seed      # Seed sample data
```

### Frontend
```bash
npm run dev              # Start development
npm run build            # Build for production
npm start                # Run production build
npm run lint             # Run linter
```

---

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout

### Movies
- `GET /api/movies` - List movies
- `GET /api/movies/trending` - Trending
- `GET /api/movies/:id` - Movie details
- `GET /search/movies` - Search

### User
- `GET /api/users/profile` - Profile
- `GET /api/users/my-list` - My list
- `POST /api/users/my-list` - Add to list
- `DELETE /api/users/my-list` - Remove from list

### Admin
- `POST /api/admin/movies` - Add movie
- `PUT /api/admin/movies/:id` - Edit movie
- `DELETE /api/admin/movies/:id` - Delete movie
- `GET /api/admin/analytics` - Analytics

---

## 🎨 Design System

### Colors
- **Primary:** #00D4FF (cyan)
- **Secondary:** #7B61FF (purple)
- **Accent:** #FF4D6D (red)
- **Background:** #0B1020 (dark blue)

### Components
- Professional movie cards
- Smooth animations (Framer Motion)
- Responsive grid layout
- Modern glassmorphism effects

---

## 🚨 Troubleshooting

### Database Connection Error
```bash
# Make sure PostgreSQL is running
# Update DATABASE_URL in .env
# Run: npm run prisma:migrate
```

### Port Already in Use
```bash
# Kill process or change PORT in .env
# Backend default: 5000
# Frontend default: 3000
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Movies Not Showing
```bash
# Reseed database
cd backend
npm run prisma:seed
```

---

## 📚 Full Documentation

- **[README.md](README.md)** - Project overview
- **[Setup Guide](docs/SETUP.md)** - Detailed setup
- **[API Documentation](docs/API.md)** - API reference
- **[Deployment Guide](docs/DEPLOYMENT.md)** - Production deployment
- **[Architecture](docs/ARCHITECTURE.md)** - System design
- **[Feature Checklist](FEATURE_CHECKLIST.md)** - Complete features

---

## 🎯 Next Steps

1. **Explore the app** - Click around, test features
2. **Try admin features** - Login as admin to manage content
3. **Test search** - Search for movies (try "dragon" or "cosmic")
4. **Read documentation** - Check docs/ folder for details
5. **Customize** - Update colors, content, features
6. **Deploy** - Follow deployment guide for production

---

## 💡 Tips

- Movies load from database (seeded with sample data)
- Click any movie card to see full details
- Use "Add to My List" to save favorites
- Search results can be filtered by genre, year, rating
- Admin can add, edit, delete movies
- Watch history tracked automatically for logged-in users

---

## 🆘 Need Help?

1. Check **[docs/SETUP.md](docs/SETUP.md)** for detailed setup
2. Review **[docs/API.md](docs/API.md)** for API details
3. Check **Troubleshooting** section above
4. Contact: support@champflimz.com

---

## 📋 Project Status

✅ **MVP Complete**
- Production-ready code
- All core features implemented
- Fully documented
- Security hardened
- Performance optimized

🚀 **Ready for Launch**
- Deploy to production
- Scale as needed
- Add more features
- Gather user feedback

---

**Happy Building! 🎬**

Last Updated: January 2024
Version: 1.0.0
