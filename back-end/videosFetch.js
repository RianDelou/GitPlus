const myList = document.getElementById("my-list");
const TrendingTrailers = document.getElementById("em-alta-list");
const allTrailersSeries = document.querySelectorAll(".trailers-list-series");
const allTrailersMovie = document.querySelectorAll(".trailers-list-movie");

const urlBase = "https://parseapi.back4app.com/classes/Videos";
const headers = {
  "X-Parse-Application-Id": "RRzzBZTAAK9uSOdl1XTWSlQiz6x7WnFIRUjvOjtw",
  "X-Parse-REST-API-Key": "SMtvEBbce92vxnIavpVDH8KJDieKP4ZCrywJMlC3",
};
const headersJson = {
  ...headers,
  "Content-Type": "application/json",
};

const loadVideos = async () => {
  const response = await fetch(urlBase, {
    method: "GET",
    headers: headers,
  });

  const data = await response.json();
  manipulandoVideos(data.results);
};

const showVideos = (type, element) => {
  type.innerHTML += `
    <li class = "trailer-item" trailerId="${element.objectId}">
        <iframe class="the-trailer" src="${element.url}" title="${
    element.title
  }" frameborder="0" allowfullscreen></iframe>
            <div class="description-trailer">
                <img class="logo-GitPlus" src="./Imagess/GitPlusLogo.png">
                <p>${element.title}</p>
                <p>Gênero: ${element.category}</p>
                <input  class ="input-my-list" type="checkbox" name="minha-lista"  trailerId="${
                  element.objectId}" ${element.checkBoxTrailerList.toLowerCase()}>
                <label for="minha-lista" class"label-check-box">Adicione na sua lista!</label>
            </div>
    </li>`;
};

const removeVideo = (type, trailerId) => {
  const trailerToRemove = type.querySelector(`.trailer-item[trailerId="${trailerId}"]`);
  if (trailerToRemove) {
    trailerToRemove.remove();
  }
};

const showTrendingVideos = (type, element) => {
  type.innerHTML += `
  <p class="trending-numbers">${element.topFive}</p>
    <li class = "trailer-item line-em-alta">
        <iframe class="the-trailer" src="${element.url}" title="${
    element.title
  }" frameborder="0" allowfullscreen></iframe>
            <div class="description-trailer">
                <img class="logo-GitPlus" src="./Imagess/GitPlusLogo.png">
                <p>${element.title}</p>
                <p>Gênero: ${element.category}</p>
                <input  class ="input-my-list" type="checkbox" name="minha-lista" trailerId="${
    element.objectId}" ${element.checkBoxTrailerList.toLowerCase()}>
                <label for="minha-lista" class"label-check-box">Adicione na sua lista!</label>
            </div>
    </li>`;
};

const attLabelCheckBox = () => {
  const allInputs = document.querySelectorAll(".input-my-list");
  allInputs.forEach((element) => {
    const label = element.nextElementSibling;
    if (element.checked) {
      label.textContent = "Remover da lista";

    } else {
      label.textContent = "Adicione na sua lista!";
    }
  });
};

const attLabelCheckBoxWWithId = (videoId, isChecked) => {
  const allInputsSameID = document.querySelectorAll(`.input-my-list[trailerId="${videoId}"]`);

  console.log(allInputsSameID);
  allInputsSameID.forEach((element) => {
    const label = element.nextElementSibling;
   if (isChecked) {
     label.textContent = "Remover da lista";
     element.setAttribute("checked", "");
     element.checked = true; // garantir
   } else if (!isChecked) {
     label.textContent = "Adicione na sua lista!";
     element.removeAttribute("checked");
     element.checked = false; // garantir
   }
  });
};

const manipulandoVideos = (video) => {
  const alltrendingVideos = video.filter((element) => element.topFive >= 1); // logica para o em alta
  alltrendingVideos.sort((a, b) => a.topFive - b.topFive); // logica para o em alta
  const allTrendingTrailers  = alltrendingVideos.slice(0, 5); // logica para o em alta

  video.forEach((element) => {
    //ver se tem como tirar a imagem do youtube no iframe
    if (element.checkBoxTrailerList.toLowerCase() === "checked") { // first section
      showVideos(myList, element); // att no reload
    }

    if (element.type.toLowerCase() === "series") {
      allTrailersSeries.forEach((series) => {
        if (element.category.toLowerCase() === series.classList[2]) { // third section
          showVideos(series, element);
        }
      });
    } else if (element.type.toLowerCase() === "movie") {
      allTrailersMovie.forEach((movie) => {
        if (element.category.toLowerCase() === movie.classList[2]) { // fourth section
          showVideos(movie, element);
        }
      });
    }
  });
  
  allTrendingTrailers.forEach(element => {
    showTrendingVideos(TrendingTrailers, element); // second section
  });

  attLabelCheckBox();
};

const adicionarALista = async (videoId, isChecked) => {

  const updateUrl = `${urlBase}/${videoId}`;
  await fetch(updateUrl, {
    method: "PUT",
    headers: headersJson,
    body: JSON.stringify({ checkBoxTrailerList: "checked" }),
  });

  const response = await fetch(updateUrl, {
    method: "GET",
    headers: headers,
  });
  const data = await response.json();

  checkBoxManipulation();

  showVideos(myList, data);
  attLabelCheckBox();
  attLabelCheckBoxWWithId(videoId, isChecked);
};

const removerDaLista = async (videoId, isChecked) => {
  const updateUrl = `${urlBase}/${videoId}`;
  await fetch(updateUrl, {
    method: "PUT",
    headers: headersJson,
    body: JSON.stringify({ checkBoxTrailerList: "" }), // Supondo que você tenha um campo "addedToMyList" para marcar se está na lista
  });

  checkBoxManipulation();

  removeVideo(myList, videoId);
  attLabelCheckBox();
  attLabelCheckBoxWWithId(videoId, isChecked);
};

const checkBoxManipulation = () => {
  const checkBoxList = document.querySelectorAll(".input-my-list");
  
  checkBoxList.forEach((element) => { 
    if (element.disabled == false) {
      element.disabled = true;
    } else {
      element.disabled = false;
    }
  });
}

document.addEventListener("change", (event) => {
  if (event.target.classList.contains("input-my-list")) {
    
    checkBoxManipulation();
    const checkbox = event.target;
    const isChecked = checkbox.checked;
    const videoId = checkbox.getAttribute("trailerId");
    const label = checkbox.nextElementSibling;
    if (isChecked) {
      adicionarALista(videoId, isChecked);
      label.textContent = "Remover da lista";
    } else {
      removerDaLista(videoId, isChecked);
      label.textContent = "Adicione na sua lista!";
    }
  }
});

loadVideos();
