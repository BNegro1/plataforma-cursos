const User = require('../models/Users');
let currentUser = null; // Variable para almacenar el usuario actualmente logueado

// Controlador para registrar usuarios
exports.register = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', () => {
        const params = new URLSearchParams(body);
        const name = params.get('name');
        const email = params.get('email');
        const password = params.get('password');

        console.log('Datos recibidos:', { name, email, password }); // Depuración

        // Validar campos vacíos
        if (!name || !email || !password) {
            console.error('Campos vacíos:', { name, email, password });
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            return res.end('Error: Todos los campos son obligatorios');
        }

        // Crear el usuario en la base de datos
        User.createUser(name, email, password, (err) => {
            if (err) {
                console.error('Error al registrar usuario:', err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                return res.end('Error al registrar usuario');
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Usuario registrado exitosamente');
        });
    });
};

// Controlador para inicio de sesión
exports.login = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', () => {
        const params = new URLSearchParams(body);
        const email = params.get('email');
        const password = params.get('password');

        console.log('Intento de inicio de sesión:', { email, password }); // Depuración

        // Verificar campos vacíos
        if (!email || !password) {
            console.error('Campos vacíos:', { email, password });
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            return res.end('Error: Todos los campos son obligatorios');
        }

        // Autenticar al usuario
        User.authenticate(email, password, (err, user) => {
            if (err || !user) {
                console.error('Error al autenticar usuario:', err || 'Credenciales inválidas');
                res.writeHead(401, { 'Content-Type': 'text/plain' });
                return res.end('Credenciales inválidas');
            }
            currentUser = user.name; // Guardar el nombre del usuario actual
            // Redirigir al index después del login
            res.writeHead(302, { Location: '/' });
            res.end();
        });
    });
};

// <-- Nuevo método para cerrar sesión -->
exports.logout = (req, res) => {
    console.log('Cerrando sesión del usuario:', currentUser);
    currentUser = null;
    // Redirigir a /login (o /, según quieras)
    res.writeHead(302, { Location: '/login' });
    res.end();
};

// Devuelve el usuario actualmente logueado
exports.getCurrentUser = () => currentUser;
