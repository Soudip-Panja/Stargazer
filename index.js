const { initializeDatabase } = require("./db/db.connect");

const fs = require("fs");
const Movie = require("./models/movies.models");

initializeDatabase();

const jsonData = fs.readFileSync("movies.json", "utf-8");
const moviesData = JSON.parse(jsonData);

async function seedData() {
  try {
    for (const movieData of moviesData) {
      const newMovie = new Movie({
        title: movieData.title,
        releaseYear: movieData.releaseYear,
        genre: movieData.genre,
        director: movieData.director,
        actors: movieData.actors,
        language: movieData.language,
        country: movieData.country,
        rating: movieData.rating,
        plot: movieData.plot,
        awards: movieData.awards,
        posterUrl: movieData.posterUrl,
        trailerUrl: movieData.trailerUrl,
      });
      //   console.log(newMovie.title)
      await newMovie.save();
    }
  } catch (error) {
    console.log("Error seeding the data", error);
  }
}
// seedData();

const newMovie = {
  title: "New Movie",
  releaseYear: 2023,
  genre: ["Drama"],
  director: "Aditya Roy Chopra",
  actors: ["Actor1", "Actor2"],
  language: "Hindi",
  country: "India",
  rating: 6.1,
  plot: "A young man and woman fall in love on a Australia trip.",
  awards: "IFA Filmfare Awards",
  posterUrl: "https://example.com/new-poster1.jpg",
  trailerUrl: "https://example.com/new-trailer1.mp4",
};

async function creeateMovie(newMovie) {
  try {
    const movie = new Movie(newMovie);
    const saveMovie = await movie.save();
    console.log("New Movie data:", saveMovie);
  } catch (error) {
    throw error;
  }
}
// creeateMovie(newMovie);

// 1) Finding particular simgle movie by its title
async function readMovieByTitle(movieTitle) {
  try {
    const movie = await Movie.findOne({ title: movieTitle });
    console.log(movie);
  } catch (error) {
    throw error;
  }
}
// readMovieByTitle("Dilwale Dulhania Le Jayenge")

// 2) Get all the movies from database
async function readAllMovies() {
  try {
    const allMovies = await Movie.find();
    console.log(allMovies);
  } catch (error) {
    throw error;
  }
}
// readAllMovies();

// 3) Get all movies by a particular director name
async function readMovieByDirecotr(directorName) {
    try{
        const movie = await Movie.find({director: directorName})
        console.log(movie)
    }
    catch (error) {
        throw error
    }
}
readMovieByDirecotr("Rajkumar Hirani")
