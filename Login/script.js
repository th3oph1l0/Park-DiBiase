document.querySelector("form").addEventListener("submit", function(e){

    e.preventDefault();

    const usuario = document.querySelector("#usuario").value;
    const senha = document.querySelector("#senha").value;

    if(usuario === "admin" && senha === "123"){

        localStorage.setItem("logado", "true");

        window.location.href = "dashboard.html";

    }else{

        alert("Usuário ou senha inválidos");

    }

});