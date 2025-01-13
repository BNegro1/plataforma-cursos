const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'db.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.message);
    } else {
        console.log('Conexión exitosa a la base de datos SQLite');
    }
});

// Habilitar foreign keys
db.run('PRAGMA foreign_keys = ON');

// Wrapper para promesas
db.queryAsync = function (sql, params = []) {
    return new Promise((resolve, reject) => {
        this.all(sql, params, (error, rows) => {
            if (error) reject(error);
            else resolve(rows);
        });
    });
};

db.runAsync = function (sql, params = []) {
    return new Promise((resolve, reject) => {
        this.run(sql, params, function (error) {
            if (error) reject(error);
            else resolve({ id: this.lastID, changes: this.changes });
        });
    });
};

module.exports = db;
