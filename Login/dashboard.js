const dashboardData = {
    totalVeiculos: 48,
    entradas: 31,
    saidas: 17,
    vagas: 22,
    ocupacao: 68,
    ultimaAtualizacao: "09:20",
    ultimos: [
        { placa: "ABC-1D23", entrada: "08:12", vaga: "A-04" },
        { placa: "FRT-8K91", entrada: "08:45", vaga: "B-12" },
        { placa: "PRK-5L07", entrada: "09:20", vaga: "C-02" }
    ]
};

function atualizarDashboard(){
    document.querySelector("#totalVeiculos").textContent = dashboardData.totalVeiculos;
    document.querySelector("#totalEntradas").textContent = dashboardData.entradas;
    document.querySelector("#totalSaidas").textContent = dashboardData.saidas;
    document.querySelector("#totalVagas").textContent = dashboardData.vagas;

    const linhasAntigas = document.querySelectorAll(".bottomright2 .table-row");

    linhasAntigas.forEach(function(linha){
        linha.remove();
    });

    const blocoRegistros = document.querySelector(".bottomright2");

    dashboardData.ultimos.forEach(function(veiculo){
        const linha = document.createElement("div");
        linha.className = "table-row";
        linha.innerHTML = `
            <span>${veiculo.placa}</span>
            <span>${veiculo.entrada}</span>
            <span>${veiculo.vaga}</span>
        `;
        blocoRegistros.appendChild(linha);
    });

    const ocupacao = document.querySelector(".summary-item strong");
    const barra = document.querySelector(".progress-bar span");
    const resumoItens = document.querySelectorAll(".summary-item strong");

    if(ocupacao){
        ocupacao.textContent = dashboardData.ocupacao + "%";
    }

    if(barra){
        barra.style.width = dashboardData.ocupacao + "%";
    }

    if(resumoItens[1]){
        resumoItens[1].textContent = dashboardData.entradas + dashboardData.saidas;
    }

    if(resumoItens[2]){
        resumoItens[2].textContent = dashboardData.ultimaAtualizacao;
    }
}

atualizarDashboard();
