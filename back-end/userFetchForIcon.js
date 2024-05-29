const sayWelcomeForUser = document.getElementById("welcome");
const onlyTheName = document.getElementById("username-p");
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

document.addEventListener('DOMContentLoaded', () => {
    const inputFile = document.getElementById('insert');
    const icon = document.getElementById('image');

    inputFile.addEventListener('change', () => {
        const file = inputFile.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                icon.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
});