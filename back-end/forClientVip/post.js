const userName1 = document.getElementById("input-username1");
const userName2 = document.getElementById("input-username2");
const userName3 = document.getElementById("input-username3");
const email = document.getElementById("input-email");
const password = document.getElementById("input-password");
const buttonCreateAccount = document.getElementById("btn-criar-conta");
const failAlert = document.getElementById("alert");
const urlUsersVip = "https://parseapi.back4app.com/classes/UserVip";
const urlallUsers = "https://parseapi.back4app.com/classes/_User";
const headers = {
  "X-Parse-Application-Id": "EtXU3jV6pXkDHC5aRDi2ewMJbq3giWgbfBSeIlNq",
  "X-Parse-REST-API-Key": "4P3E1V7SmTX23TsXSEHyo8N7Q8aVgK9H47uGTWYr",
  "X-Parse-Revocable-Session": "1",
};
const headersJson = {
  ...headers,
  "Content-Type": "application/json",
};

const checkExists = async (field, value) => {
  const response = await fetch(`${urlAllUsers}?where={"${field}":"${value}"}`, {
    method: "GET",
    headers: headersJson,
  });

  if (response.ok) {
    const data = await response.json();
    if (data.results.length > 0) return true;
  } else {
    const errorData = await response.json();
    throw new Error(`Erro ao verificar ${field}: ${errorData.error}`);
  }

  const responseVip = await fetch(`${urlUsersVip}?where={"${field}":"${value}"}`, {
    method: "GET",
    headers: headersJson,
  });

  if (responseVip.ok) {
    const data = await responseVip.json();
    return data.results.length > 0;
  } else {
    const errorData = await responseVip.json();
    throw new Error(`Erro ao verificar ${field} (VIP): ${errorData.error}`);
  }
};

// CHECAGEM ANTIGA - SALVANDO PRA NÃO PERDER LÓGICA
// const checkUserExists = async (username, email) => {
//   const queryUrl = `${urlallUsers}?where=${encodeURIComponent(JSON.stringify({
//     $or: [
//       { username: username },
//       { email: email }
//     ]
//   }))}`;
  
//   const response = await fetch(queryUrl, {
//     method: "GET",
//     headers: headersJson,
//   });

//   const data = await response.json();
//   return data.results.length > 0;
// };

const createUserVip = async () => {

    let token = generateToken();
     
    const userData = {
      usernameTwo: userName2.value,
      usernameThree: userName3.value,
      tokenVip: token
    };

    const response = await fetch(urlUsersVip, {
      method: "POST",
      headers: headersJson,
      body: JSON.stringify(userData),
    });
  
    if (response.ok) {
      const pickId = await response.json();
      restrictInformation(pickId.objectId, token); // putting the information in user place
    } else {
      const errorData = await response.json();
      failAlert.textContent = `Erro ao criar usuário vip: ${errorData.error}`;
    }
  };

  const restrictInformation = async (userVipId, token) => {
  const userData = {
    username: userName1.value,
    email: email.value,
    password: password.value,
    UserVip: {
        "__type": "Pointer",
        "className": "UserVip",
        "objectId": userVipId
      },
  };

  const response = await fetch(urlallUsers, {
    method: "POST",
    headers: headersJson,
    body: JSON.stringify(userData),
  });

  if (response.ok) {
    const h3 = document.getElementById('h3-token');
    const p = document.getElementById('token');
    h3.innerHTML = "Token vip (salve ele em algum lugar)"
    p.innerHTML = token;
    failAlert.textContent = "";
    return await response.json();
  } else {
    const errorData = await response.json();
    failAlert.textContent = `Erro ao criar usuário vip: ${errorData.error}`;
  }
};

buttonCreateAccount.addEventListener("click", async () => {
  try {
    if (!/^[a-zA-Z]+$/.test(userName1.value) && !/^[a-zA-Z]+$/.test(userName2.value) && !/^[a-zA-Z]+$/.test(userName1.value)) {
      throw new Error("O nome de usuário é composto apenas por letras.");
    } else if (userName1.value === "" || userName2.value == "" ||  userName2.value == "" || email.value === "" || password.value === "") {
      throw new Error("Preencha os campos restantes.");
    } else if (userName1.value.length < 3) {
      throw new Error("O nome de usuário deve ter pelo menos 3 caracteres.");
    } else if (password.value.length < 5) {
      throw new Error("A senha deve ter no mínimo 5 caracteres.");
    }

    // CHECAGEM ANTIGA - SALVANDO PRA NÃO PERDER LÓGICA
    // const userExists = await checkUserExists(userName1.value, email.value);
    // if (userExists) {
    //   throw new Error("Nome de usuário ou email já existente.");
    // }
    
    const usernameExists = await checkExists("username", userName1.value);
    if (usernameExists) {
      throw new Error("Usuário já existente, mude o nome de usuário.");
    }

    const useremailExists = await checkExists("email", email.value);
    if (useremailExists) {
      throw new Error("Usuário já existente, mude o email de usuário.");
    }

    await createUserVip();
  } catch (error) {
    failAlert.textContent = error.message;
  }
});

function generateToken() {
    let chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let tokenNumber = "";
    for (let i = 0; i < 20; i++) {
      tokenNumber += chars[Math.floor(Math.random() * chars.length)];
    }
    return tokenNumber;
}  