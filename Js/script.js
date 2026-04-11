const form = document.getElementById('form-planner');
const bodyTable = document.querySelector('tbody');
const inputName = document.getElementById('contact-name');
const inputNumber = document.getElementById('contact-number');

// evento do formulário
form.addEventListener('submit', function (e) {
    e.preventDefault();
    addContact();
});

// 🔹 adicionar contato (POST)
async function addContact() {
    const name = inputName.value.trim();
    const number = inputNumber.value.trim();

    if (!name) {
        alert('Digite o nome do contato');
        return;
    }

    if (!number) {
        alert('Digite o número');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/contatos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome: name, numero: number })
        });

        const data = await response.json();

        if (response.ok) {
            console.log(data);

            // 🔥 atualiza direto do banco (melhor prática)
            await carregarContatos();

            inputName.value = '';
            inputNumber.value = '';
            inputName.focus();

        } else {
            console.error(data);
            alert('Erro ao salvar no servidor');
        }

    } catch (error) {
        console.error('Erro ao salvar:', error);
        alert('Erro ao salvar contato');
    }
}

// 🔹 carregar contatos do banco (GET)
async function carregarContatos() {
    try {
        const response = await fetch('http://localhost:3000/contatos');
        const contatos = await response.json();

        bodyTable.innerHTML = '';

        contatos.forEach(contact => {
            adicionarLinhaTabela({
                id: contact.id, // 🔥 IMPORTANTE
                name: contact.nome,
                number: contact.numero
            });
        });

    } catch (error) {
        console.error('Erro ao carregar contatos:', error);
    }
}

// 🔹 adicionar linha na tabela
function adicionarLinhaTabela(contact) {
    const linha = document.createElement('tr');

    const celulaName = document.createElement('td');
    celulaName.textContent = contact.name;

    const celulaNumber = document.createElement('td');
    celulaNumber.textContent = contact.number;

    // 🔴 botão deletar
    const celulaAcao = document.createElement('td');
    const botaoDelete = document.createElement('button');
    botaoDelete.textContent = 'Excluir';

    botaoDelete.addEventListener('click', () => {
        deletarContato(contact.id);
    });

    celulaAcao.appendChild(botaoDelete);

    linha.appendChild(celulaName);
    linha.appendChild(celulaNumber);
    linha.appendChild(celulaAcao);

    bodyTable.appendChild(linha);
}

// 🔹 deletar contato
async function deletarContato(id) {
    try {
        const response = await fetch(`http://localhost:3000/contatos/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            console.log('Contato deletado');

            //  atualiza lista
            await carregarContatos();
        } else {
            alert('Erro ao deletar');
        }

    } catch (error) {
        console.error('Erro ao deletar:', error);
    }
}

// 🔹 executa ao abrir a página
carregarContatos();