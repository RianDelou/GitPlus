const onlyTheName = document.getElementById("username-p");
const iconPlace = document.getElementById("icon");
const linkToIcon = document.getElementById("link");

document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("userVipId")) {

    link.href = "icon.html"

    const username = localStorage.getItem("username");
    iconPlace.src = localStorage.getItem("iconUser");
    if (username) {
      const usernameUpdate =
        username.charAt(0).toUpperCase() + username.slice(1);

      onlyTheName.textContent = usernameUpdate;
    } else {
      console.log("Nome do usuário não encontrado.");
    }

  } else {
    console.log(localStorage.getItem("userVipId"))
  }
});
