# ChampFlimz - Premium Movie Streaming Platform

🎬 A modern, full-stack movie and TV streaming discovery platform built with cutting-edge technologies.

## Features

### 🎯 Core Features
- **Home Page** - Hero slider, trending movies, popular collections, recently added
- **Movie Discovery** - Browse, search, filter by genre, year, and rating
- **Movie Details** - Full movie information, cast, trailers, similar recommendations
- **Authentication** - Secure JWT-based user registration and login
- **My List** - Save favorite movies for later viewing
- **Watch History** - Track recently watched content
- **Admin Dashboard** - Manage movies, users, and view analytics

### 🎨 Design & UX
- Netflix-inspired premium interface
- Modern glassmorphism effects
- Smooth animations with Framer Motion
- Fully responsive (mobile, tablet, desktop, ultra-wide)
- Dark theme optimized for viewing
- Professional color palette with gradients

### ⚙️ Technical Features
- Server-side rendering for SEO
- Image optimization and lazy loading
- Infinite scroll pagination
- Real-time search suggestions
- API rate limiting and security
- Database relationships and constraints

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Axios** - HTTP client
- **React Context API** - State management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **PostgreSQL** - Relational database
- **Prisma ORM** - Database ORM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Project Structure

```
ChampFlimz/
├── frontend/                 # Next.js frontend app
│   ├── src/
│   │   ├── app/             # Pages and layouts
│   │   │   ├── (auth)/      # Auth pages (login, register)
│   │   │   ├── (main)/      # Main pages
│   │   │   ├── api/         # API routes
│   │   │   ├── globals.css  # Global styles
│   │   │   └── layout.tsx   # Root layout
│   │   ├── components/      # React components
│   │   │   ├── auth/        # Auth forms
│   │   │   ├── common/      # Header, Footer
│   │   │   ├── home/        # Home page components
│   │   │   └── movie/       # Movie cards, grids
│   │   ├── context/         # React Context (Auth)
│   │   ├── hooks/           # Custom hooks
│   │   ├── lib/             # Utilities (API client)
│   │   ├── types/           # TypeScript types
│   │   └── public/          # Static assets
│   ├── tailwind.config.ts   # Tailwind configuration
│   ├── next.config.js       # Next.js configuration
│   └── package.json         # Dependencies
│
├── backend/                  # Express backend API
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Auth, error handling
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── types/           # TypeScript types
│   │   ├── utils/           # Utilities
│   │   ├── seed.ts          # Database seeding
│   │   └── index.ts         # Express app setup
│   ├── prisma/
│   │   └── schema.prisma    # Database schema
│   ├── tsconfig.json        # TypeScript config
│   └── package.json         # Dependencies
│
└── docs/                     # Documentation
    ├── API.md                # API documentation
    ├── SETUP.md              # Setup guide
    └── DEPLOYMENT.md         # Deployment guide
```

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 13+
- npm or yarn

### Frontend Setup

1. **Install dependencies**
```bash
cd frontend
npm install
```

2. **Configure environment**
```bash
cp .env.example .env.local
# Edit .env.local with your API URL
```

3. **Run development server**
```bash
npm run dev
```

Visit `http://localhost:3000`

### Backend Setup

1. **Install dependencies**
```bash
cd backend
npm install
```

2. **Configure environment**
```bash
cp .env.example .env
# Edit .env with your database credentials and JWT secret
```

3. **Setup database**
```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed sample data
npm run prisma:seed
```

4. **Run development server**
```bash
npm run dev
```

Server runs on `http://localhost:5000`

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Movie Endpoints
- `GET /api/movies` - Get all movies (paginated)
- `GET /api/movies/trending` - Get trending movies
- `GET /api/movies/popular` - Get popular movies
- `GET /api/movies/:id` - Get movie details
- `GET /api/movies/continue-watching` - Get watch history

### Search Endpoints
- `GET /api/search/movies` - Search movies with filters
- `GET /api/search/suggestions` - Get search suggestions
- `GET /api/search/genres` - Get all genres

### User Endpoints
- `GET /api/users/profile` - Get user profile
- `POST /api/users/my-list` - Add to my list
- `DELETE /api/users/my-list` - Remove from my list
- `GET /api/users/my-list` - Get my list

### Admin Endpoints
- `POST /api/admin/movies` - Create movie
- `PUT /api/admin/movies/:id` - Update movie
- `DELETE /api/admin/movies/:id` - Delete movie
- `GET /api/admin/analytics` - Get analytics
- `GET /api/admin/users` - Get all users

## Database Schema

### Users Table
```sql
- id (PK)
- username (UNIQUE)
- email (UNIQUE)
- password (hashed)
- role (admin/user)
- createdAt
- updatedAt
```

### Movies Table
```sql
- id (PK)
- title
- description
- posterUrl
- backdropUrl
- releaseYear
- genre
- rating
- trailerUrl
- tmdbId (UNIQUE, optional)
- createdAt
- updatedAt
```

### TVSeries Table
```sql
- id (PK)
- title
- description
- posterUrl
- seasons
- genre
- rating
- createdAt
- updatedAt
```

### WatchHistory Table
```sql
- id (PK)
- userId (FK)
- movieId (FK)
- watchedAt
- UNIQUE(userId, movieId)
```

### MyList Table
```sql
- id (PK)
- userId (FK)
- movieId (FK)
- addedAt
- UNIQUE(userId, movieId)
```

## Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Primary | #00D4FF | CTAs, buttons, highlights |
| Secondary | #7B61FF | Gradients, hover effects |
| Accent | #FF4D6D | Alerts, ratings |
| Background | #0B1020 | Main background |
| Card | #151A2E | Card backgrounds |
| Text | #FFFFFF | Primary text |
| Muted | #9CA3AF | Secondary text |

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/champflimz
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
TMDB_API_KEY=your_tmdb_key
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=ChampFlimz
```

## Performance Optimizations

- ✅ Image optimization with Next.js Image component
- ✅ Server-side rendering for better SEO
- ✅ Lazy loading for images and components
- ✅ Code splitting and dynamic imports
- ✅ CSS-in-JS with Tailwind for minimal bundle
- ✅ Database query optimization with Prisma
- ✅ API rate limiting
- ✅ Caching strategies

## Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcryptjs
- ✅ CORS protection
- ✅ SQL injection prevention (Prisma ORM)
- ✅ XSS protection (React escaping)
- ✅ CSRF protection (token validation)
- ✅ Environment variable management
- ✅ Input validation and sanitization

## Deployment

### Frontend (Vercel)
```bash
# Push to GitHub
git push

# Connect to Vercel
# Vercel automatically deploys on push
# Set environment variables in Vercel dashboard
```

### Backend (Heroku)
```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
heroku create champflimz-api

# Set environment variables
heroku config:set DATABASE_URL=...
heroku config:set JWT_SECRET=...

# Deploy
git push heroku main

# Run migrations
heroku run npm run prisma:migrate
```

## Testing

```bash
# Backend tests
cd backend
npm run test

# Frontend tests
cd frontend
npm run test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@champflimz.com or open an issue on GitHub.

## Roadmap

- [ ] Social features (comments, ratings)
- [ ] Personalized recommendations
- [ ] Download for offline viewing
- [ ] Multi-profile support
- [ ] Live chat support
- [ ] Mobile apps (iOS/Android)
- [ ] 4K streaming support
- [ ] Subtitle support in multiple languages

## Acknowledgments

- Inspired by Netflix UI/UX
- Built with ❤️ for movie lovers
- Special thanks to the open-source community
