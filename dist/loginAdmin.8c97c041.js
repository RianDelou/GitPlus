const email = document.getElementById("input-email");
const password = document.getElementById("input-password");
const buttonLogin = document.getElementById("btn-login");
const failAlert = document.getElementById("alert");
const tokenInput = document.getElementById("token");
const loginUrl = "https://parseapi.back4app.com/Login";
const tokenAdmin = "5ry%tL#PLJ7AYhf%kyss$B";
const headers = {
    "X-Parse-Application-Id": "EtXU3jV6pXkDHC5aRDi2ewMJbq3giWgbfBSeIlNq",
    "X-Parse-REST-API-Key": "4P3E1V7SmTX23TsXSEHyo8N7Q8aVgK9H47uGTWYr",
    "X-Parse-Revocable-Session": "1"
};
const headersJson = {
    ...headers,
    "Content-Type": "application/json"
};
buttonLogin.addEventListener("click", async ()=>{
    const loginData = {
        username: email.value,
        password: password.value
    };
    try {
        const response = await fetch(loginUrl, {
            method: "POST",
            headers: headersJson,
            body: JSON.stringify(loginData)
        });
        if (response.ok) {
            failAlert.textContent = "";
            if (tokenInput.value === tokenAdmin) {
                failAlert.textContent = "";
                window.location.href = "admin.html";
            } else throw new Error("O token admin foi preenchido de forma incorreta");
        } else failAlert.textContent = "falha no login: Essa conta n\xe3o existe.";
    } catch (error) {
        failAlert.textContent = error;
    }
});

//# sourceMappingURL=loginAdmin.8c97c041.js.map
