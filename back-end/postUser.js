const userName = document.getElementById("input-username");
const email = document.getElementById("input-email");
const password = document.getElementById("input-password");
const buttonCreateAccount = document.getElementById("btn-criar-conta");
const failAlert = document.getElementById("alert");
const urlUsers = "https://parseapi.back4app.com/classes/_User";
const urlVideos = "https://parseapi.back4app.com/classes/Videos";
const headers = {
  "X-Parse-Application-Id": "EtXU3jV6pXkDHC5aRDi2ewMJbq3giWgbfBSeIlNq",
  "X-Parse-REST-API-Key": "4P3E1V7SmTX23TsXSEHyo8N7Q8aVgK9H47uGTWYr",
  "X-Parse-Revocable-Session": "1",
};
const headersJson = {
  ...headers,
  "Content-Type": "application/json",
};

const loadVideos = async () => {
  const response = await fetch(urlVideos, {
    method: "GET",
    headers: headers,
  });

  const data = await response.json();
  return data.results;
};

const createUser = async (videos) => {
  const userData = {
    username: userName.value,
    email: email.value,
    password: password.value,
    VideosForUser: {
      "__op": "AddRelation",
      "objects": videos.map(video => ({
        "__type": "Pointer",
        "className": "Videos",
        "objectId": video.objectId
      }))
    }
  };

  const response = await fetch(urlUsers, {
    method: "POST",
    headers: headersJson,
    body: JSON.stringify(userData),
  });

  if (response.ok) {
    return await response.json();
  } else {
    const errorData = await response.json();
    throw new Error(`Erro ao criar usuário: ${errorData.error}`);
  }
};

buttonCreateAccount.addEventListener("click", async () => {
  try {
    if (!/^[a-zA-Z]+$/.test(userName.value)) {
      throw new Error("O nome de usuário é composto apenas por letras.");
    } else if (userName.value === "" || email.value === "" || password.value === "") {
      throw new Error("Preencha os campos restantes.");
    }

    const videos = await loadVideos();
    await createUser(videos);
    
    window.location.href = "index.html";
  } catch (error) {
    failAlert.textContent = error.message;
  }
});
