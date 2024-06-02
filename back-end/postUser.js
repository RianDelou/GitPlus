const userName = document.getElementById("input-username");
const email = document.getElementById("input-email");
const password = document.getElementById("input-password");
const buttonCreateAccount = document.getElementById("btn-criar-conta");
const failAlert = document.getElementById("alert");
const urlUsers = "https://parseapi.back4app.com/classes/_User";
const headers = {
  "X-Parse-Application-Id": "EtXU3jV6pXkDHC5aRDi2ewMJbq3giWgbfBSeIlNq",
  "X-Parse-REST-API-Key": "4P3E1V7SmTX23TsXSEHyo8N7Q8aVgK9H47uGTWYr",
  "X-Parse-Revocable-Session": "1",
};
const headersJson = {
  ...headers,
  "Content-Type": "application/json",
};

const checkUsernameExists = async (username) => {
  const response = await fetch(`${urlUsers}?where={"username":"${username}"}`, {
    method: "GET",
    headers: headersJson,
  });

  if (response.ok) {
    const data = await response.json();
    return data.results.length > 0;
  } else {
    const errorData = await response.json();
    throw new Error(`Erro ao verificar nome de usuário: ${errorData.error}`);
  }
};

const createUser = async () => {
  const userData = {
    username: userName.value,
    email: email.value,
    password: password.value,
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
    } else if (userName.value.length < 3) {
      throw new Error("O nome de usuário deve ter pelo menos 3 caracteres.");
    } else if (password.value.length < 5) {
      throw new Error("A senha deve ter no mínimo 5 caracteres.");
    }
    
    const usernameExists = await checkUsernameExists(userName.value);
     if (usernameExists) {
       throw new Error("Usuário já existente, mude o nome de usuário.");
     }

    await createUser();
    
    window.location.href = "index.html";
  } catch (error) {
    failAlert.textContent = error.message;
  }
});