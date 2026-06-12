import { PrismaClient } from "@prisma/client";
import { hashPassword } from "./utils/auth.js";

const prisma = new PrismaClient();

const sampleMovies = [
  {
    title: "Cosmic Odyssey",
    description:
      "An epic space adventure following a crew of explorers as they discover a hidden planet with advanced alien civilization.",
    posterUrl: "https://via.placeholder.com/300x450?text=Cosmic+Odyssey",
    backdropUrl: "https://via.placeholder.com/1920x1080?text=Cosmic+Odyssey",
    releaseYear: 2024,
    genre: "Science Fiction, Adventure",
    rating: 8.5,
    trailerUrl: "https://youtube.com/watch?v=example",
  },
  {
    title: "The Last Detective",
    description:
      "A retired detective is drawn back into the world of crime when a mysterious case from his past resurfaces.",
    posterUrl: "https://via.placeholder.com/300x450?text=The+Last+Detective",
    backdropUrl: "https://via.placeholder.com/1920x1080?text=The+Last+Detective",
    releaseYear: 2024,
    genre: "Crime, Mystery, Thriller",
    rating: 7.8,
    trailerUrl: "https://youtube.com/watch?v=example",
  },
  {
    title: "Love in Paris",
    description: "Two strangers meet in Paris and discover an unexpected connection that changes their lives forever.",
    posterUrl: "https://via.placeholder.com/300x450?text=Love+in+Paris",
    backdropUrl: "https://via.placeholder.com/1920x1080?text=Love+in+Paris",
    releaseYear: 2024,
    genre: "Romance, Drama",
    rating: 7.2,
    trailerUrl: "https://youtube.com/watch?v=example",
  },
  {
    title: "Dragon's Throne",
    description: "In a fantasy kingdom, a young warrior must claim the dragon's throne to save her realm from darkness.",
    posterUrl: "https://via.placeholder.com/300x450?text=Dragons+Throne",
    backdropUrl: "https://via.placeholder.com/1920x1080?text=Dragons+Throne",
    releaseYear: 2024,
    genre: "Fantasy, Action, Adventure",
    rating: 8.9,
    trailerUrl: "https://youtube.com/watch?v=example",
  },
  {
    title: "Code Red",
    description: "A cybersecurity expert uncovers a global conspiracy that threatens to bring down the internet.",
    posterUrl: "https://via.placeholder.com/300x450?text=Code+Red",
    backdropUrl: "https://via.placeholder.com/1920x1080?text=Code+Red",
    releaseYear: 2024,
    genre: "Thriller, Science Fiction",
    rating: 8.1,
    trailerUrl: "https://youtube.com/watch?v=example",
  },
  {
    title: "The Forgotten Kingdom",
    description: "An adventure through a lost civilization with treasures and dangers waiting at every turn.",
    posterUrl: "https://via.placeholder.com/300x450?text=Forgotten+Kingdom",
    backdropUrl: "https://via.placeholder.com/1920x1080?text=Forgotten+Kingdom",
    releaseYear: 2023,
    genre: "Adventure, Fantasy",
    rating: 7.5,
    trailerUrl: "https://youtube.com/watch?v=example",
  },
  {
    title: "Midnight Confessions",
    description: "A romantic drama about two artists who meet at a gallery opening and fall in love under the city lights.",
    posterUrl: "https://via.placeholder.com/300x450?text=Midnight+Confessions",
    backdropUrl: "https://via.placeholder.com/1920x1080?text=Midnight+Confessions",
    releaseYear: 2024,
    genre: "Romance, Drama",
    rating: 7.3,
    trailerUrl: "https://youtube.com/watch?v=example",
  },
  {
    title: "The Quantum Experiment",
    description: "Scientists conduct a dangerous experiment that opens a portal to another dimension.",
    posterUrl: "https://via.placeholder.com/300x450?text=Quantum+Experiment",
    backdropUrl: "https://via.placeholder.com/1920x1080?text=Quantum+Experiment",
    releaseYear: 2024,
    genre: "Science Fiction, Horror",
    rating: 8.0,
    trailerUrl: "https://youtube.com/watch?v=example",
  },
  {
    title: "Steel Hearts",
    description: "Two boxing rivals must work together when their lives are threatened by organized crime.",
    posterUrl: "https://via.placeholder.com/300x450?text=Steel+Hearts",
    backdropUrl: "https://via.placeholder.com/1920x1080?text=Steel+Hearts",
    releaseYear: 2023,
    genre: "Action, Drama, Sport",
    rating: 7.6,
    trailerUrl: "https://youtube.com/watch?v=example",
  },
  {
    title: "Echoes of Tomorrow",
    description: "A time traveler must prevent a catastrophic future by changing the present.",
    posterUrl: "https://via.placeholder.com/300x450?text=Echoes+of+Tomorrow",
    backdropUrl: "https://via.placeholder.com/1920x1080?text=Echoes+of+Tomorrow",
    releaseYear: 2024,
    genre: "Science Fiction, Thriller",
    rating: 8.3,
    trailerUrl: "https://youtube.com/watch?v=example",
  },
];

const sampleCast = [
  { name: "Emma Stone", character: "Captain Sarah" },
  { name: "Tom Hardy", character: "Commander Drake" },
  { name: "Oscar Isaac", character: "Detective James" },
  { name: "Timothée Chalamet", character: "Kai" },
  { name: "Zendaya", character: "Elena" },
];

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const adminPassword = await hashPassword("admin123");
  const admin = await prisma.user.upsert({
    where: { email: "admin@champflimz.com" },
    update: {},
    create: {
      username: "admin",
      email: "admin@champflimz.com",
      password: adminPassword,
      role: "admin",
    },
  });

  console.log("✅ Admin user created:", admin.email);

  // Create sample user
  const userPassword = await hashPassword("user123");
  const user = await prisma.user.upsert({
    where: { email: "user@champflimz.com" },
    update: {},
    create: {
      username: "moviefan",
      email: "user@champflimz.com",
      password: userPassword,
      role: "user",
    },
  });

  console.log("✅ Sample user created:", user.email);

  // Create movies
  for (const movieData of sampleMovies) {
    const movie = await prisma.movie.upsert({
      where: { title: movieData.title },
      update: {},
      create: {
        ...movieData,
        cast: {
          create: sampleCast.slice(0, Math.floor(Math.random() * 3) + 2).map((c, idx) => ({
            name: c.name,
            character: c.character + " " + idx,
            image: "https://via.placeholder.com/100x150",
          })),
        },
      },
    });

    console.log("✅ Movie created:", movie.title);
  }

  console.log("🎬 Database seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
