# ChampFlimz - Architecture Document

## System Overview

ChampFlimz is a full-stack, modern streaming platform built with microservices principles, following industry best practices for scalability, security, and user experience.

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Client (Browser)                        │
└────────────────────────┬──────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Frontend Layer (Next.js 15)                    │
├─────────────────────────────────────────────────────────────┤
│  • Server-side Rendering (SSR)                             │
│  • Client-side Hydration                                    │
│  • Image Optimization                                       │
│  • Static Generation (ISG)                                  │
└────────────┬──────────────────────────────┬─────────────────┘
             │                              │
             │ HTTPS                        │ Socket.io
             ▼                              ▼
    ┌─────────────────────────────────────────────────┐
    │         API Gateway / Load Balancer             │
    │              (Railway/Vercel)                   │
    └─────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│              Backend Layer (Express.js)                     │
├─────────────────────────────────────────────────────────────┤
│  Authentication Service                                     │
│  ├─ User Registration                                       │
│  ├─ User Login (JWT)                                        │
│  └─ Session Management                                      │
│                                                              │
│  Movie Service                                              │
│  ├─ Movie Listing                                           │
│  ├─ Movie Details                                           │
│  ├─ Search & Filtering                                      │
│  └─ Recommendations                                         │
│                                                              │
│  User Service                                               │
│  ├─ Profile Management                                      │
│  ├─ Watch History                                           │
│  └─ My List                                                 │
│                                                              │
│  Admin Service                                              │
│  ├─ Movie Management (CRUD)                                 │
│  ├─ User Management                                         │
│  └─ Analytics                                               │
│                                                              │
│  Middleware Layer                                           │
│  ├─ Authentication (JWT)                                    │
│  ├─ Authorization (Role-based)                              │
│  ├─ Error Handling                                          │
│  ├─ Request Validation                                      │
│  └─ Rate Limiting                                           │
└────────────┬─────────────────────────────┬──────────────────┘
             │                             │
             │                             │ Event Stream
             ▼                             ▼
┌──────────────────────────────────────────────────────────────┐
│                   Data Layer                                 │
├──────────────────────────────────────────────────────────────┤
│  PostgreSQL Database (AWS RDS)                              │
│  ├─ Users Table                                             │
│  ├─ Movies Table                                            │
│  ├─ TVSeries Table                                          │
│  ├─ WatchHistory Table                                      │
│  ├─ MyList Table                                            │
│  └─ CastMembers, MovieSimilarity Tables                    │
│                                                              │
│  Caching Layer (Redis)                                      │
│  ├─ Session Cache                                           │
│  ├─ Movie Data Cache                                        │
│  └─ Search Results Cache                                    │
│                                                              │
│  File Storage (AWS S3/CloudFront)                          │
│  ├─ Movie Posters                                           │
│  ├─ Backdrop Images                                         │
│  └─ User Avatars                                            │
└──────────────────────────────────────────────────────────────┘
```

---

## Component Architecture

### Frontend Components Hierarchy

```
App (layout.tsx)
├── AuthProvider
├── Header
│   ├── Logo
│   ├── Navigation
│   ├── SearchBar
│   └── UserMenu
├── Router
│   ├── (main)
│   │   ├── Home (/)
│   │   │   ├── HeroSlider
│   │   │   └── MovieGrid (multiple sections)
│   │   ├── Movies (/movies)
│   │   │   └── MovieGrid with Pagination
│   │   ├── Search (/search)
│   │   │   ├── SearchFilters
│   │   │   └── MovieGrid
│   │   ├── Movie Details (/movie/[id])
│   │   │   ├── BackdropImage
│   │   │   ├── MovieInfo
│   │   │   ├── CastList
│   │   │   ├── TrailerSection
│   │   │   └── SimilarMovies
│   │   ├── My List (/my-list)
│   │   ├── Genres (/genres)
│   │   ├── TV (/tv)
│   │   └── Admin (/admin)
│   │       ├── Analytics Cards
│   │       ├── Add Movie Form
│   │       └── Movie List
│   └── (auth)
│       ├── Login
│       │   └── LoginForm
│       └── Register
│           └── RegisterForm
├── Footer
└── ErrorBoundary
```

---

## Data Flow

### Authentication Flow

```
User Input (Email, Password)
           ↓
      Frontend Validation
           ↓
    API Call (Axios)
      POST /auth/login
           ↓
   Backend Authentication
   ├─ Find User
   ├─ Verify Password (bcrypt)
   ├─ Generate JWT Token
   └─ Return User + Token
           ↓
  Frontend stores Token
    (localStorage/cookies)
           ↓
  Set Authorization Header
    for future requests
           ↓
    Redirect to Dashboard
```

### Movie Discovery Flow

```
User Actions
  ↓
Frontend Request
  ├─ Browse: GET /movies?page=1
  ├─ Trending: GET /movies/trending
  ├─ Search: GET /search/movies?q=term
  └─ Details: GET /movies/:id
  ↓
Backend Processing
  ├─ Prisma Query
  ├─ Database Fetch
  ├─ Cache Check
  └─ Response Format
  ↓
Frontend Display
  ├─ MovieCard Component
  ├─ MovieGrid Component
  ├─ Animations (Framer Motion)
  └─ Error Handling
```

### Watch History Flow

```
User watches movie
      ↓
GET /movies/:id endpoint
      ↓
Check if user authenticated
      ↓
Upsert WatchHistory record
  ├─ userId
  ├─ movieId
  └─ watchedAt (current timestamp)
      ↓
Frontend records completed
      ↓
User can retrieve via
GET /movies/continue-watching
```

---

## Database Schema

### Entity Relationship Diagram

```
User (1) ──→ (Many) WatchHistory
    │
    └─→ (Many) MyList

Movie (1) ──→ (Many) WatchHistory
    │
    ├─→ (Many) MyList
    │
    ├─→ (Many) CastMember
    │
    └─→ (Many) MovieSimilarity

TVSeries (1) ──→ (Many) Episodes (future)

CastMember (Many) ──→ (1) Movie
```

### Core Tables

**User**
- id: INT (PK, AI)
- username: VARCHAR(255, UNIQUE)
- email: VARCHAR(255, UNIQUE)
- password: VARCHAR(255, HASHED)
- role: ENUM('user', 'admin')
- createdAt: TIMESTAMP
- updatedAt: TIMESTAMP

**Movie**
- id: INT (PK, AI)
- title: VARCHAR(255)
- description: TEXT
- posterUrl: VARCHAR(500)
- backdropUrl: VARCHAR(500)
- releaseYear: INT
- genre: VARCHAR(255)
- rating: FLOAT (0-10)
- trailerUrl: VARCHAR(500)
- tmdbId: INT (UNIQUE, NULL)
- createdAt: TIMESTAMP
- updatedAt: TIMESTAMP

**WatchHistory**
- id: INT (PK, AI)
- userId: INT (FK, users.id)
- movieId: INT (FK, movies.id)
- watchedAt: TIMESTAMP
- UNIQUE(userId, movieId)

**MyList**
- id: INT (PK, AI)
- userId: INT (FK, users.id)
- movieId: INT (FK, movies.id)
- addedAt: TIMESTAMP
- UNIQUE(userId, movieId)

**CastMember**
- id: INT (PK, AI)
- name: VARCHAR(255)
- character: VARCHAR(255)
- image: VARCHAR(500)
- movieId: INT (FK, movies.id)
- createdAt: TIMESTAMP

**MovieSimilarity**
- id: INT (PK, AI)
- movieId: INT (FK, movies.id)
- similarMovieId: INT (FK, movies.id)
- createdAt: TIMESTAMP
- UNIQUE(movieId, similarMovieId)

---

## API Design Patterns

### RESTful Conventions

```
GET    /movies              - List all movies
GET    /movies/:id          - Get movie details
POST   /admin/movies        - Create movie (admin)
PUT    /admin/movies/:id    - Update movie (admin)
DELETE /admin/movies/:id    - Delete movie (admin)

GET    /search/movies       - Search movies
GET    /search/genres       - Get genres

POST   /auth/register       - Register user
POST   /auth/login          - Login user
POST   /auth/logout         - Logout user

GET    /users/profile       - Get user profile
POST   /users/my-list       - Add to list
DELETE /users/my-list       - Remove from list
GET    /users/my-list       - Get my list
```

### Response Format

```json
{
  "status": "success|error",
  "data": {},
  "error": null,
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

---

## Security Architecture

### Authentication & Authorization

```
User Request
    ↓
Token Verification
  ├─ Extract token from header
  ├─ Verify JWT signature
  ├─ Check expiration
  └─ Decode claims
    ↓
Authorization Check
  ├─ Check user role
  ├─ Check resource ownership
  └─ Apply permission rules
    ↓
Request Processing
    ↓
Response
```

### JWT Token Structure

```json
Header: {
  "alg": "HS256",
  "typ": "JWT"
}

Payload: {
  "userId": 1,
  "role": "user|admin",
  "email": "user@example.com",
  "iat": 1704067200,
  "exp": 1704672000
}

Signature: HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret
)
```

### Security Headers

```
Content-Security-Policy: default-src 'self'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Strict-Transport-Security: max-age=31536000
X-XSS-Protection: 1; mode=block
```

---

## Scalability Strategy

### Horizontal Scaling

```
Load Balancer (Railway/Vercel)
        │
        ├─→ API Server 1
        ├─→ API Server 2
        └─→ API Server 3
        
All pointing to:
        │
        ├─→ Shared PostgreSQL (RDS)
        ├─→ Shared Redis Cache
        └─→ Shared S3 Storage
```

### Caching Strategy

```
Request
    ↓
L1: Check Redis Cache
    ├─ Hit? Return cached data
    └─ Miss? Query database
        ↓
    L2: Database Query
        ├─ Get data from PostgreSQL
        ├─ Cache in Redis
        └─ Return to client
```

### Database Optimization

```
Indexes:
  - CREATE INDEX idx_movie_genre ON movie(genre)
  - CREATE INDEX idx_movie_rating ON movie(rating)
  - CREATE INDEX idx_watch_history_user ON watch_history(user_id)

Query Optimization:
  - Use SELECT only needed columns
  - Implement pagination
  - Use Prisma query optimization
  - Monitor slow queries
```

---

## Deployment Architecture

### Production Environment

```
Domain: champflimz.com
    ↓
CDN (Cloudflare)
    ├─ Static Assets
    ├─ Image Optimization
    └─ DDoS Protection
    ↓
Frontend (Vercel Edge)
    ├─ Auto-scaling
    ├─ Geographic distribution
    └─ Automatic deployments
    ↓
Backend API (Railway)
    ├─ Auto-scaling containers
    ├─ Load balancing
    └─ Database connections
    ↓
Database (AWS RDS)
    ├─ Multi-AZ deployment
    ├─ Automated backups
    └─ Read replicas
    ↓
File Storage (AWS S3)
    ├─ Versioning
    ├─ CloudFront distribution
    └─ Lifecycle policies
```

---

## Monitoring & Observability

### Metrics to Track

```
Performance:
  - API response time (p50, p95, p99)
  - Frontend load time
  - Database query time
  - Error rate

Business:
  - Active users
  - Movies watched
  - User registration rate
  - Feature usage

Infrastructure:
  - CPU usage
  - Memory usage
  - Database connections
  - Storage usage
  - Network I/O
```

### Logging Strategy

```
Level: ERROR | WARN | INFO | DEBUG

Format:
{
  "timestamp": "2024-01-15T10:30:00Z",
  "level": "ERROR",
  "service": "auth-service",
  "message": "User login failed",
  "userId": 123,
  "error": "Invalid credentials",
  "stack": "..."
}

Aggregation:
  └─ ELK Stack / CloudWatch
     ├─ Elasticsearch (storage)
     ├─ Logstash (parsing)
     └─ Kibana (visualization)
```

---

## Technology Choices

### Frontend: Next.js 15
- ✅ SSR for SEO
- ✅ Automatic code splitting
- ✅ Image optimization
- ✅ API routes
- ✅ Fast refresh

### Backend: Express.js
- ✅ Lightweight
- ✅ Highly customizable
- ✅ Mature ecosystem
- ✅ Excellent middleware support
- ✅ Easy deployment

### Database: PostgreSQL
- ✅ ACID compliance
- ✅ Complex queries
- ✅ Full-text search
- ✅ JSON support
- ✅ Scalability

### ORM: Prisma
- ✅ Type-safe queries
- ✅ Auto-migrations
- ✅ Developer-friendly
- ✅ Query optimization
- ✅ Prisma Studio

### Styling: Tailwind CSS
- ✅ Utility-first
- ✅ Small bundle size
- ✅ Rapid development
- ✅ Customization
- ✅ Great documentation

### Animations: Framer Motion
- ✅ Smooth transitions
- ✅ GPU-accelerated
- ✅ Simple API
- ✅ Performance optimized
- ✅ Production-ready

---

## Future Enhancements

### Phase 2
- [ ] Real-time chat support
- [ ] User ratings & reviews
- [ ] Personalized recommendations (ML)
- [ ] Social features (follow, share)
- [ ] Email notifications

### Phase 3
- [ ] Mobile apps (React Native)
- [ ] Desktop apps (Electron)
- [ ] Live streaming
- [ ] User-generated content
- [ ] Gamification

### Phase 4
- [ ] Multi-language support
- [ ] Regional pricing
- [ ] Advanced analytics
- [ ] API marketplace
- [ ] White-label solution

---

**Document Version:** 1.0
**Last Updated:** January 2024
**Status:** Production Ready
