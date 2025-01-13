const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');

const dbPath = path.join(__dirname, '../../../data/db.sqlite');
const db = new sqlite3.Database(dbPath);

let currentUser = null;

const authController = {
    login: (req, res) => {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            const formData = new URLSearchParams(body);
            const correo = formData.get('email');
            const contrasenia = formData.get('password');

            db.get(
                'SELECT * FROM users WHERE correo = ?', 
                [correo], 
                async (err, user) => {
                    if (err) {
                        console.error(err);
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        return res.end('Error interno del servidor');
                    }

                    if (!user) {
                        res.writeHead(302, { Location: '/login?error=1' });
                        return res.end();
                    }

                    const match = await bcrypt.compare(contrasenia, user.contrasenia);
                    if (match) {
                        currentUser = {
                            id: user.id,
                            rut: user.rut,
                            nombre: `${user.nombre} ${user.apellido}`,
                            correo: user.correo,
                            tipo: user.tipo_usuario
                        };
                        
                        res.writeHead(302, {
                            'Location': '/?success=log',
                            'Set-Cookie': `user=${user.correo}; HttpOnly; Path=/`
                        });
                        res.end();
                    } else {
                        res.writeHead(302, { Location: '/login?error=1' });
                        res.end();
                    }
                }
            );
        });
    },

    register: (req, res, logger) => {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', async () => {
            const formData = new URLSearchParams(body);
            const userData = {
                rut: formData.get('rut'),
                nombre: formData.get('nombre'),
                apellido: formData.get('apellido'),
                correo: formData.get('email'),
                contrasenia: formData.get('password'),
                tipo_usuario: formData.get('tipo_usuario') || 'estudiante'
            };

            try {
                // Log datos recibidos
                logger.success('Intentando registro de usuario:', {
                    ...userData,
                    contrasenia: '[PROTEGIDA]'
                });

                const hashedPassword = await bcrypt.hash(userData.contrasenia, 10);

                db.run(
                    `INSERT INTO users (
                        rut, nombre, apellido, correo, contrasenia, tipo_usuario
                    ) VALUES (?, ?, ?, ?, ?, ?)`,
                    [
                        userData.rut,
                        userData.nombre,
                        userData.apellido,
                        userData.correo,
                        hashedPassword,
                        userData.tipo_usuario
                    ],
                    function(err) {
                        if (err) {
                            logger.error('Error en registro:', err);
                            if (err.code === 'SQLITE_CONSTRAINT') {
                                res.writeHead(302, { Location: '/auth/registro?error=exists' });
                            } else {
                                res.writeHead(302, { Location: '/auth/registro?error=1' });
                            }
                            return res.end();
                        }

                        // Auto-login después del registro
                        currentUser = {
                            id: this.lastID,
                            rut: userData.rut,
                            nombre: `${userData.nombre} ${userData.apellido}`,
                            correo: userData.correo,
                            tipo: userData.tipo_usuario
                        };

                        logger.success('Usuario registrado y logueado:', {
                            id: this.lastID,
                            tipo: userData.tipo_usuario,
                            correo: userData.correo
                        });

                        // Redirigir con cookie de sesión
                        res.writeHead(302, {
                            'Location': '/?success=reg',
                            'Set-Cookie': `user=${userData.correo}; HttpOnly; Path=/`
                        });
                        res.end();
                    }
                );
            } catch (err) {
                logger.error('Error en hash de contraseña:', err);
                res.writeHead(302, { Location: '/auth/registro?error=1' });
                res.end();
            }
        });
    },

    logout: (req, res) => {
        currentUser = null;
        res.writeHead(302, {
            'Location': '/',
            'Set-Cookie': 'user=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
        });
        res.end();
    },

    getCurrentUser: () => currentUser,

    userExists: (correo) => {
        return new Promise((resolve, reject) => {
            db.get(
                'SELECT 1 FROM users WHERE correo = ?',
                [correo],
                (err, row) => {
                    if (err) reject(err);
                    resolve(!!row);
                }
            );
        });
    },

    isTeacher: (correo) => {
        return new Promise((resolve, reject) => {
            db.get(
                'SELECT tipo_usuario FROM users WHERE correo = ?',
                [correo],
                (err, row) => {
                    if (err) reject(err);
                    resolve(row?.tipo_usuario === 'docente');
                }
            );
        });
    }
};

process.on('SIGINT', () => {
    db.close((err) => {
        if (err) console.error(err.message);
        process.exit(0);
    });
});

module.exports = authController;
