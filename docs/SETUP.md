# ChampFlimz - Complete Setup Guide

Complete step-by-step instructions for setting up the ChampFlimz streaming platform locally.

## Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (version 18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **PostgreSQL** (version 13 or higher) - [Download](https://www.postgresql.org/)
- **Git** - [Download](https://git-scm.com/)
- **VS Code** or any code editor - [Download](https://code.visualstudio.com/)

Verify installations:
```bash
node --version      # Should be v18+
npm --version       # Should be 8+
psql --version      # Should be 13+
git --version       # Any recent version
```

---

## Step 1: Clone the Repository

```bash
# Navigate to your projects folder
cd ~/projects

# Clone the repository
git clone https://github.com/yourusername/champflimz.git

# Navigate into the project
cd champflimz
```

---

## Step 2: Database Setup

### Create PostgreSQL Database

```bash
# Open PostgreSQL terminal
psql -U postgres

# Create database
CREATE DATABASE champflimz;

# Create user (optional, for security)
CREATE USER champflimz_user WITH PASSWORD 'secure_password_123';

# Grant privileges
ALTER ROLE champflimz_user WITH PASSWORD 'secure_password_123';
GRANT ALL PRIVILEGES ON DATABASE champflimz TO champflimz_user;

# Exit
\q
```

### Verify Connection

```bash
# Test connection
psql -U postgres -d champflimz -h localhost
```

---

## Step 3: Backend Setup

### Navigate to Backend Directory

```bash
cd backend
```

### Install Dependencies

```bash
npm install
```

### Create Environment File

```bash
# Copy example env file
cp .env.example .env

# Edit .env with your database credentials
# Mac/Linux:
nano .env
# Or Windows:
# notepad .env
```

**Update these values:**
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/champflimz"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production-min-32-chars"
JWT_EXPIRE="7d"
PORT=5000
NODE_ENV="development"
TMDB_API_KEY="your_tmdb_api_key_here"
FRONTEND_URL="http://localhost:3000"
```

**Get TMDB API Key:**
1. Visit [TMDB API](https://www.themoviedb.org/settings/api)
2. Sign up or log in
3. Request an API key
4. Copy the key to `.env`

### Initialize Database

```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database with sample data
npm run prisma:seed
```

**Expected Output:**
```
✅ Admin user created: admin@champflimz.com
✅ Sample user created: user@champflimz.com
✅ Movie created: Cosmic Odyssey
✅ Movie created: The Last Detective
...
🎬 Database seeding completed!
```

### Run Backend Server

```bash
npm run dev
```

**Expected Output:**
```
🎬 ChampFlimz server running on http://localhost:5000
```

### Test Backend

Open another terminal:
```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Expected response:
# {"status":"OK","timestamp":"2024-01-15T10:30:00Z"}
```

---

## Step 4: Frontend Setup

### Navigate to Frontend Directory

Open a new terminal window:

```bash
cd frontend
```

### Install Dependencies

```bash
npm install
```

### Create Environment File

```bash
# Copy example env file
cp .env.example .env.local

# Edit .env.local
# Mac/Linux:
nano .env.local
# Or Windows:
# notepad .env.local
```

**Update these values:**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=ChampFlimz
```

### Run Frontend Server

```bash
npm run dev
```

**Expected Output:**
```
Local:        http://localhost:3000
```

---

## Step 5: Verify Everything

### Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

You should see:
- ✅ ChampFlimz logo and hero slider
- ✅ Movie cards with images
- ✅ Navigation menu
- ✅ Search functionality

### Test Authentication

#### Register
1. Click "Sign Up" button
2. Fill in username, email, password
3. Click "Create Account"
4. Should redirect to home page

**Test Account:**
```
Email: testuser@example.com
Password: testpass123
```

#### Login
1. Click "Logout" (if already logged in)
2. Click "Login" button
3. Use credentials:
   ```
   Email: user@champflimz.com
   Password: user123
   ```
4. Should redirect to home page

#### Admin Login
1. Click "Logout"
2. Click "Login"
3. Use admin credentials:
   ```
   Email: admin@champflimz.com
   Password: admin123
   ```
4. Click "Admin" in header to access dashboard

### Test Features

#### Search
1. Click search bar
2. Type "dragon" or "cosmic"
3. Results should appear

#### Movie Details
1. Click any movie card
2. View full details, cast, rating
3. Click "Add to My List"

#### My List
1. Click "My List" in header (after login)
2. Should see saved movies

#### Admin Dashboard
1. Login as admin
2. Click "Admin" in header
3. View analytics
4. See option to add movies

---

## Step 6: Database Management

### View Database

```bash
# Connect to database
psql -U postgres -d champflimz

# List tables
\dt

# View users
SELECT id, username, email, role FROM "User";

# View movies
SELECT id, title, release_year, rating FROM "Movie" LIMIT 10;

# Exit
\q
```

### Prisma Studio (UI for Database)

```bash
cd backend
npm run prisma:studio
```

Opens interactive database UI at `http://localhost:5555`

### Reset Database

```bash
cd backend

# WARNING: This deletes all data!
# Generate new schema
npm run prisma:generate

# Reset database
npx prisma db push --force-reset

# Reseed data
npm run prisma:seed
```

---

## Step 7: API Testing

### Using cURL

```bash
# Get all movies
curl http://localhost:5000/api/movies

# Search movies
curl "http://localhost:5000/api/search/movies?q=dragon"

# Get genres
curl http://localhost:5000/api/search/genres

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Using Postman

1. Download [Postman](https://www.postman.com/downloads/)
2. Import requests from `docs/postman_collection.json` (if available)
3. Test all endpoints

---

## Troubleshooting

### Database Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solution:**
```bash
# Check if PostgreSQL is running
# Mac:
brew services list | grep postgres
# Start if needed:
brew services start postgresql

# Windows:
# Check Services app or run:
pg_ctlcluster 13 main start

# Linux:
sudo systemctl status postgresql
sudo systemctl start postgresql
```

### Port Already in Use

```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**
```bash
# Kill process using port 5000
# Mac/Linux:
lsof -i :5000
kill -9 <PID>

# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change port in .env
PORT=5001
```

### Module Not Found

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Prisma Client Error

```bash
# Regenerate Prisma client
cd backend
npm run prisma:generate
```

### Seed Data Not Appearing

```bash
# Clear database and reseed
cd backend
npx prisma db push --force-reset
npm run prisma:seed
```

### Frontend Not Loading

```bash
# Clear Next.js cache
cd frontend
rm -rf .next
npm run dev
```

---

## Development Tips

### Hot Reload
- **Frontend:** Automatically reloads on file changes
- **Backend:** Uses `tsx watch` for automatic restart

### Code Style
- **Prettier:** Auto-format code on save
- **ESLint:** Catches potential issues

### Performance
- Open DevTools (F12) → Performance tab
- Check Network tab for API calls
- Use Lighthouse for audits

### Debugging

**Frontend:**
```bash
# Add console logs
console.log('Debug:', value);

# Use React DevTools browser extension
# Use VS Code debugger
```

**Backend:**
```bash
# Add logs
console.log('Debug:', value);

# Run with debugger
node --inspect src/index.ts
```

---

## Common Commands

### Backend
```bash
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server
npm run prisma:migrate   # Create migration
npm run prisma:studio    # Open Prisma Studio
npm run prisma:seed      # Seed database
npm run lint             # Run ESLint
```

### Frontend
```bash
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Run ESLint
```

---

## Next Steps

1. **Customize** - Update colors, fonts, content
2. **Add Features** - Social login, comments, ratings
3. **Integrate TMDB** - Use real movie data
4. **Deploy** - Follow deployment guide
5. **Scale** - Add caching, CDN, load balancing

---

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

---

## Support

Need help? 
- Check the troubleshooting section
- Review API documentation
- Check GitHub issues
- Contact: support@champflimz.com

Happy coding! 🎬
