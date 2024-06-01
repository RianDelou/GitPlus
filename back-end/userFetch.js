const email = document.getElementById("input-email");
const password = document.getElementById("input-password");
const buttonLogin = document.getElementById("btn-login");
const failAlert = document.getElementById("alert");
const loginUrl = "https://parseapi.back4app.com/Login";
const tokenAdmin = "5ry%tL#PLJ7AYhf%kyss$B";
const buttonAdmin = document.getElementById("btn-adm");

const headers = {
  "X-Parse-Application-Id": "EtXU3jV6pXkDHC5aRDi2ewMJbq3giWgbfBSeIlNq",
  "X-Parse-REST-API-Key": "4P3E1V7SmTX23TsXSEHyo8N7Q8aVgK9H47uGTWYr",
  "X-Parse-Revocable-Session": "1",
};

const headersJson = {
  ...headers,
  "Content-Type": "application/json",
};
 
buttonLogin.addEventListener("click", async () => {
    
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
            const responseData = await response.json();
            localStorage.setItem("username", responseData.username);
            localStorage.setItem("userId", responseData.objectId);
            localStorage.setItem("sessionToken", responseData.sessionToken);
            localStorage.setItem("iconUser", responseData.icon.url);
            failAlert.textContent = "";
            window.location.href = "icon.html";
            
        } else {
            failAlert.textContent = "falha no login: Essa conta não existe.";
        }
    } catch (error) {
        failAlert.textContent = error;
    }
});