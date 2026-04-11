require('dotenv').config();
const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar:', err);
    } else {
        console.log('Conectado ao MySQL 🚀');
    }
});

// rota principal
app.get('/', (req, res) => {
    res.json({ message: 'Servidor funcionando 🚀' });
});

// GET contatos
app.get('/contatos', (req, res) => {
    db.query('SELECT * FROM contatos', (err, results) => {
        if (err) {
            return res.status(500).json({ erro: 'Erro no banco' });
        }
        res.json(results);
    });
});

// POST contatos
app.post('/contatos', (req, res) => {
    const { nome, numero } = req.body;

    db.query(
        'INSERT INTO contatos (nome, numero) VALUES (?, ?)',
        [nome, numero],
        (err) => {
            if (err) {
                return res.status(500).json({ erro: 'Erro ao salvar' });
            }
            res.json({ message: 'Contato salvo com sucesso' });
        }
    );
});

// DELETE contato
app.delete('/contatos/:id', (req, res) => {
    const { id } = req.params;

    db.query(
        'DELETE FROM contatos WHERE id = ?',
        [id],
        (err) => {
            if (err) {
                return res.status(500).json({ erro: 'Erro ao deletar' });
            }
            res.json({ message: 'Contato deletado' });
        }
    );
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});