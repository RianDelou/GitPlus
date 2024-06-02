const myList = document.getElementById("my-list");
const TrendingTrailers = document.getElementById("em-alta-list");
const allTrailersSeries = document.querySelectorAll(".trailers-list-series");
const allTrailersMovie = document.querySelectorAll(".trailers-list-movie");

const userId = localStorage.getItem("userId");

const urlBase = "https://parseapi.back4app.com/classes/Videos";
const urlUsers = "https://parseapi.back4app.com/classes/_User";
const headers = {
  "X-Parse-Application-Id": "EtXU3jV6pXkDHC5aRDi2ewMJbq3giWgbfBSeIlNq",
  "X-Parse-REST-API-Key": "4P3E1V7SmTX23TsXSEHyo8N7Q8aVgK9H47uGTWYr",
};
const headersJson = {
  ...headers,
  "Content-Type": "application/json",
  "X-Parse-Session-Token": localStorage.getItem("sessionToken"),
};

document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("sessionToken")) {
    window.location.href = "index.html"
  }
});

const loadVideos = async () => {
  const response = await fetch(urlBase, {
    method: "GET",
    headers: headers,
  });

  const data = await response.json();
  manipulandoVideos(data.results);
};

const getUserList = async () => {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    console.error("ID do usuário não encontrado no localStorage.");
    return;
  } 

  const query = {
    $relatedTo: {
      object: {
        __type: "Pointer",
        className: "_User",
        objectId: userId,
      },
      key: "UserList",
    },
  };

  const queryString = encodeURIComponent(JSON.stringify(query));
  const videosUrl = `${urlBase}?where=${queryString}`;

  const videosResponse = await fetch(videosUrl, {
    method: "GET",
    headers: headersJson,
  });

  if (!videosResponse.ok) {
    console.error("Erro ao carregar vídeos relacionados.");
    return;
  }

  const videosData = await videosResponse.json();

  return videosData.results;
};

const getSecondUserList = async () => {
  const userVipId = localStorage.getItem("userVipId");
  if (!userVipId) {
    console.error("ID do usuário não encontrado no localStorage.");
    return;
  } 

  const query = {
    $relatedTo: {
      object: {
        __type: "Pointer",
        className: "UserVip",
        objectId: userVipId,
      },
      key: "secondUserList",
    },
  };

  const queryString = encodeURIComponent(JSON.stringify(query));
  const videosUrl = `${urlBase}?where=${queryString}`;

  const videosResponse = await fetch(videosUrl, {
    method: "GET",
    headers: headersJson,
  });

  if (!videosResponse.ok) {
    console.error("Erro ao carregar vídeos relacionados.");
    return;
  }

  const videosData = await videosResponse.json();

  return videosData.results;
};

const getThirdUserList = async () => {
  const userVipId = localStorage.getItem("userVipId");
  if (!userVipId) {
    console.error("ID do usuário não encontrado no localStorage.");
    return;
  } 

  const query = {
    $relatedTo: {
      object: {
        __type: "Pointer",
        className: "UserVip",
        objectId: userVipId,
      },
      key: "thirdUserList",
    },
  };

  const queryString = encodeURIComponent(JSON.stringify(query));
  const videosUrl = `${urlBase}?where=${queryString}`;

  const videosResponse = await fetch(videosUrl, {
    method: "GET",
    headers: headersJson,
  });

  if (!videosResponse.ok) {
    console.error("Erro ao carregar vídeos relacionados.");
    return;
  }

  const videosData = await videosResponse.json();

  return videosData.results;
};

const showVideos = (type, element, isChecked) => {
  type.innerHTML += `
    <li class = "trailer-item" trailerId="${element.objectId}">
        <iframe class="the-trailer" src="${element.url}" title="${element.title}" frameborder="0" allowfullscreen></iframe>
            <div class="description-trailer">
                <img class="logo-GitPlus" src="./Imagess/GitPlusLogo.png">
                <p>${element.title}</p>
                <p>Gênero: ${element.category}</p>
                <input  class ="input-my-list" type="checkbox" name="minha-lista"  trailerId="${element.objectId}" ${isChecked}>
                <label for="minha-lista" class"label-check-box">Adicione na sua lista!</label>
            </div>
    </li>`;
};

const removeVideo = (type, trailerId) => {
  const trailerToRemove = type.querySelector(
    `.trailer-item[trailerId="${trailerId}"]`
  );
  if (trailerToRemove) {
    trailerToRemove.remove();
  }
};

const showTrendingVideos = (type, element, isChecked) => {
  type.innerHTML += `
  <p class="trending-numbers">${element.topFive}</p>
    <li class = "trailer-item line-em-alta">
        <iframe class="the-trailer" src="${element.url}" title="${element.title}" frameborder="0" allowfullscreen></iframe>
            <div class="description-trailer">
                <img class="logo-GitPlus" src="./Imagess/GitPlusLogo.png">
                <p>${element.title}</p>
                <p>Gênero: ${element.category}</p>
                <input  class ="input-my-list" type="checkbox" name="minha-lista" trailerId="${element.objectId}" ${isChecked}>
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
  const allInputsSameID = document.querySelectorAll(
    `.input-my-list[trailerId="${videoId}"]`
  );

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
  const allTrendingTrailers = alltrendingVideos.slice(0, 5); // logica para o em alta

  video.forEach((element) => {
    if (element.type.toLowerCase() === "series") {
      allTrailersSeries.forEach((series) => {
        if (element.category.toLowerCase() === series.classList[2]) {
          // third section
          showVideos(series, element, "");
        }
      });
    } else if (element.type.toLowerCase() === "movie") {
      allTrailersMovie.forEach((movie) => {
        if (element.category.toLowerCase() === movie.classList[2]) {
          // fourth section
          showVideos(movie, element, "");
        }
      });
    }
  });

  allTrendingTrailers.forEach((element) => {
    showTrendingVideos(TrendingTrailers, element, ""); // second section
  });
  if (localStorage.getItem("selectedAccount") === "1" || !localStorage.getItem("selectedAccount")) {
    getUserList().then((videosDataMyList) => {
      if (videosDataMyList) {
        videosDataMyList.forEach((videos) => {
          showVideos(myList, videos, "checked"); // att no reload
          attLabelCheckBoxWWithId(videos.objectId, "checked");
        });
      }
    });
  } else if (localStorage.getItem("selectedAccount") === "2" ) {

    getSecondUserList().then((videosDataMyList) => {
      if (videosDataMyList) {
        videosDataMyList.forEach((videos) => {
          showVideos(myList, videos, "checked"); // att no reload
          attLabelCheckBoxWWithId(videos.objectId, "checked");
        });
      }
    });

  } else if (localStorage.getItem("selectedAccount") === "3") {

    getThirdUserList().then((videosDataMyList) => {
      if (videosDataMyList) {
        videosDataMyList.forEach((videos) => {
          showVideos(myList, videos, "checked"); // att no reload
          attLabelCheckBoxWWithId(videos.objectId, "checked");
        });
      }
    });

  }

};

const putListFirstUser = async (videoId, action) => {
  const updateUrl = `${urlUsers}/${userId}`;

  const userData = {
    UserList: {
      "__op": `${action}`,
      "objects": [
        {
          "__type": "Pointer",
          "className": "Videos",
          "objectId": videoId,
        },
      ],
    },
  };

  await fetch(updateUrl, {
    method: "PUT",
    headers: headersJson,
    body: JSON.stringify(userData),
  });
}

const putListVipUser = async (videoId, action, user) => {
  const urlUserVip =  "https://parseapi.back4app.com/classes/UserVip";
  const userVipId = localStorage.getItem("userVipId");
  const updateUrl = `${urlUserVip}/${userVipId}`;

  const userData = {
    [user]: {
      "__op": `${action}`,
      "objects": [
        {
          "__type": "Pointer",
          "className": "Videos",
          "objectId": videoId,
        },
      ],
    },
  };

  await fetch(updateUrl, {
    method: "PUT",
    headers: headersJson,
    body: JSON.stringify(userData),
  });
} 

const adicionarALista = async (videoId, isChecked) => {

  let result;

  if (localStorage.getItem("selectedAccount") === "1" || !localStorage.getItem("selectedAccount")) {

    await putListFirstUser(videoId, "AddRelation");
    result = await getUserList();

  } else if (localStorage.getItem("selectedAccount") === "2" ) {

    await putListVipUser(videoId,"AddRelation", "secondUserList");
    result = await getSecondUserList();

  } else if (localStorage.getItem("selectedAccount") === "3") {

    await putListVipUser(videoId, "AddRelation", "thirdUserList");
    result = await getThirdUserList();

  }

  const relatedVideo = result.find((video) => video.objectId === videoId);

  console.log(relatedVideo)
  checkBoxManipulation();

  showVideos(myList, relatedVideo);
  attLabelCheckBox();
  attLabelCheckBoxWWithId(videoId, isChecked);
};

const removerDaLista = async (videoId, isChecked) => {
  if (localStorage.getItem("selectedAccount") === "1" || !localStorage.getItem("selectedAccount")) {

    await putListFirstUser(videoId, "RemoveRelation");

  } else if (localStorage.getItem("selectedAccount") === "2" ) {

    await putListVipUser(videoId, "RemoveRelation",  "secondUserList");

  } else if (localStorage.getItem("selectedAccount") === "3") {

    await putListVipUser(videoId, "RemoveRelation", "thirdUserList");

  }

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
};

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
