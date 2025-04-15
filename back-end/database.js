const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./anamnese.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the database.');
    }
});


db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS anamnese (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        artista TEXT NOT NULL,
        valor_da_sessao INTEGER NOT NULL,
        data_da_sessao TEXT NOT NULL,
        nome_cliente TEXT NOT NULL,
        genero TEXT NOT NULL,
        idade INTEGER NOT NULL,
        CPF INTEGER NOT NULL,
        cidade TEXT NOT NULL,
        uf TEXT NOT NULL,
        telefone INTEGER NOT NULL,
        email TEXT NOT NULL,
        problema_saude TEXT NOT NULL,
        medicacao TEXT NOT NULL,
        alergia TEXT NOT NULL,
        doenca TEXT NOT NULL,
        queloide TEXT NOT NULL,
        alcool_ultimas_24h TEXT NOT NULL,
        antibioticos_recentes TEXT NOT NULL,
        tatuagens_anteriores TEXT NOT NULL,
        data_sessao INTEGERS NOT NULL
        signature BLOB NOT NULL
    )`);
});

module.exports = db;