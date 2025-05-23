const express = require('express');
const cors = require('cors');
const db = require('./db.js');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
    origin: '*',
}));


// Arquivos estáticos:
app.use(express.static(path.join(__dirname, './frontend')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/painel.html'));
});

app.get('/vendedores_page', (req, res) => {
    res.sendFile(path.join(__dirname, './frontend/vendedor.html'));
});




app.get('/vendas', (req, res) => {
    const { data } = req.query;

    if (!data) {
        return res.status(400).json({ erro: 'Parâmetro "data" é obrigatório.' });
    }

    const query = `
        SELECT v.id, v.valor, v.data, ve.nome AS vendedor
        FROM vendas v
        JOIN vendedores ve ON v.vendedor_id = ve.id
        WHERE v.data = ?
    `;

    db.query(query, [data], (err, results) => {
        if (err) {
            console.error('Erro ao consultar vendas:', err);
            return res.status(500).send('Erro ao consultar vendas');
        }
        res.json(results);
    });
});

app.get('/vendedores', (req, res) => {
    const query = 'SELECT * FROM vendedores';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao consultar vendedores:', err);
            return res.status(500).send('Erro ao consultar vendedores');
        }
        res.json(results);
    });

})


app.post('/vendas', (req, res) => {
    const {valorFormatado, dataFormatada, vendedor_id} = req.body;
    if (!valorFormatado || !dataFormatada || !vendedor_id) {
        return res.status(400).json({ erro: 'Parâmetros "valor", "data" e "vendedor_id" são obrigatórios.' });
    }
    
    const query = "INSERT INTO vendas (vendedor_id, data, valor) VALUES (?, ?, ?)";
    const values = [vendedor_id, dataFormatada, valorFormatado];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Erro ao inserir venda:', err);
            return res.status(500).send('Erro ao inserir venda');
        }
        res.status(201).json({ id: results.insertId, vendedor_id, dataFormatada, valorFormatado });
    });
})




app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
})