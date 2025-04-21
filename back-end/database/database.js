const sqlite3 = require('sqlite3').verbose(); // Import sqlite3 module, verbose provides detailed and extensive output or information.
const db = new sqlite3.Database('./anamnese.db'); // Create a new SQLite database or open an existing one


db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS anamnese (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        artistName TEXT NOT NULL,
        price INTEGER NOT NULL,
        sessionDate DATE NOT NULL, 
        clientName TEXT NOT NULL,
        gender TEXT NOT NULL,
        birthDate DATE NOT NULL,
        clientDocument TEXT NOT NULL,
        city TEXT NOT NULL,
        state TEXT NOT NULL,
        clientPhone TEXT NOT NULL,
        clientEmail TEXT NOT NULL,
        healthProblems1 TEXT,
        healthProblems1Text TEXT,
        meds TEXT,
        medsText TEXT,
        allergies TEXT,
        allergiesText TEXT,
        healthProblems2 TEXT,
        healthProblems2Text TEXT,
        keloid TEXT,
        alcohol TEXT,
        antibiotics TEXT,
        previousTattoos TEXT,
        terms TEXT NOT NULL
    )`);
});

module.exports = db; // Export the database object to be used in other files