let movimentacoes = [
    { tipo: "Entrada", placa: "ABC-1D23", modelo: "Honda Civic", horario: "08:12", texto: "Honda Civic entrou às 08:12 na vaga A-04.", permanencia: "1h 08min" },
    { tipo: "Saída", placa: "PRK-5L07", modelo: "Yamaha Fazer", horario: "09:20", texto: "Yamaha Fazer saiu após registro na cancela principal.", permanencia: "42min" },
    { tipo: "Entrada", placa: "FRT-8K91", modelo: "Fiat Toro", horario: "08:45", texto: "Fiat Toro entrou às 08:45 na vaga B-12.", permanencia: "35min" }
];

const listaMovimentacoes = document.querySelector(".movement-list");
const filtroPlaca = document.querySelector("#placa");
const filtroTipo = document.querySelector("#movimento");
const filtroPeriodo = document.querySelector("#periodo");
const botaoAtualizar = document.querySelector(".panel-title .primary-button");

function classeMovimento(tipo){
    if(tipo === "Entrada"){
        return "badge parked";
    }

    return "badge outside";
}

function renderizarMovimentacoes(){
    const placa = filtroPlaca.value.toUpperCase();
    const tipo = filtroTipo.value;

    const filtradas = movimentacoes.filter(function(movimentacao){
        const combinaPlaca = movimentacao.placa.includes(placa);
        const combinaTipo = tipo === "Todos" || movimentacao.tipo === tipo;

        return combinaPlaca && combinaTipo;
    });

    listaMovimentacoes.innerHTML = "";

    filtradas.forEach(function(movimentacao){
        const item = document.createElement("article");
        item.className = "movement-item";
        item.innerHTML = `
            <div class="camera-box">IMG</div>
            <div>
                <span class="${classeMovimento(movimentacao.tipo)}">${movimentacao.tipo}</span>
                <h3>${movimentacao.placa}</h3>
                <p>${movimentacao.texto}</p>
            </div>
            <div class="movement-time">
                <strong>${movimentacao.horario}</strong>
                <span>permanência: ${movimentacao.permanencia}</span>
            </div>
        `;
        listaMovimentacoes.appendChild(item);
    });

    atualizarCardsMovimentacoes();
}

function atualizarCardsMovimentacoes(){
    const cards = document.querySelectorAll(".toprightcards2 .card h2");
    const entradas = movimentacoes.filter(function(movimentacao){
        return movimentacao.tipo === "Entrada";
    }).length;
    const saidas = movimentacoes.filter(function(movimentacao){
        return movimentacao.tipo === "Saída";
    }).length;

    if(cards[0]){
        cards[0].textContent = entradas;
    }

    if(cards[1]){
        cards[1].textContent = saidas;
    }

    if(cards[2]){
        cards[2].textContent = entradas - saidas;
    }

    if(cards[3] && movimentacoes[0]){
        cards[3].textContent = movimentacoes[0].horario;
    }
}

botaoAtualizar.addEventListener("click", function(){
    const novaMovimentacao = {
        tipo: "Entrada",
        placa: "LFD-2T25",
        modelo: "Chevrolet Onix",
        horario: "09:45",
        texto: "Chevrolet Onix entrou às 09:45 na vaga C-06.",
        permanencia: "agora"
    };

    movimentacoes.unshift(novaMovimentacao);
    renderizarMovimentacoes();
    mostrarToast("Movimentação adicionada à lista.", "success");
});

filtroPlaca.addEventListener("input", renderizarMovimentacoes);
filtroTipo.addEventListener("change", function(){
    renderizarMovimentacoes();
    mostrarToast("Filtro de tipo aplicado.", "info");
});
filtroPeriodo.addEventListener("change", function(){
    renderizarMovimentacoes();
    mostrarToast("Período atualizado.", "info");
});

renderizarMovimentacoes();
