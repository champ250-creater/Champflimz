'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'rw' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    home: 'Home',
    movies: 'Movies',
    tvSeries: 'TV Series',
    genres: 'Genres',
    myList: 'My List',
    search: 'Search movies...',
    login: 'Login',
    signup: 'Sign Up',
    logout: 'Logout',
    profile: 'Profile',
    admin: 'Admin',
    watchNow: 'Watch Now',
    moreInfo: 'More Info',
    trendingNow: 'Trending Now',
    popular: 'Popular',
    topRated: 'Top Rated',
    allMovies: 'All Movies',
    browseCollection: 'Browse our complete movie collection',
    browseGenres: 'Browse Genres',
    exploreByCategory: 'Explore movies by category',
    tvComingSoon: 'TV Series',
    comingSoon: 'Coming Soon',
    workingOn: 'We\'re working on bringing you the best TV series collection',
    notifyMe: 'Notify Me',
    myWatchList: 'My List',
    yourSavedMovies: 'Your saved movies',
    searchResults: 'Search Results for:',
    foundResults: 'Found 5 results',
    adminDash: 'Admin Dashboard',
    totalMovies: 'Total Movies',
    totalUsers: 'Total Users',
    totalWatches: 'Total Watches',
    avgRating: 'Avg Rating',
    addNewMovie: 'Add New Movie',
    movieTitle: 'Movie Title',
    genre: 'Genre',
    releaseYear: 'Release Year',
    rating: 'Rating (0-10)',
    description: 'Description',
    addMovie: 'Add Movie',
    pageNotFound: 'Page Not Found',
    pageNotExist: 'The page you\'re looking for doesn\'t exist.',
    goHome: 'Go Home',
    welcomeBack: 'Welcome Back',
    signIn: 'Sign in to your account',
    email: 'Email',
    password: 'Password',
    dontHaveAccount: 'Don\'t have an account?',
    createOne: 'Create one now',
    joinUs: 'Join Us Today',
    createAccount: 'Create your ChampFlimz account',
    username: 'Username',
    confirmPassword: 'Confirm Password',
    haveAccount: 'Already have an account?',
    signInHere: 'Sign in here',
    quickLinks: 'Quick Links',
    legal: 'Legal',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    cookiePolicy: 'Cookie Policy',
    connect: 'Connect',
    premiumStreaming: 'Premium streaming entertainment at your fingertips.',
  },
  rw: {
    home: 'Ahabanza',
    movies: 'Filime',
    tvSeries: 'Urukurikirane rwa televiziyo',
    genres: 'Ubwoko',
    myList: 'Ishyirahamwe ryanjye',
    search: 'Shakisha filime...',
    login: 'Injira',
    signup: 'kwiyandikisha',
    logout: 'Sohoka',
    profile: 'Umwirondoro',
    admin: 'Umuyobozi',
    watchNow: 'Reba nonaha',
    moreInfo: 'Amakuru Yinyongera',
    trendingNow: 'Izigezweho aka kanya',
    popular: 'Izamamaye',
    topRated: 'Izihabwa amanota menshi',
    allMovies: 'Filime zose',
    browseCollection: 'Reba urahuza filime zose',
    browseGenres: 'Reba ubwoko',
    exploreByCategory: 'Gushakisha  filime ukurikije icyiciro',
    tvComingSoon: 'Urukurikirane rwa televiziyo',
    comingSoon: 'Izigiye kuza vuba',
    workingOn: 'Kubikoraho',
    notifyMe: 'Mumenyeshe',
    myWatchList: 'Izonarebye',
    yourSavedMovies: 'Filime na bitse',
    searchResults: 'Ibisubizo by\'gushaka:',
    foundResults: 'Ibisubizo by bonetse',
    adminDash: 'Irere ry\'Umirikire',
    totalMovies: 'Filime zose',
    totalUsers: 'Abakoreshaji bose',
    totalWatches: 'Ubwiyunge bwose',
    avgRating: 'Igipimo cy\'abakunze',
    addNewMovie: 'Ongeramo filime nshya',
    movieTitle: 'Izina ry\'ifilime',
    genre: 'Ubwoko',
    releaseYear: 'Umwaka w\'iyambura',
    rating: 'Igipimo (0-10)',
    description: 'Ibisobanuro',
    addMovie: 'Ongeramo filime',
    pageNotFound: 'Paji ntabwo yabonetse',
    pageNotExist: 'Paji nabwo ibaho.',
    goHome: 'Garuka mu rugo',
    welcomeBack: 'Murakaza neza',
    signIn: 'Injira mu konte yawe',
    email: 'Imeeli',
    password: 'Ijambo banga',
    dontHaveAccount: 'Nta konte?',
    createOne: 'iyadikishe',
    joinUs: 'Injira hamwe natwe',
    createAccount: 'Kurema konte ya ChampFlimz',
    username: 'Izina ry\'uyikoresha',
    confirmPassword: 'Emeza ijambo banga',
    haveAccount: 'Ufite konte?',
    signInHere: 'Injira hano',
    quickLinks: 'Ihuza vuba',
    legal: 'Amategeko',
    privacyPolicy: 'Amategeko y\'umusiri',
    termsOfService: 'Amahitamo y\'umurage',
    cookiePolicy: 'Amategeko y\'ibisookerwamo',
    connect: 'Kuganirira',
    premiumStreaming: 'Amusaruro yu mbere riri mu mahira yacu.',
  },
  fr: {
    home: 'Accueil',
    movies: 'Films',
    tvSeries: 'Séries TV',
    genres: 'Genres',
    myList: 'Ma Liste',
    search: 'Rechercher des films...',
    login: 'Connexion',
    signup: 'S\'inscrire',
    logout: 'Déconnexion',
    profile: 'Profil',
    admin: 'Admin',
    watchNow: 'Regarder maintenant',
    moreInfo: 'Plus d\'infos',
    trendingNow: 'Tendances',
    popular: 'Populaire',
    topRated: 'Mieux notés',
    allMovies: 'Tous les films',
    browseCollection: 'Parcourez notre collection complète de films',
    browseGenres: 'Parcourir les genres',
    exploreByCategory: 'Explorer les films par catégorie',
    tvComingSoon: 'Séries TV',
    comingSoon: 'À venir',
    workingOn: 'Nous travaillons pour vous apporter la meilleure collection de séries TV',
    notifyMe: 'Me notifier',
    myWatchList: 'Ma Liste',
    yourSavedMovies: 'Vos films enregistrés',
    searchResults: 'Résultats de recherche pour:',
    foundResults: '5 résultats trouvés',
    adminDash: 'Tableau de bord administrateur',
    totalMovies: 'Films totaux',
    totalUsers: 'Utilisateurs totaux',
    totalWatches: 'Vues totales',
    avgRating: 'Note moyenne',
    addNewMovie: 'Ajouter un nouveau film',
    movieTitle: 'Titre du film',
    genre: 'Genre',
    releaseYear: 'Année de sortie',
    rating: 'Évaluation (0-10)',
    description: 'Description',
    addMovie: 'Ajouter un film',
    pageNotFound: 'Page non trouvée',
    pageNotExist: 'La page que vous recherchez n\'existe pas.',
    goHome: 'Aller à l\'accueil',
    welcomeBack: 'Bienvenue',
    signIn: 'Connectez-vous à votre compte',
    email: 'E-mail',
    password: 'Mot de passe',
    dontHaveAccount: 'Pas encore de compte?',
    createOne: 'En créer un maintenant',
    joinUs: 'Rejoignez-nous aujourd\'hui',
    createAccount: 'Créer votre compte ChampFlimz',
    username: 'Nom d\'utilisateur',
    confirmPassword: 'Confirmer le mot de passe',
    haveAccount: 'Vous avez déjà un compte?',
    signInHere: 'Connectez-vous ici',
    quickLinks: 'Liens rapides',
    legal: 'Juridique',
    privacyPolicy: 'Politique de confidentialité',
    termsOfService: 'Conditions d\'utilisation',
    cookiePolicy: 'Politique en matière de cookies',
    connect: 'Connecter',
    premiumStreaming: 'Divertissement en streaming premium à portée de main.',
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language | null;
    if (savedLanguage && ['en', 'rw', 'fr'].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function useTranslation() {
  const { language } = useLanguage();
  return translations[language];
}

export type { Language };
