const db = require('../utils/db');

const agregarUsuario = (req, res) => {
    const {
        idRol,
        rutUsuario,
        nombre,
        apellido,
        correo,
        contrasenia,
        region,
        comuna,
    } = req.body;

    const sql = `
    INSERT INTO USUARIO (ID_ROL, RUT_USUARIO, NOMBRE, APELLIDO, CORREO, CONTRASENIA, REGION, COMUNA)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

    const params = [idRol, rutUsuario, nombre, apellido, correo, contrasenia, region, comuna];

    db.run(sql, params, function (err) {
        if (err) {
            console.error('Error al insertar el usuario:', err.message);
            res.status(500).send('Error al registrar usuario.');
        } else {
            console.log(`Usuario registrado con ID: ${this.lastID}`);
            res.redirect('/dashboard');
        }
    });
};

module.exports = { agregarUsuario };
