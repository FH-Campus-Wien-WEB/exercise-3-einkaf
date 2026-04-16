const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const movieModel = require("./movie-model.js");
console.log(movieModel);
const app = express();

// Parse urlencoded bodies
app.use(bodyParser.json());

// Serve static content in directory 'files'
app.use(express.static(path.join(__dirname, "files")));

app.get("/genres", function (req, res) {
  const movies = Object.values(movieModel);
  const allGenres = movies.flatMap((movie) => movie.Genres).sort();
  const uniqueGenres = [...new Set(allGenres)];
  res.send(uniqueGenres);
});

// Configure a 'get' endpoint for all movies..
app.get("/movies", function (req, res) {
  /* Task 1.2. Remove the line below and eturn the movies from 
     the model as an array */
  res.json(Object.values(movieModel));
});

// Configure a 'get' endpoint for a specific movie
app.get("/movies/:imdbID", function (req, res) {
  /* Task 2.1. Remove the line below and add the 
    functionality here */
  // get the id from the path /movies/:imdbID
  const imdbID = req.params.imdbID;
  const movie = movieModel[imdbID];
  // I check here if movie is truthy
  if (movie) {
    res.send(movie);
  } else {
    // falsy values:
    //     false
    // 0
    // ""  empty string
    // null
    // undefined
    // NaN
    res.sendStatus(404);
  }
});

/* Task 3.1 and 3.2.
   - Add a new PUT endpoint
   - Check whether the movie sent by the client already exists 
     and continue as described in the assignment */
app.put("/movies/:imdbID", function (req, res) {
  // get the id from the path /movies/:imdbID
  const imdbID = req.params.imdbID;
  // save updated data
  const updatedMovie = req.body;
  // check if movie exist
  if (movieModel[imdbID]) {
    movieModel[imdbID] = updatedMovie;
    // send satatus code as a respond
    res.sendStatus(200);
  } else {
    movieModel[imdbID] = updatedMovie;
    // send satatus code as a respond
    res.sendStatus(201);
  }
});

app.listen(3000);

console.log("Server now listening on http://localhost:3000/");