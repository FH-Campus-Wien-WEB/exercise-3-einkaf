window.onload = function () {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    const bodyElement = document.querySelector("body");
    if (xhr.status == 200) {
      const movies = JSON.parse(xhr.responseText);
      for (const movie of movies) {
        /* Task 1.3. Add your code from exercise 1 here 
           and include a non-functional 'Edit' button
           to pass this test */
        let article = document.createElement("article");
        bodyElement.appendChild(article);
        article.id = movie.imdbID;

        // make a container inside each movie aticle for introduction
        let section_introduction = document.createElement("section");
        section_introduction.classList.add("introduction");
        article.appendChild(section_introduction);

        // add each poster to the introduction section
        let image_poster = document.createElement("img");
        image_poster.src = movie.Poster;
        image_poster.alt = movie.Title;
        section_introduction.appendChild(image_poster);

        // add each title to the introduction section
        let title = document.createElement("h2");
        title.textContent = movie.Title;
        section_introduction.appendChild(title);

        // edit button
        let editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("btnEdit", "btn");
        section_introduction.appendChild(editButton);
        editButton.onclick = function () {
          location.href = "edit.html?imdbID=" + movie.imdbID;
        };

        // add paragraph and put the released time an runetime inside with a good format
        let info = document.createElement("p");
        let hours = Math.floor(movie.Runtime / 60);
        let minutes = movie.Runtime % 60;
        const date = new Date(movie.Released);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        info.innerHTML = `
        <time>${hours} h ${minutes}m</time> • 
        Released on <time datetime="${movie.Released}">${formattedDate}</time>
      `;
        section_introduction.appendChild(info);

        // add paragraph and put the rating inside with a good format
        let rating = document.createElement("p");
        let imdb = movie.imdbRating;
        let meta = movie.Metascore;
        rating.textContent = `IMDb: ${imdb} | Metacritic: ${meta}`;
        section_introduction.appendChild(rating);

        // add paragraph an put the genres inside with spans for each genre
        let genres = document.createElement("p");
        genres.classList.add("genres");
        movie.Genres.forEach((element) => {
          let genre = document.createElement("span");
          genre.textContent = element;
          genre.classList.add("btn");
          genres.appendChild(genre);
        });
        section_introduction.appendChild(genres);

        // add description
        let description = document.createElement("p");
        description.classList.add("description");
        description.textContent = movie.Plot;
        section_introduction.appendChild(description);

        // make a container inside each movie aticle for details
        let section_details = document.createElement("section");
        section_details.classList.add("details");
        article.appendChild(section_details);

        //    create director, writer and actors via using function
        section_details.appendChild(
          createListSection("Directors:", movie.Directors)
        );
        section_details.appendChild(
          createListSection("Writers:", movie.Writers)
        );
        section_details.appendChild(createListSection("Actors:", movie.Actors));
      }

      // Creates a section with a title and a list of people (e.g., directors, writers, actors)
      function createListSection(titleText, items) {
        let section = document.createElement("section");

        let title = document.createElement("h3");
        title.textContent = titleText;
        section.appendChild(title);

        let list = document.createElement("ul");
        items.forEach((item) => {
          let li = document.createElement("li");
          li.textContent = item;
          list.appendChild(li);
        });

        section.appendChild(list);
        return section;
      }
    } else {
      bodyElement.append(
        "Daten konnten nicht geladen werden, Status " +
          xhr.status +
          " - " +
          xhr.statusText
      );
    }
  };
  xhr.open("GET", "/movies");
  xhr.send();
};
