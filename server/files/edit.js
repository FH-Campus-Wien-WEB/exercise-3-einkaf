function setMovie(movie) {
  for (const element of document.forms[0].elements) {
    const name = element.id;
    const value = movie[name];

    if (name === "Genres") {
      const options = element.options;
      for (let index = 0; index < options.length; index++) {
        const option = options[index];
        option.selected = value.indexOf(option.value) >= 0;
      }
    } else {
      element.value = value;
    }
  }
}

function getMovie() {
  const movie = {};

  const elements = Array.from(document.forms[0].elements).filter(
    (element) => element.id
  );

  for (const element of elements) {
    const name = element.id;

    let value;

    if (name === "Genres") {
      value = [];
      const options = element.options;
      for (let index = 0; index < options.length; index++) {
        const option = options[index];
        if (option.selected) {
          value.push(option.value);
        }
      }
    } else if (
      name === "Metascore" ||
      name === "Runtime" ||
      name === "imdbRating"
    ) {
      value = Number(element.value);
    } else if (
      name === "Actors" ||
      name === "Directors" ||
      name === "Writers"
    ) {
      value = element.value.split(",").map((item) => item.trim());
    } else {
      value = element.value;
    }

    movie[name] = value;
  }

  return movie;
}

function putMovie() {
  /* Task 3.3. 
    - Get the movie data using getMovie()
    - Configure the XMLHttpRequest to make a PUT to /movies/:imdbID
    - Set the 'Content-Type' appropriately for JSON data
    - Configure the function below as the onload event handler
    - Send the movie data as JSON
  */
  //  Get the form; Validate the form
  const form = document.forms[0];

  if (!form.reportValidity()) {
    // Stop if invalid
    return;
  }
  //  Create a new XMLHttpRequest object (this is how we send HTTP requests)
  const xhr = new XMLHttpRequest();
  //  Get all movie data from the form (object with all fields)
  const movieInput = getMovie();
  //  Configure the request:
  // - Method: PUT (update/create)
  // - URL: /movies/:imdbID (example: /movies/tt1234567)
  xhr.open("PUT", "/movies/" + movieInput.imdbID);
  // Tell the server we are sending JSON data
  xhr.setRequestHeader("Content-Type", "application/json");
  // This function runs AFTER the server responds
  xhr.onload = function () {
    if (xhr.status == 200 || xhr.status === 201) {
      location.href = "index.html";
    } else {
      alert("Saving of movie data failed. Status code was " + xhr.status);
    }
  };
  // Send the movie data to the server as JSON string
  xhr.send(JSON.stringify(movieInput));
}

/** Loading and setting the movie data for the movie with the passed imdbID */
const imdbID = new URLSearchParams(window.location.search).get("imdbID");

const xhr = new XMLHttpRequest();
xhr.open("GET", "/movies/" + imdbID);
xhr.onload = function () {
  if (xhr.status === 200) {
    setMovie(JSON.parse(xhr.responseText));
  } else {
    alert(
      "Loading of movie data failed. Status was " +
        xhr.status +
        " - " +
        xhr.statusText
    );
  }
};

// navigates back to the overview page;
function cancelButton() {
  location.href = "index.html";
}

xhr.send();
