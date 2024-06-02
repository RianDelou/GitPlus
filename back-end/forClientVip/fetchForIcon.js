const sayWelcomeForUser = document.getElementById("welcome");
const firstName = document.getElementById("username-p1");
const secondName = document.getElementById("username-p2");
const thirdName = document.getElementById("username-p3");
const iconPlaceOne = document.getElementById("image1");
const iconPlaceTwo = document.getElementById("image2");
const iconPlaceThree = document.getElementById("image3");
const alert = document.getElementById("alert");
const firstAccount = document.getElementById("userFirstAccount");
const secondAccount = document.getElementById("userSecondAccount");
const thirdAccount = document.getElementById("userThirdAccount");

const userId = localStorage.getItem("userId");
const userVipId = localStorage.getItem("userVipId");
Parse.initialize(
  "EtXU3jV6pXkDHC5aRDi2ewMJbq3giWgbfBSeIlNq",
  "njI84kVFD1aLWtWrEksmiEqHgjUBMpqxLhreMvDu"
);

Parse.serverURL = "https://parseapi.back4app.com/";

const headers = {
  "X-Parse-Application-Id": "EtXU3jV6pXkDHC5aRDi2ewMJbq3giWgbfBSeIlNq",
  "X-Parse-REST-API-Key": "4P3E1V7SmTX23TsXSEHyo8N7Q8aVgK9H47uGTWYr",
  "X-Parse-Session-Token": localStorage.getItem("sessionToken"),
};
const headersJson = {
  ...headers,
  "Content-Type": "application/json",
};
const userVipUrl = "https://parseapi.back4app.com/classes/UserVip";
const baseUserUrl = "https://parseapi.back4app.com/classes/_User";

document.addEventListener("DOMContentLoaded", () => {

  if (!localStorage.getItem("sessionToken")) {
    window.location.href = "index.html"
  }
  
  updateImage("insert1", "image1");
  updateImage("insert2", "image2");
  updateImage("insert3", "image3");

  const username = localStorage.getItem("usernameOne");
  const usernameTwo = localStorage.getItem("usernameTwo");
  const usernameThree = localStorage.getItem("usernameThree");
  iconPlaceOne.src = localStorage.getItem("iconUserOne");
  iconPlaceTwo.src = localStorage.getItem("iconUserTwo");
  iconPlaceThree.src = localStorage.getItem("iconUserThree");
  

  if (username) {
    const usernameUpdateOne =
      username.charAt(0).toUpperCase() + username.slice(1);
    const usernameUpdateTwo =
      usernameTwo.charAt(0).toUpperCase() + usernameTwo.slice(1);
    const usernameUpdateThree =
      usernameThree.charAt(0).toUpperCase() + usernameThree.slice(1);
    firstName.textContent = usernameUpdateOne;
    secondName.textContent = usernameUpdateTwo;
    thirdName.textContent = usernameUpdateThree;
  } else {
    console.log("Nome do usuário não encontrado.");
  }
});

// Função para atualizar a imagem do usuário
const putImageOfUser = async (userID, file, inputId) => {
  try {
    const parseFile = new Parse.File(file.name, file);

    await parseFile.save();

    const fileUrl = parseFile.url();

    const values = {
      __type: "File",
      name: parseFile._name,
      url: fileUrl,
    };

    if (inputId === "insert1") {

      const response = await fetch(`${baseUserUrl}/${userID}`, {
        method: "PUT",
        headers: headersJson,
        body: JSON.stringify({ icon: values }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro ao atualizar o usuário: ", errorData);
        throw new Error("Erro ao atualizar o usuário.");
      }
      localStorage.setItem("iconUserOne", fileUrl);
      alert.textContent = ``;
      return true;

    } else if (inputId === "insert2") {

      const response = await fetch(`${userVipUrl}/${userVipId}`, {
        method: "PUT",
        headers: headersJson,
        body: JSON.stringify({ iconUserTwo: values }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro ao atualizar o usuário: ", errorData);
        throw new Error("Erro ao atualizar o usuário.");
      }
      localStorage.setItem("iconUserTwo", fileUrl);
      alert.textContent = ``;
      return true;

    } else if (inputId === "insert3") {

      const response = await fetch(`${userVipUrl}/${userVipId}`, {
        method: "PUT",
        headers: headersJson,
        body: JSON.stringify({ iconUserThree: values }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro ao atualizar o usuário: ", errorData);
        throw new Error("Erro ao atualizar o usuário.");
      }
      localStorage.setItem("iconUserThree", fileUrl);
      alert.textContent = ``;
      return true;

    }
  } catch (error) {
    alert.textContent = `Erro ao adicionar imagem: ${error}`;
    return false;
  }
};

const updateImage = (inputId, imageId) => {
  const inputFile = document.getElementById(inputId);
  const icon = document.getElementById(imageId);

  if (inputFile) {
    inputFile.addEventListener("change", () => {
      const file = inputFile.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const iconIsValid = await putImageOfUser(userId, file, inputId);
          if (iconIsValid) {
            icon.src = e.target.result;
          } else {
            icon.src = "./Imagess/imageError.jpg";
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }
};

firstAccount.addEventListener("click", () => {
  localStorage.setItem("selectedAccount", "1");
});

secondAccount.addEventListener("click", () => {
  localStorage.setItem("selectedAccount", "2");
});

thirdAccount.addEventListener("click", () => {
  localStorage.setItem("selectedAccount", "3");
});