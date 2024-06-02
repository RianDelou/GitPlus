const onlyTheNameVip = document.getElementById("username-p");
const iconPlaceVip = document.getElementById("icon");
const linkToIconVip = document.getElementById("link");
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("userVipId")) {

        linkToIconVip.href = "iconVips.html"
        
        if (localStorage.getItem("selectedAccount") === "1") {
            firstAccount()
        } else if (localStorage.getItem("selectedAccount") === "2") {
            secondAccount()
        } else if (localStorage.getItem("selectedAccount") === "3") {
            thirdAccount()
        }

    } else {
      console.log(localStorage.getItem("userId"))
    }
  });
  
const firstAccount = () => {
    let username = localStorage.getItem("usernameOne");
    iconPlaceVip.src = localStorage.getItem("iconUserOne");
    if (username) {
      const usernameUpdate =
        username.charAt(0).toUpperCase() + username.slice(1);

      onlyTheNameVip.textContent = usernameUpdate;
    } else {
      console.log("Nome do usuário não encontrado.");
    }
}

const secondAccount = () => {
    let username = localStorage.getItem("usernameTwo");
    iconPlaceVip.src = localStorage.getItem("iconUserTwo");
    if (username) {
      const usernameUpdate =
        username.charAt(0).toUpperCase() + username.slice(1);

      onlyTheNameVip.textContent = usernameUpdate;
    } else {
      console.log("Nome do usuário não encontrado.");
    }
}

const thirdAccount = () => {
    let username = localStorage.getItem("usernameThree");
    iconPlaceVip.src = localStorage.getItem("iconUserThree");
    if (username) {
      const usernameUpdate =
        username.charAt(0).toUpperCase() + username.slice(1);

      onlyTheNameVip.textContent = usernameUpdate;
    } else {
      console.log("Nome do usuário não encontrado.");
    }
}