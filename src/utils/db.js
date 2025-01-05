const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./data/db.sqlite', (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
    } else {
        console.log('Conexión exitosa a SQLite.');
    }
});

module.exports = db;
