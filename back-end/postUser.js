const userName = document.getElementById("input-username");
const email = document.getElementById("input-email");
const password = document.getElementById("input-password");
const buttonCreateAccount = document.getElementById("btn-criar-conta");
const failAlert = document.getElementById("alert");
const urlBase = "https://parseapi.back4app.com/classes/_User";
const headers = {
  "X-Parse-Application-Id": "RRzzBZTAAK9uSOdl1XTWSlQiz6x7WnFIRUjvOjtw",
  "X-Parse-REST-API-Key": " SMtvEBbce92vxnIavpVDH8KJDieKP4ZCrywJMlC3",
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
