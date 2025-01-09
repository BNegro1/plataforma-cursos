const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/db.sqlite');

// Crear un nuevo usuario
exports.createUser = (name, email, password, callback) => {
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.run(query, [name, email, password], function (err) {
        if (err) {
            console.error('Error al insertar usuario en la base de datos:', err.message); // Depuración
            return callback(err);
        }
        callback(null); // Operación exitosa
    });
};

// Autenticar un usuario
exports.authenticate = (email, password, callback) => {
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.get(query, [email, password], (err, row) => {
        if (err) {
            console.error('Error al autenticar usuario:', err.message); // Depuración
            return callback(err);
        }
        callback(null, row); // Retorna el usuario si las credenciales son válidas
    });
};
