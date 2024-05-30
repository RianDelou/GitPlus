const sayWelcomeForUser = document.getElementById("welcome");
const onlyTheName = document.getElementById("username-p1");

// fazer condição caso o cliente seja vip ou nao

document.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem("username");
    if (username) {
        const usernameUpdate = username.charAt(0).toUpperCase() + username.slice(1);

        sayWelcomeForUser.textContent = `Boas Vindas, ${usernameUpdate}. Quer entrar no nosso mundo?`;
        onlyTheName.textContent = usernameUpdate;

    } else {
        console.log("Nome do usuário não encontrado.");
    }
});

