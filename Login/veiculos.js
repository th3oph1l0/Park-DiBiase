const veiculosIniciais = [
    { placa: "ABC-1D23", modelo: "Honda Civic", dono: "Marcos Lima", tipo: "Carro", status: "Estacionado" },
    { placa: "FRT-8K91", modelo: "Fiat Toro", dono: "Ana Souza", tipo: "Utilitário", status: "Estacionado" },
    { placa: "PRK-5L07", modelo: "Yamaha Fazer", dono: "João Pereira", tipo: "Moto", status: "Fora do pátio" },
    { placa: "DBS-2A44", modelo: "Volkswagen Gol", dono: "Carla Santos", tipo: "Carro", status: "Fora do pátio" }
];

let veiculos = JSON.parse(localStorage.getItem("veiculosMock")) || veiculosIniciais;
let veiculoEditando = null;

const tabelaVeiculos = document.querySelector(".vehicle-table tbody");
const buscaVeiculo = document.querySelector("#busca");
const tipoVeiculo = document.querySelector("#tipo");
const statusVeiculo = document.querySelector("#status");
const formVeiculo = document.querySelector(".vehicle-form");

function salvarVeiculos(){
    localStorage.setItem("veiculosMock", JSON.stringify(veiculos));
}

function badgeStatus(status){
    if(status === "Estacionado"){
        return `<span class="badge parked">${status}</span>`;
    }

    return `<span class="badge outside">${status}</span>`;
}

function renderizarVeiculos(){
    const busca = buscaVeiculo.value.toUpperCase();
    const tipo = tipoVeiculo.value;
    const status = statusVeiculo.value;

    const filtrados = veiculos.filter(function(veiculo){
        const combinaBusca = veiculo.placa.includes(busca) || veiculo.modelo.toUpperCase().includes(busca) || veiculo.dono.toUpperCase().includes(busca);
        const combinaTipo = tipo === "Todos" || veiculo.tipo === tipo;
        const combinaStatus = status === "Todos" || veiculo.status === status;

        return combinaBusca && combinaTipo && combinaStatus;
    });

    tabelaVeiculos.innerHTML = "";

    filtrados.forEach(function(veiculo){
        const linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${veiculo.placa}</td>
            <td>${veiculo.modelo}</td>
            <td>${veiculo.dono}</td>
            <td>${veiculo.tipo}</td>
            <td>${badgeStatus(veiculo.status)}</td>
            <td class="actions">
                <button type="button" data-action="detalhes" data-placa="${veiculo.placa}">Detalhes</button>
                <button type="button" data-action="editar" data-placa="${veiculo.placa}">Editar</button>
                <button type="button" data-action="excluir" data-placa="${veiculo.placa}">Excluir</button>
            </td>
        `;
        tabelaVeiculos.appendChild(linha);
    });

    atualizarCardsVeiculos();
}

function atualizarCardsVeiculos(){
    const cards = document.querySelectorAll(".toprightcards2 .card h2");
    const estacionados = veiculos.filter(function(veiculo){
        return veiculo.status === "Estacionado";
    }).length;

    if(cards[0]){
        cards[0].textContent = estacionados;
    }

    if(cards[1]){
        cards[1].textContent = veiculos.length - estacionados;
    }

    if(cards[2]){
        cards[2].textContent = veiculos.length;
    }
}

function limparFormulario(){
    formVeiculo.reset();
    veiculoEditando = null;
    formVeiculo.querySelector("button").textContent = "Cadastrar veículo";
}

formVeiculo.addEventListener("submit", function(e){
    e.preventDefault();

    const novoVeiculo = {
        placa: document.querySelector("#placa").value.toUpperCase(),
        modelo: document.querySelector("#modelo").value,
        dono: document.querySelector("#proprietario").value,
        tipo: "Carro",
        status: document.querySelector("#vaga").value ? "Estacionado" : "Fora do pátio"
    };

    if(!novoVeiculo.placa || !novoVeiculo.modelo || !novoVeiculo.dono){
        alert("Preencha placa, modelo e dono.");
        return;
    }

    if(veiculoEditando){
        veiculos = veiculos.map(function(veiculo){
            if(veiculo.placa === veiculoEditando){
                return novoVeiculo;
            }

            return veiculo;
        });
    }else{
        veiculos.push(novoVeiculo);
    }

    salvarVeiculos();
    limparFormulario();
    renderizarVeiculos();
});

tabelaVeiculos.addEventListener("click", function(e){
    const botao = e.target.closest("button");

    if(!botao){
        return;
    }

    const placa = botao.dataset.placa;
    const acao = botao.dataset.action;
    const veiculo = veiculos.find(function(item){
        return item.placa === placa;
    });

    if(acao === "detalhes"){
        alert(`${veiculo.placa} - ${veiculo.modelo}\nDono: ${veiculo.dono}\nStatus: ${veiculo.status}`);
    }

    if(acao === "editar"){
        document.querySelector("#placa").value = veiculo.placa;
        document.querySelector("#modelo").value = veiculo.modelo;
        document.querySelector("#proprietario").value = veiculo.dono;
        document.querySelector("#vaga").value = veiculo.status === "Estacionado" ? "A-01" : "";
        veiculoEditando = veiculo.placa;
        formVeiculo.querySelector("button").textContent = "Salvar alterações";
    }

    if(acao === "excluir"){
        const confirmar = confirm("Deseja excluir este veículo?");

        if(confirmar){
            veiculos = veiculos.filter(function(item){
                return item.placa !== placa;
            });

            salvarVeiculos();
            renderizarVeiculos();
        }
    }
});

buscaVeiculo.addEventListener("input", renderizarVeiculos);
tipoVeiculo.addEventListener("change", renderizarVeiculos);
statusVeiculo.addEventListener("change", renderizarVeiculos);

renderizarVeiculos();
