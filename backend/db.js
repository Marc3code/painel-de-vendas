const db = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const conn =db.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

conn.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao bd:', err);
        return;
    }
    console.log('Conectado ao bd!');
})

module.exports = conn;


