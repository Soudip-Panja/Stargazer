const { initializeDatabase } = require("./db/db.connect");

const fs = require("fs");
const Movie = require("./models/movies.models");
const { error } = require("console");

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
  title: "New Movie 3",
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
// readMovieByDirecotr("Rajkumar Hirani")

// 4) Find movie by its id and update its rating
async function updateMovie(movieId, dataToUpdate) {
  try{
    const updatedMovie = await Movie.findByIdAndUpdate(movieId, dataToUpdate, {new: true})
    console.log(updatedMovie)
  }
  catch (error) {
    console.log("Error in updating Movie rating:", error)
  }
}
// updateMovie("68a3239e5ad37411319add6b", {rating: 8.0})

// 5) Find one data and update its value (By this method we can fine movie with any other value isted of id.)

async function updateMovieDetails(movieTitle, dataToUpdate) {
  try{
    const updatedMovie = await Movie.findOneAndUpdate({ title: movieTitle}, dataToUpdate, {new: true})
    console.log(updatedMovie)
  }
  catch (error) {
    console.log("Error in changing data:", error)
  }
}
// updateMovieDetails("Kabhi Khushi Kabhie Gham", {releaseYear: 2001})

// 6) Find a movie by id and delete from the database
async function deleteMovie(movieId) {
  try{
    const deletedMovie = await Movie.findByIdAndDelete(movieId)
    console.log("Deleted Movie:", deletedMovie)
  }
  catch (error) {
    console.log("Error in Deleting Movie", error)
  }
}
// deleteMovie("68a45bcb222e945bfc32d9cb")

// 7) Delete by title
async function deleteMovieByTitle(movieTitle) {
  try{
    const deletedMovie = await Movie.findOneAndDelete({title: movieTitle})
    console.log("This movie was deleted:",deletedMovie)
  }
  catch (error) {
    console.log("Error in movie deletion:", error)
  }
}
deleteMovieByTitle("New Movie 2")