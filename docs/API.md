# ChampFlimz API Documentation

Complete REST API documentation for the ChampFlimz streaming platform backend.

## Base URL

```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer {token}
```

## Error Responses

All error responses follow this format:

```json
{
  "error": "Error message describing what went wrong"
}
```

HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error

---

## Auth Endpoints

### Register User
Create a new user account.

```
POST /auth/register
```

**Request Body:**
```json
{
  "username": "moviefan123",
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:** `201 Created`
```json
{
  "user": {
    "id": 1,
    "username": "moviefan123",
    "email": "user@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Errors:**
- `400` - Missing required fields
- `409` - User already exists

---

### Login User
Authenticate and get JWT token.

```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:** `200 OK`
```json
{
  "user": {
    "id": 1,
    "username": "moviefan123",
    "email": "user@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Errors:**
- `400` - Missing email or password
- `401` - Invalid credentials

---

### Logout User
Invalidate current session.

```
POST /auth/logout
```

**Response:** `200 OK`
```json
{
  "message": "Logged out successfully"
}
```

---

## Movie Endpoints

### Get All Movies
Retrieve paginated list of movies.

```
GET /movies
```

**Query Parameters:**
- `page` (optional) - Page number (default: 1)
- `limit` (optional) - Items per page (default: 20)

**Response:** `200 OK`
```json
{
  "data": [
    {
      "id": 1,
      "title": "Cosmic Odyssey",
      "description": "An epic space adventure...",
      "posterUrl": "https://...",
      "backdropUrl": "https://...",
      "releaseYear": 2024,
      "genre": "Science Fiction, Adventure",
      "rating": 8.5,
      "trailerUrl": "https://youtube.com/...",
      "cast": [...],
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

---

### Get Trending Movies
Retrieve movies sorted by rating.

```
GET /movies/trending
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Dragon's Throne",
    "rating": 8.9,
    ...
  }
]
```

---

### Get Popular Movies
Retrieve recently added movies.

```
GET /movies/popular
```

**Response:** `200 OK`
```json
[...]
```

---

### Get Movie by ID
Retrieve detailed information about a specific movie.

```
GET /movies/:id
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "Cosmic Odyssey",
  "description": "...",
  "posterUrl": "...",
  "releaseYear": 2024,
  "genre": "Science Fiction",
  "rating": 8.5,
  "cast": [
    {
      "id": 1,
      "name": "Emma Stone",
      "character": "Captain Sarah",
      "image": "https://..."
    }
  ],
  "similar": [
    {
      "id": 2,
      "similarMovie": {
        "id": 3,
        "title": "Space Explorer"
      }
    }
  ]
}
```

**Side Effects:**
- Records watch history for authenticated users

**Errors:**
- `404` - Movie not found

---

### Get Continue Watching
Retrieve user's watch history (requires auth).

```
GET /movies/continue-watching
```

**Headers:**
```
Authorization: Bearer {token}
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Movie Title",
    "posterUrl": "...",
    "watchedAt": "2024-01-15T10:30:00Z"
  }
]
```

**Errors:**
- `401` - Authentication required

---

## Search Endpoints

### Search Movies
Search and filter movies.

```
GET /search/movies
```

**Query Parameters:**
- `q` (optional) - Search query
- `genre` (optional) - Filter by genre
- `year` (optional) - Filter by release year
- `rating` (optional) - Minimum rating filter

**Examples:**
```
/search/movies?q=dragon
/search/movies?genre=Science%20Fiction&rating=8
/search/movies?year=2024
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Dragon's Throne",
    "rating": 8.9,
    ...
  }
]
```

---

### Get Search Suggestions
Auto-complete search suggestions.

```
GET /search/suggestions
```

**Query Parameters:**
- `q` (required) - Query string (minimum 2 characters)

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Dragon's Throne"
  },
  {
    "id": 2,
    "title": "Dragon Age"
  }
]
```

---

### Get All Genres
Retrieve available movie genres.

```
GET /search/genres
```

**Response:** `200 OK`
```json
[
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Drama",
  "Fantasy",
  "Horror",
  "Romance",
  "Science Fiction",
  "Thriller"
]
```

---

## User Endpoints

### Get Profile
Retrieve current user's profile (requires auth).

```
GET /users/profile
```

**Headers:**
```
Authorization: Bearer {token}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "username": "moviefan123",
  "email": "user@example.com",
  "role": "user",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

**Errors:**
- `401` - Authentication required
- `404` - User not found

---

### Add to My List
Add movie to user's watchlist (requires auth).

```
POST /users/my-list
```

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "movieId": 1
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "userId": 1,
  "movieId": 1,
  "addedAt": "2024-01-15T10:30:00Z"
}
```

**Errors:**
- `401` - Authentication required

---

### Remove from My List
Remove movie from watchlist (requires auth).

```
DELETE /users/my-list
```

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "movieId": 1
}
```

**Response:** `200 OK`
```json
{
  "message": "Removed from list"
}
```

---

### Get My List
Retrieve user's watchlist (requires auth).

```
GET /users/my-list
```

**Headers:**
```
Authorization: Bearer {token}
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Cosmic Odyssey",
    "posterUrl": "...",
    "rating": 8.5,
    ...
  }
]
```

---

## Admin Endpoints

All admin endpoints require authentication with admin role.

### Add Movie
Create a new movie entry.

```
POST /admin/movies
```

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Request Body:**
```json
{
  "title": "New Movie",
  "description": "Movie description...",
  "posterUrl": "https://...",
  "backdropUrl": "https://...",
  "releaseYear": 2024,
  "genre": "Action, Adventure",
  "rating": 8.5,
  "trailerUrl": "https://youtube.com/...",
  "cast": [
    {
      "name": "Actor Name",
      "character": "Character Name",
      "image": "https://..."
    }
  ]
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "title": "New Movie",
  ...
}
```

**Errors:**
- `400` - Missing required fields
- `403` - Admin access required

---

### Update Movie
Modify movie details.

```
PUT /admin/movies/:id
```

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Request Body:**
```json
{
  "title": "Updated Title",
  "rating": 8.7,
  ...
}
```

**Response:** `200 OK`

---

### Delete Movie
Remove a movie from database.

```
DELETE /admin/movies/:id
```

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Response:** `200 OK`
```json
{
  "message": "Movie deleted successfully"
}
```

---

### Get Analytics
Retrieve platform analytics (admin only).

```
GET /admin/analytics
```

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Response:** `200 OK`
```json
{
  "totalMovies": 150,
  "totalUsers": 5000,
  "totalWatches": 25000,
  "averageRating": 8.2
}
```

---

### Get All Users
Retrieve list of all users (admin only).

```
GET /admin/users
```

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "username": "moviefan123",
    "email": "user@example.com",
    "role": "user",
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

---

## Rate Limiting

API implements rate limiting to prevent abuse:
- 100 requests per 15 minutes per IP
- 1000 requests per hour per API key

---

## Best Practices

1. **Authentication**
   - Store JWT tokens securely
   - Use HTTPS in production
   - Refresh tokens periodically

2. **Pagination**
   - Use page and limit parameters
   - Default limit is 20, max is 100

3. **Error Handling**
   - Check HTTP status codes
   - Handle errors gracefully
   - Log errors for debugging

4. **Performance**
   - Cache responses when possible
   - Use pagination for large datasets
   - Batch requests when appropriate

---

## Health Check

```
GET /health
```

**Response:** `200 OK`
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

## Support

For API questions or issues, please contact support@champflimz.com
