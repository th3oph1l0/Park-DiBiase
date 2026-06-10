function mostrarToast(mensagem, tipo){
    if(window.Swal){
        Swal.fire({
            toast: true,
            position: "top-end",
            icon: tipo,
            title: mensagem,
            showConfirmButton: false,
            timer: 2200,
            timerProgressBar: true
        });
        return;
    }

    alert(mensagem);
}

function mostrarAlerta(titulo, mensagem, tipo){
    if(window.Swal){
        Swal.fire({
            title: titulo,
            text: mensagem,
            icon: tipo,
            confirmButtonColor: "#123d92"
        });
        return;
    }

    alert(titulo + "\n" + mensagem);
}

function confirmarAcao(titulo, mensagem, textoConfirmar){
    if(window.Swal){
        return Swal.fire({
            title: titulo,
            text: mensagem,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: textoConfirmar,
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#123d92",
            cancelButtonColor: "#6b7280"
        }).then(function(resultado){
            return resultado.isConfirmed;
        });
    }

    return Promise.resolve(confirm(mensagem));
}
