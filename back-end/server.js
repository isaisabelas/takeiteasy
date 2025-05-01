const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL config
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Middleware
app.use(cors()); // Permite chamadas de qualquer origem
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../front-end'))); // Serve arquivos estáticos (HTML, CSS, JS)

// Serve o index.html como página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../front-end/index.html'));
});

// Rota para envio da ficha
app.post('/anamnese', async (req, res) => {
    const {
        artistName,
        price,
        sessionDate,
        clientName,
        gender,
        birthDate,
        clientDocument,
        city,            // Adicionado: estava faltando
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

// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
