const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const movieModel = require("./movie-model.js");

const app = express();

// Parse JSON bodies
app.use(bodyParser.json());

// Serve static content in directory 'files'
app.use(express.static(path.join(__dirname, "files")));

app.get("/genres", function (req, res) {
  const movies = Object.values(movieModel);
  const allGenres = movies.flatMap((movie) => movie.Genres).sort();
  const uniqueGenres = [...new Set(allGenres)];
  res.send(uniqueGenres);
});

// Configure a 'get' endpoint for all movies
app.get("/movies", function (req, res) {
  let movies = Object.values(movieModel);
  const genre = req.query.genre;

  if (genre) {
    movies = movies.filter((movie) => movie.Genres.includes(genre));
  }

  res.json(movies);
});

// Configure a 'get' endpoint for a specific movie
app.get("/movies/:imdbID", function (req, res) {
  const imdbID = req.params.imdbID;
  const movie = movieModel[imdbID];

  if (movie) {
    res.send(movie);
  } else {
    res.sendStatus(404);
  }
});

app.put("/movies/:imdbID", function (req, res) {
  const imdbID = req.params.imdbID;
  const updatedMovie = req.body;

  if (movieModel[imdbID]) {
    movieModel[imdbID] = updatedMovie;
    res.sendStatus(200);
  } else {
    movieModel[imdbID] = updatedMovie;
    res.sendStatus(201);
  }
});

app.listen(3000);

console.log("Server now listening on http://localhost:3000/");