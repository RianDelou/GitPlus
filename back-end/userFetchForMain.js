const onlyTheName = document.getElementById("username-p");

document.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem("username");
    if (username) {
        const usernameUpdate = username.charAt(0).toUpperCase() + username.slice(1);

        onlyTheName.textContent = usernameUpdate;

    } else {
        console.log("Nome do usuário não encontrado.");
    }
});