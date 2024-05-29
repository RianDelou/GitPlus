const userName = document.getElementById("input-username");
const email = document.getElementById("input-email");
const password = document.getElementById("input-password");
const buttonCreateAccount = document.getElementById("btn-criar-conta");
const failAlert = document.getElementById("alert");
const urlBase = "https://parseapi.back4app.com/classes/_User";
const headers = {
  "X-Parse-Application-Id": "EtXU3jV6pXkDHC5aRDi2ewMJbq3giWgbfBSeIlNq",
  "X-Parse-REST-API-Key": " 4P3E1V7SmTX23TsXSEHyo8N7Q8aVgK9H47uGTWYr",
  "X-Parse-Revocable-Session": "1",
};
const headersJson = {
  ...headers,
  "Content-Type": "application/json",
};

buttonCreateAccount.addEventListener("click", async () => {

  try {

    if (!/^[a-zA-Z]+$/.test(userName.value)) {
      throw new Error("O nome de usuário é composto apenas por letras.");
    } else if (userName.value === "" || email.value === "" || password.value === "") {
      throw new Error("Preencha os campos restantes.");
    }

    const userData = {
      username: userName.value,
      email: email.value,
      password: password.value,
    };

    const response = await fetch(urlBase, {
      method: "POST",
      headers: headersJson,
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      window.location.href = "index.html";
    } else if (!response.ok) {

      throw new Error(
        "Talvez o preenchimento dos dados foi realizado de maneira incorreta ou essa conta já existe."
      );

    }

  } catch (error) {
    failAlert.textContent = error.message;
  }

});
