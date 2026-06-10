document.querySelector("form").addEventListener("submit", function(e){

    e.preventDefault();

    const usuario = document.querySelector("#usuario").value;
    const senha = document.querySelector("#senha").value;

    if(usuario === "123" && senha === "teste123"){

        localStorage.setItem("logado", "true");

        window.location.href = "dashboard.html";

    }else{

        mostrarAlerta("Acesso negado", "Usuário ou senha inválidos", "error");

    }

});
