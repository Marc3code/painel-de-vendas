const db = require('mysql2');

const conn =db.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Marc3code',
    database: 'painel_vendas_riachao'
})

conn.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao bd:', err);
        return;
    }
    console.log('Conectado ao bd!');
})

module.exports = conn;


