const email = document.getElementById("input-email");
const password = document.getElementById("input-password");
const buttonLogin = document.getElementById("btn-login");
const failAlert = document.getElementById("alert");
const loginUrl = "https://parseapi.back4app.com/Login";
const tokenAdmin = "5ry%tL#PLJ7AYhf%kyss$B";
const buttonAdmin = document.getElementById("btn-adm");
const inputTokenVip = document.getElementById("input-token-vip");

const parseServerUrl = "https://parseapi.back4app.com/"
const headers = {
  "X-Parse-Application-Id": "EtXU3jV6pXkDHC5aRDi2ewMJbq3giWgbfBSeIlNq",
  "X-Parse-REST-API-Key": "4P3E1V7SmTX23TsXSEHyo8N7Q8aVgK9H47uGTWYr",
  "X-Parse-Revocable-Session": "1",
};

const headersJson = {
  ...headers,
  "Content-Type": "application/json",
};


document.addEventListener("DOMContentLoaded", () => { //Reset of all localStorage
    localStorage.clear();
    history.pushState(null, null, location.href);
});
 
const loginUserVip = async (userVipId, mainUsername, mainIcon, sessionToken, baseUserId) => {
    const userVipResponse = await fetch(`${parseServerUrl}/classes/UserVip/${userVipId}`, {
        method: "GET",
        headers: {
            ...headersJson,
        }
    });

    if (userVipResponse.ok) {
        const userVipData = await userVipResponse.json();

        if (userVipData.tokenVip === inputTokenVip.value) {
            localStorage.setItem("usernameOne", mainUsername);
            localStorage.setItem("usernameTwo", userVipData.usernameTwo);
            localStorage.setItem("usernameThree", userVipData.usernameThree);
            localStorage.setItem("iconUserOne", mainIcon);
            localStorage.setItem("iconUserTwo", userVipData.iconUserTwo.url);
            localStorage.setItem("iconUserThree", userVipData.iconUserThree.url);
            localStorage.setItem("userVipId", userVipData.objectId);
            localStorage.setItem("userId", baseUserId);
            localStorage.setItem("sessionToken", sessionToken);
            window.location.href = "iconVips.html";
        } else {
            failAlert.textContent = "TOKEN INVÁLIDO";
        }

    } else {
        failAlert.textContent = "falha no login do usuarioVIP: "+ await userVipResponse.text();
    }
}

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
            
            if (!responseData.UserVip) {
                localStorage.setItem("username", responseData.username);
                localStorage.setItem("userId", responseData.objectId);
                localStorage.setItem("sessionToken", responseData.sessionToken);
                localStorage.setItem("iconUser", responseData.icon.url);
                failAlert.textContent = "";
                window.location.href = "icon.html";
            } else if (responseData.UserVip) {
                let userVipId = responseData.UserVip.objectId;
                loginUserVip(userVipId, responseData.username, responseData.icon.url, responseData.sessionToken, responseData.objectId);
            }
            
        } else {
            failAlert.textContent = "falha no login: Essa conta não existe.";
        }
    } catch (error) {
        failAlert.textContent = error;
    }
});