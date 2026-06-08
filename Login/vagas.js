const setores = {
    "Setor A": [
        { vaga: "A-01", status: "free", texto: "Livre" },
        { vaga: "A-02", status: "busy", texto: "ABC-1D23" },
        { vaga: "A-03", status: "busy", texto: "DBS-2A44" },
        { vaga: "A-04", status: "busy", texto: "FRT-8K91" },
        { vaga: "A-05", status: "free", texto: "Livre" },
        { vaga: "A-06", status: "reserved", texto: "Reservada" },
        { vaga: "A-07", status: "free", texto: "Livre" },
        { vaga: "A-08", status: "busy", texto: "HJK-7P12" }
    ],
    "Setor B": [
        { vaga: "B-01", status: "busy", texto: "PRK-5L07" },
        { vaga: "B-02", status: "free", texto: "Livre" },
        { vaga: "B-03", status: "free", texto: "Livre" },
        { vaga: "B-04", status: "busy", texto: "KLM-3Q88" },
        { vaga: "B-05", status: "reserved", texto: "Reservada" },
        { vaga: "B-06", status: "free", texto: "Livre" }
    ],
    "Setor C": [
        { vaga: "C-01", status: "free", texto: "Livre" },
        { vaga: "C-02", status: "busy", texto: "TRP-9J21" },
        { vaga: "C-03", status: "busy", texto: "NVB-4C10" },
        { vaga: "C-04", status: "free", texto: "Livre" },
        { vaga: "C-05", status: "reserved", texto: "Reservada" },
        { vaga: "C-06", status: "free", texto: "Livre" }
    ]
};

let setorAtual = "Setor A";

const botoesSetor = document.querySelectorAll(".sector-tabs button");
const gradeVagas = document.querySelector(".parking-grid");
const botaoAtualizarVagas = document.querySelector(".panel-title .primary-button");

function renderizarVagas(){
    gradeVagas.innerHTML = "";

    setores[setorAtual].forEach(function(vaga){
        const item = document.createElement("div");
        item.className = "parking-spot " + vaga.status;
        item.innerHTML = `
            <strong>${vaga.vaga}</strong>
            <span>${vaga.texto}</span>
        `;
        gradeVagas.appendChild(item);
    });

    atualizarCardsVagas();
}

function atualizarCardsVagas(){
    const todasVagas = Object.values(setores).flat();
    const livres = todasVagas.filter(function(vaga){
        return vaga.status === "free";
    }).length;
    const ocupadas = todasVagas.filter(function(vaga){
        return vaga.status === "busy";
    }).length;
    const reservadas = todasVagas.filter(function(vaga){
        return vaga.status === "reserved";
    }).length;
    const cards = document.querySelectorAll(".toprightcards2 .card h2");

    if(cards[0]){
        cards[0].textContent = todasVagas.length;
    }

    if(cards[1]){
        cards[1].textContent = livres;
    }

    if(cards[2]){
        cards[2].textContent = ocupadas;
    }

    if(cards[3]){
        cards[3].textContent = reservadas;
    }
}

botoesSetor.forEach(function(botao){
    botao.addEventListener("click", function(){
        botoesSetor.forEach(function(item){
            item.classList.remove("active");
        });

        botao.classList.add("active");
        setorAtual = botao.textContent;
        renderizarVagas();
    });
});

botaoAtualizarVagas.addEventListener("click", function(){
    const primeiraLivre = setores[setorAtual].find(function(vaga){
        return vaga.status === "free";
    });

    if(primeiraLivre){
        primeiraLivre.status = "busy";
        primeiraLivre.texto = "NOVO-01";
        renderizarVagas();
    }
});

renderizarVagas();
