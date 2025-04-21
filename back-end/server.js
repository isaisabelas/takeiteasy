const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./anamnese.db'); // Create a new SQLite database or open an existing one
const cors = require('cors'); 
const bodyParser = require('body-parser'); // Middleware to parse JSON bodies


const app = express(); // Create an Express application 
const PORT = 3000; // Define the port for the server to listen on

// Middleware
app.use(cors()); // Enable CORS for all routes (Cross-Origin Resource Sharing)
app.use(bodyParser.json());

app.use((req, res, next) => { // Middleware to set CORS headers
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5501'); // Allow requests from this origin
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Allow these HTTP methods
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); 
    next();
});


app.post('/anamnese', (req, res) => { // Endpoint to handle POST requests to save data | req: request, res: response
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

    // SQL Query to insert data into the anamnese table
    const sql = `
        INSERT INTO anamnese (
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
            terms
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Parameters to be inserted into the SQL query
    // The question marks (?) in the SQL query are placeholders for the values in the params array
    // The values in the params array will be inserted into the SQL query in the order they appear
    // Prevents SQL injection attacks by ensuring that the values are properly escaped
    const params = [
        artistName, price, sessionDate, clientName, gender, birthDate,
        clientDocument, city, state, clientPhone, clientEmail,
        healthProblems1, healthProblems1Text, meds, medsText,
        allergies, allergiesText, healthProblems2, healthProblems2Text,
        keloid, alcohol, antibiotics, previousTattoos, terms
    ];

    // Execute the SQL query with the parameters
    db.run(sql, params, function(err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ 
            success: true, 
            message: 'Dados salvos com sucesso!',
            id: this.lastID 
        });
    });
});

// Endpoint to handle GET requests to retrieve all data from the anamnese table
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});