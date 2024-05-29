document.addEventListener("DOMContentLoaded", () => {
  const btnCriarConta = document.getElementById("btn-criar-conta");

  btnCriarConta.addEventListener("click", () => {
    function generateToken() {
      let chars =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let tokenNumber = "";
      for (let i = 0; i < 20; i++) {
        tokenNumber += chars[Math.floor(Math.random() * chars.length)];
      }
      return tokenNumber;
    }

    // Token criado para guardar no banco de dados
    let token = generateToken();
    console.log("Token gerado: " + token);
    const p = document.getElementById('token')
    p.innerHTML = token;
  });
});


