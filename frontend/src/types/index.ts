export interface Movie {
  id: number;
  title: string;
  description: string;
  posterUrl: string;
  backdropUrl?: string;
  releaseYear: number;
  genre: string;
  rating: number;
  trailerUrl?: string;
  cast?: CastMember[];
  similar?: MovieSimilarity[];
  createdAt: string;
  updatedAt: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  image?: string;
  movieId: number;
  createdAt: string;
}

export interface MovieSimilarity {
  id: number;
  movieId: number;
  similarMovieId: number;
  similarMovie: Movie;
  createdAt: string;
}

export interface TVSeries {
  id: number;
  title: string;
  description: string;
  posterUrl: string;
  backdropUrl?: string;
  seasons: number;
  genre: string;
  rating: number;
  tmdbId?: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface WatchHistory {
  id: number;
  userId: number;
  movieId: number;
  movie: Movie;
  watchedAt: string;
}

export interface MyList {
  id: number;
  userId: number;
  movieId: number;
  movie: Movie;
  addedAt: string;
}

export interface SearchFilters {
  q?: string;
  genre?: string;
  year?: number;
  rating?: number;
}

export interface PaginationData {
  page: number;
  limit: number;
  total: number;
  pages: number;
}
