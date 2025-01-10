const sqlite3 = require('sqlite3').verbose();
// NOTA !:

// Modificar para agregar más tablas

// Conexión a la base de datos SQLite
const db = new sqlite3.Database('./data/db.sqlite', (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
    } else {
        console.log('Conexión a la base de datos SQLite exitosa.');
    }
});

// Crear tabla `users` si no existe
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        );
    `, (err) => {
        if (err) {
            console.error('Error al crear la tabla users:', err.message);
        } else {
            console.log('Tabla users creada exitosamente.');
        }
    });
});

// Cerrar la conexión
db.close((err) => {
    if (err) {
        console.error('Error al cerrar la base de datos:', err.message);
    } else {
        console.log('Conexión a la base de datos cerrada.');
    }
});
