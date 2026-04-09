const form = document.getElementById('form-planner');
const bodyTable = document.querySelector('tbody');
const inputName = document.getElementById('contact-name');
const inputNumber= document.getElementById('contact-number');

const contacts = [];

form.addEventListener('submit', function(e){
    e.preventDefault();
    addContact();
});

function addContact() {
    const name = inputName.value.trim();
    const number = inputNumber.value.trim();

    if(!name) {
        alert('Digite o nome do contato');
        return;
    }

    if(!number) {
        alert('Digite o número');
        return;
    }

    const contact = { name, number };
    contacts.push(contact);

    adicionarLinhaTabela(contact);

    inputName.value = '';
    inputNumber.value = '';
    inputName.focus();
}

function adicionarLinhaTabela(contact) {
    const linha = document.createElement('tr');

    const celulaName = document.createElement('td');
    celulaName.textContent = contact.name;

    const celulaNumber = document.createElement('td');
    celulaNumber.textContent = contact.number;

    linha.appendChild(celulaName);
    linha.appendChild(celulaNumber);

    bodyTable.appendChild(linha);
}