const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5501');
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.post('/anamnese', async (req, res) => {
    const {
        artistName,
        price,
        sessionDate,
        clientName,
        gender,
        birthDate,
        clientDocument,
        city,
        state,
        clientPhone,
        clientEmail,
        healthProblems1,
        healthProblems1Text,
        meds,
        medsText,
        allergies,
        allergiesText,
        healthProblems2,
        healthProblems2Text,
        keloid,
        alcohol,
        antibiotics,
        previousTattoos,
        terms,
    } = req.body;

    const sql = `
        INSERT INTO anamnese (
            artistName, price, sessionDate, clientName, gender, birthDate,
            clientDocument, city, state, clientPhone, clientEmail,
            healthProblems1, healthProblems1Text, meds, medsText,
            allergies, allergiesText, healthProblems2, healthProblems2Text,
            keloid, alcohol, antibiotics, previousTattoos, terms
        ) VALUES (
            $1, $2, $3, $4, $5, $6,
            $7, $8, $9, $10, $11,
            $12, $13, $14, $15,
            $16, $17, $18, $19,
            $20, $21, $22, $23, $24
        )
        RETURNING id
    `;

    const params = [
        artistName, price, sessionDate, clientName, gender, birthDate,
        clientDocument, city, state, clientPhone, clientEmail,
        healthProblems1, healthProblems1Text, meds, medsText,
        allergies, allergiesText, healthProblems2, healthProblems2Text,
        keloid, alcohol, antibiotics, previousTattoos, terms
    ];

    try {
        const result = await pool.query(sql, params);
        res.json({
            success: true,
            message: 'Dados salvos com sucesso!',
            id: result.rows[0].id,
        });
    } catch (err) {
        console.error('Erro ao inserir dados:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
