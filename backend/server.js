const express = require('express');

const app = express();

// rota principal
app.get('/', (req, res) => {
    res.json({ message: 'Servidor funcionando 🚀' });
});

// rota contatos
app.get('/contatos', (req, res) => {
    const contatos = [
        { id: 1, nome: 'João', telefone: '123456789' },
        { id: 2, nome: 'Maria', telefone: '987654321' },
    ];
    res.json(contatos);
});

// ligar servidor (sempre no final)
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});