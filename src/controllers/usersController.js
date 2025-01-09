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

        console.log('Datos recibidos (registro):', { name, email, password }); // Log en la consola del servidor

        // Validar campos vacíos
        if (!name || !email || !password) {
            console.error('Error: Campos vacíos', { name, email, password });
            // Redirige con un indicador de error
            res.writeHead(302, { Location: '/register?error=1' });
            return res.end();
        }

        // Crear el usuario en la base de datos
        User.createUser(name, email, password, (err) => {
            if (err) {
                console.error('Error al registrar usuario:', err);
                // Error de DB => indicamos error
                res.writeHead(302, { Location: '/register?error=1' });
                return res.end();
            }

            // ÉXITO => Guardar como logueado
            currentUser = name;  // El user se loguea automáticamente con su 'name'
            // Redirigir a "/" con una query success=reg (o como gustes)
            res.writeHead(302, { Location: '/?success=reg' });
            res.end();
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

        console.log('Intento de login:', { email, password }); // Depuración en la consola

        // Verificar campos vacíos
        if (!email || !password) {
            console.error('Error: email o password vacío');
            // Redirige con error
            res.writeHead(302, { Location: '/login?error=1' });
            return res.end();
        }

        // Autenticar al usuario
        User.authenticate(email, password, (err, user) => {
            if (err || !user) {
                console.error('Error al autenticar usuario:', err || 'Credenciales inválidas');
                res.writeHead(302, { Location: '/login?error=1' });
                return res.end();
            }
            currentUser = user.name; // Guardar el nombre del usuario actual (logueado)

            // Login exitoso => /?success=log
            res.writeHead(302, { Location: '/?success=log' });
            res.end();
        });
    });
};

// Cerrar sesión
exports.logout = (req, res) => {
    console.log('Cerrando sesión del usuario:', currentUser);
    currentUser = null;
    // Redirigir a /login
    res.writeHead(302, { Location: '/login' });
    res.end();
};

// Devuelve el usuario actualmente logueado
exports.getCurrentUser = () => currentUser;
