// Array inicial simulando um banco de dados
let colaboradores = [
    { id: 1, nome: "Miguel Theophilo", matricula: "UGB-001", acesso: "Acesso Total", senha: "123" },
    { id: 2, nome: "Carlos Souza", matricula: "UGB-042", acesso: "APP Operacional", senha: "123" }
];

let idAtual = 2; // Simulador de Auto-Increment do ID

// Referências do DOM
const formUsuario = document.getElementById('formUsuario');
const tabelaUsuarios = document.getElementById('tabelaUsuarios');
const inputNome = document.getElementById('nome');
const inputMatricula = document.getElementById('matricula');
const inputAcesso = document.getElementById('acesso');
const inputSenha = document.getElementById('senha');
const inputEditId = document.getElementById('editId');
const formTitle = document.getElementById('formTitle');
const btnSalvar = document.getElementById('btnSalvar');
const btnCancelar = document.getElementById('btnCancelar');

// READ: Função para renderizar os dados na tabela
function renderizarTabela() {
    tabelaUsuarios.innerHTML = '';

    colaboradores.forEach(colaborador => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td><strong>${colaborador.matricula}</strong></td>
            <td>${colaborador.nome}</td>
            <td><span class="badge ${colaborador.acesso === 'APP Operacional' ? 'outside' : 'parked'}">${colaborador.acesso}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn-edit" onclick="editarColaborador(${colaborador.id})"><i class="fa-solid fa-pen"></i> Editar</button>
                    <button class="btn-delete" onclick="deletarColaborador(${colaborador.id})"><i class="fa-solid fa-trash"></i> Excluir</button>
                </div>
            </td>
        `;
        tabelaUsuarios.appendChild(tr);
    });
}

// CREATE & UPDATE: Evento de envio do formulário
formUsuario.addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = inputNome.value.trim();
    const matricula = inputMatricula.value.trim();
    const acesso = inputAcesso.value;
    const senha = inputSenha.value;
    const editId = inputEditId.value;

    // Validação básica (a matrícula já está com 'required' no HTML, mas garantimos aqui)
    if (!matricula) {
        mostrarAlerta("Campo obrigatório", "O número de matrícula é obrigatório!", "warning");
        return;
    }

    if (editId) {
        // UPDATE (Atualizar existente)
        const index = colaboradores.findIndex(c => c.id == editId);
        if (index !== -1) {
            colaboradores[index] = { id: Number(editId), nome, matricula, acesso, senha };
            mostrarToast('Colaborador atualizado com sucesso!', 'success');
        }
        resetarFormulario();
    } else {
        // CREATE (Criar novo)
        // Checagem extra: evitar matrícula duplicada
        const matriculaExiste = colaboradores.some(c => c.matricula === matricula);
        if (matriculaExiste) {
            mostrarAlerta('Matrícula duplicada', 'Já existe um colaborador registrado com essa matrícula.', 'warning');
            return;
        }

        idAtual++;
        colaboradores.push({ id: idAtual, nome, matricula, acesso, senha });
        mostrarToast('Colaborador registrado com sucesso!', 'success');
        formUsuario.reset();
    }

    renderizarTabela();
});

// UPDATE (Preparar form): Função chamada pelo botão "Editar"
window.editarColaborador = function(id) {
    const colaborador = colaboradores.find(c => c.id === id);
    if (colaborador) {
        inputNome.value = colaborador.nome;
        inputMatricula.value = colaborador.matricula;
        inputAcesso.value = colaborador.acesso;
        inputSenha.value = colaborador.senha;
        inputEditId.value = colaborador.id;

        formTitle.textContent = "Editar Colaborador";
        btnSalvar.textContent = "Atualizar Cadastro";
        btnCancelar.style.display = "inline-block";
        
        // Dá scroll para o topo suavemente para focar no formulário
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// DELETE: Função chamada pelo botão "Excluir"
window.deletarColaborador = async function(id) {
    const confirmar = await confirmarAcao("Remover colaborador", "Tem certeza que deseja remover este colaborador? O acesso dele será revogado.", "Remover");
    
    if (confirmar) {
        colaboradores = colaboradores.filter(c => c.id !== id);
        renderizarTabela();
        mostrarToast('Colaborador removido.', 'success');
    }
}

// Utilitário: Cancelar edição e limpar form
btnCancelar.addEventListener('click', resetarFormulario);

function resetarFormulario() {
    formUsuario.reset();
    inputEditId.value = "";
    formTitle.textContent = "Registrar Novo Colaborador";
    btnSalvar.textContent = "Salvar Colaborador";
    btnCancelar.style.display = "none";
}

// Inicialização
renderizarTabela();
