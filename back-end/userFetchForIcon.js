const iconPlace1 = document.getElementById("image1");
const username = localStorage.getItem("username");
const userId = localStorage.getItem("userId");
const sayWelcomeForUser = document.getElementById("welcome");
const onlyTheName = document.getElementById("username-p1");

Parse.initialize(
    'EtXU3jV6pXkDHC5aRDi2ewMJbq3giWgbfBSeIlNq', 
    'njI84kVFD1aLWtWrEksmiEqHgjUBMpqxLhreMvDu'
);
Parse.serverURL = 'https://parseapi.back4app.com/';

const headers = {
    "X-Parse-Application-Id": "EtXU3jV6pXkDHC5aRDi2ewMJbq3giWgbfBSeIlNq",
    "X-Parse-REST-API-Key": "4P3E1V7SmTX23TsXSEHyo8N7Q8aVgK9H47uGTWYr",
    "X-Parse-Session-Token": localStorage.getItem("sessionToken"),
};
const headersJson = {
    ...headers,
    "Content-Type": "application/json",
};
const userUrl = "https://parseapi.back4app.com/classes/_User";

document.addEventListener("DOMContentLoaded", () => {
    if (username) {
        const usernameUpdate = username.charAt(0).toUpperCase() + username.slice(1);

        sayWelcomeForUser.textContent = `Boas Vindas, ${usernameUpdate}. Quer entrar no nosso mundo?`;
        onlyTheName.textContent = usernameUpdate;
    } else {
        console.log("Nome do usuário não encontrado.");
    }

    getImageOfUser(userId);
});

const getImageOfUser = async (userID) => {
    try {
        const response = await fetch(`${userUrl}/${userID}`, {
            method: "GET",
            headers: headersJson,
        });

        if (!response.ok) {
            throw new Error(`Erro ao obter o usuário: ${response.status}`);
        }

        const userData = await response.json();

        if (userData.icon && userData.icon.url) {
            iconPlace1.src = userData.icon.url;
        } else {
            console.error("Imagem do usuário não encontrada.");
        }

    } catch (error) {
        console.error('Erro ao obter o usuário:', error);
        return null;
    }
};

// Função para atualizar a imagem do usuário
const putImageOfUser = async (userID, file) => {
    try {
        const parseFile = new Parse.File(file.name, file);

        await parseFile.save();

        const fileUrl = parseFile.url();

        const values = {
            __type: "File",
            name: parseFile._name,
            url: fileUrl
        };

        const response = await fetch(`${userUrl}/${userID}`, {
            method: "PUT",
            headers: headersJson,
            body: JSON.stringify({ icon: values })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erro ao atualizar o usuário:', errorData);
            throw new Error('Erro ao atualizar o usuário.');
        } else {
            const responseData = await response.json();
            console.log('Usuário atualizado com sucesso:', responseData);
        }
    } catch (error) {
        console.error('Erro ao adicionar imagem:', error);
        return null;
    }
};

const updateImage = (inputId, imageId) => {
    const inputFile = document.getElementById(inputId);
    const icon = document.getElementById(imageId);

    if (inputFile) {
        inputFile.addEventListener("change", () => {
            const file = inputFile.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    icon.src = e.target.result;
                    putImageOfUser(localStorage.getItem("userId"), file);
                };
                reader.readAsDataURL(file);
            }
        });
    }
};

updateImage("insert1", "image1");
