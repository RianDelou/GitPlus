const allMoviesPlace = document.getElementById("all-movies");

const buttonAdd = document.getElementById("button-add");
const titleInput = document.getElementById("title-input");
const categoryInput = document.getElementById("category-input");
const typeInput = document.getElementById("type-input");
const urlInput = document.getElementById("url-input");
const alertPut = document.getElementById("alert-put");

const buttonRemove = document.getElementById("button-remove");
const idInput = document.getElementById("id-input");
const alertRemove = document.getElementById("alert-remove");

const urlBase = "https://parseapi.back4app.com/classes/Videos";
const headers = {
  "X-Parse-Application-Id": "EtXU3jV6pXkDHC5aRDi2ewMJbq3giWgbfBSeIlNq",
  "X-Parse-REST-API-Key": "4P3E1V7SmTX23TsXSEHyo8N7Q8aVgK9H47uGTWYr",
};
const headersJson = {
  ...headers,
  "Content-Type": "application/json",
};

const carregarVideos = async () => {
  const response = await fetch(urlBase, {
    method: "GET",
    headers: headers,
  });

  const data = await response.json();
  showMovies(data.results);
  addMovies(data.results);
  removeMovie(data.results);
};

const showMovies = (allMovies) => {
  let tableHTML = `<table>
        <thead>
            <tr>
                <th class="id">ID</th>
                <th>Titulo</th>
                <th>Categoria</th>
                <th>Tipo</th>
                <th>Rank</th>
            </tr>
        </thead>
        <tbody>`;

  allMovies.forEach((theMovie) => {
    tableHTML += `
            <tr>
                <td class="id">${theMovie.objectId}</td>
                <td class="title-td">${theMovie.title}</td>
                <td>${theMovie.category}</td>
                <td>${theMovie.type}</td>
                <td>${theMovie.topFive}</td>
                <td class="url-td" hidden>${theMovie.url}</td>
            </tr>`;
  });

  tableHTML += `</tbody>
    </table>`;

  allMoviesPlace.innerHTML = tableHTML;
};

const addMovies = () => {
  buttonAdd.onclick = async () => {
    const values = {
      title: titleInput.value,
      category: categoryInput.value,
      type: typeInput.value,
      url: urlInput.value,
    };

    try {
      const tituloList = document.querySelectorAll(".title-td");
      const urlList = document.querySelectorAll(".url-td");

      if (titleInput.value === "" || urlInput.value === "") {
        throw new Error("preencha os campos restantes!!");
      } else if (!urlInput.value.includes("embed")) {
        throw new Error(
          "A url está incorreta. Lembre que a forma de pegar a url de um iframe é diferente!"
        );
      }

      tituloList.forEach((movieTitle) => {
        if (movieTitle.innerText.toLowerCase() === values.title.toLowerCase()) {
          throw new Error("Esse título já existe!");
        }
      });

      urlList.forEach((movieUrl) => {
        if (movieUrl.innerText.toLowerCase() === values.url.toLowerCase()) {
          throw new Error("Essa url já existe!");
        }
      });

      await fetch(urlBase, {
        method: "POST",
        headers: headersJson,
        body: JSON.stringify(values),
      });

      alertPut.textContent =
        "Filme adiconado! veja ele na tabela abaixo e depois na plataforma!!";
      carregarVideos();
    } catch (error) {
      alertPut.textContent = error;
    }
  };
};

const removeMovie = (allMovies) => {
  buttonRemove.onclick = async () => {
    let foundMovie = false;
    let theMovieId = "";

    allMovies.forEach((theMovie) => {
      if (idInput.value === theMovie.objectId) {
        foundMovie = true;
        theMovieId = theMovie.objectId;
      } else if (!foundMovie) {
        foundMovie = false;
      }
    });

    if (foundMovie) {
      await fetch(`${urlBase}/${theMovieId}`, {
        method: "DELETE",
        headers: headers,
      });
      alertRemove.textContent = "Filme deletado.";
      carregarVideos();
    } else {
      alertRemove.textContent = "Esse ID não existe.";
    }
  };
};

carregarVideos();
