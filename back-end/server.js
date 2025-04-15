const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const port = 3000;

// middleware
app.use(cors());
app.use(bodyParser.json());

// CREATE 
app.post('/anamnese', (req, res) => {
    const {
        artistName,
        price,
        sessionDate,
        clientName,
        gender,
        age,
        clientDocument,
        city,
        state,
        clientPhone,
        clientEmail,
        healthProblems1,
        meds,
        allergies,
        healthProblems2,
        keloid,
        alcohol,
        antibiotics,
        previousTattoos
    } = req.body;

    console.log('Received data:', req.body); // Log received data

    const sql = `INSERT INTO anamnese (
        artista,
        valor_da_sessao,
        data_da_sessao,
        nome_cliente,
        genero,
        idade,
        CPF,
        cidade,
        uf,
        telefone,
        email,
        problema_saude,
        medicacao,
        alergia,
        doenca,
        queloide,
        alcool_ultimas_24h,
        antibioticos_recentes,
        tatuagens_anteriores,
        data_sessao
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    db.run(sql, [
        artistName,
        price,
        sessionDate,
        clientName,
        gender,
        age,
        clientDocument,
        city,
        state,
        clientPhone,
        clientEmail,
        healthProblems1,
        meds,
        allergies,
        healthProblems2,
        keloid,
        alcohol,
        antibiotics,
        previousTattoos,
        sessionDate
    ], (err) => {
        if (err) {
            console.error('Database error:', err.message); // Log database error
            return res.status(500).json({ error: 'An internal server error occurred.' });
        }
        res.json({ success: true, message: 'Form data received.' });
    });
});

// READ
app.get('/anamnese/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM anamnese WHERE id = ?`;
    db.get(sql, [id], (err, row) => {
        if (err) {
            console.error('Database error:', err.message); // Log database error
            return res.status(500).json({ error: 'An internal server error occurred.' });
        }
        res.json(row || { error: 'Form data not found.' });
    });
});

// UPDATE: update data by id
app.put('/anamnese/:id', (req, res) => {
    const { id } = req.params;
    const {
        artistName,
        price,
        sessionDate,
        clientName,
        gender,
        age,
        clientDocument,
        city,
        state,
        clientPhone,
        clientEmail,
        healthProblems1,
        meds,
        allergies,
        healthProblems2,
        keloid,
        alcohol,
        antibiotics,
        previousTattoos
    } = req.body;

    console.log('Updating data for ID:', id); // Log ID being updated
    console.log('Received data:', req.body); // Log received data

    const sql = `UPDATE anamnese SET
        artista = ?,
        valor_da_sessao = ?,
        data_da_sessao = ?,
        nome_cliente = ?,
        genero = ?,
        idade = ?,
        CPF = ?,
        cidade = ?,
        uf = ?,
        telefone = ?,
        email = ?,
        problema_saude = ?,
        medicacao = ?,
        alergia = ?,
        doenca = ?,
        queloide = ?,
        alcool_ultimas_24h = ?,
        antibioticos_recentes = ?,
        tatuagens_anteriores = ?,
        data_sessao = ?
        WHERE id = ?`;
    db.run(sql, [
        artistName,
        price,
        sessionDate,
        clientName,
        gender,
        age,
        clientDocument,
        city,
        state,
        clientPhone,
        clientEmail,
        healthProblems1,
        meds,
        allergies,
        healthProblems2,
        keloid,
        alcohol,
        antibiotics,
        previousTattoos,
        sessionDate,
        id
    ], function(err) {
        if (err) {
            console.error('Database error:', err.message); // Log database error
            return res.status(500).json({ error: 'An internal server error occurred.' });
        }
        res.json({ success: true, message: 'Form data updated.', changes: this.changes });
    });
});

// DELETE: delete data by id
app.delete('/anamnese/:id', (req, res) => {
    const { id } = req.params;
    console.log('Deleting data for ID:', id); // Log ID being deleted
    const sql = `DELETE FROM anamnese WHERE id = ?`;
    db.run(sql, [id], function(err) {
        if (err) {
            console.error('Database error:', err.message); // Log database error
            return res.status(500).json({ error: 'An internal server error occurred.' });
        }
        res.json({ success: true, message: 'Form data deleted.', changes: this.changes });
    });
});

// start server
const PORT = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
