const fs = require('fs');
const path = require('path');
const url = require('url');
const usersController = require('./controllers/usersController');

// Función para verificar si hay un usuario logueado
function checkAuth(req, res) {
    const currentUser = usersController.getCurrentUser();
    if (!currentUser) {
        // No está logueado: redirigimos a /login
        res.writeHead(302, { Location: '/login' });
        res.end();
        return false;
    }
    return true;
}

const router = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const { pathname } = parsedUrl;

    // 1) Servir archivos estáticos (CSS, JS, imágenes)
    if (pathname.startsWith('/assets')) {
        const filePath = path.join(__dirname, '..', pathname);
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                return res.end('Archivo no encontrado');
            }
            const ext = path.extname(filePath).toLowerCase();
            const mimeTypes = {
                '.css': 'text/css',
                '.js': 'application/javascript',
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.png': 'image/png',
                '.gif': 'image/gif',
            };
            const contentType = mimeTypes[ext] || 'application/octet-stream';
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
        return;
    }

    // 2) Página principal accesible de forma anónima
    if (pathname === '/' && req.method === 'GET') {
        const filePath = path.join(__dirname, 'views', 'index.html');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                return res.end('Error al cargar index.html');
            }
            const currentUser = usersController.getCurrentUser();

            // Navbar para usuario NO logueado
            const navLoggedOut = `
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <a class="nav-link" href="/">Inicio</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/login">Ingresar</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/register">Registrar</a>
                </li>
            </ul>
        `;

            // Navbar para usuario SÍ logueado
            const navLoggedIn = `
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <a class="nav-link" href="/">Inicio</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Dashboard</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/perfil">Perfil de ${currentUser}</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/logout">Cerrar Sesión</a>
                </li>
            </ul>
        `;

            // Elige cuál insertar
            let finalNav;
            if (currentUser) {
                finalNav = navLoggedIn;
            } else {
                finalNav = navLoggedOut;
            }

            // Reemplaza tanto {{username}} como {{dynamic_nav}}
            let updatedHTML = data.replace('{{username}}', currentUser || 'Cuenta');
            updatedHTML = updatedHTML.replace('{{dynamic_nav}}', finalNav);


            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(updatedHTML);
        });
        return;
    }


    // 3) Login y Register (GET) accesibles sin estar logueado
    if (pathname === '/login' && req.method === 'GET') {
        const filePath = path.join(__dirname, 'views', 'login.html');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                return res.end('Error al cargar login.html');
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
        return;
    }

    if (pathname === '/register' && req.method === 'GET') {
        const filePath = path.join(__dirname, 'views', 'registro.html');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                return res.end('Error al cargar registro.html');
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
        return;
    }

    // Manejo POST de login/register
    if (pathname === '/login' && req.method === 'POST') {
        usersController.login(req, res);
        return;
    }
    if (pathname === '/register' && req.method === 'POST') {
        usersController.register(req, res);
        return;
    }

    // 3.1) Logout (GET)
    if (pathname === '/logout' && req.method === 'GET') {
        usersController.logout(req, res);
        return;
    }

    // 4) RUTA /perfil => corresponde al archivo views/perfil.html
    //    Requiere estar logueado para acceder.
    if (pathname === '/perfil' && req.method === 'GET') {
        if (!checkAuth(req, res)) return;  // Si no está logueado, redirige /login
        const filePath = path.join(__dirname, 'views', 'perfil.html');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                return res.end('No se encontró perfil.html');
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
        return;
    }

    // 5) Cualquier otro .html => requiere estar logueado
    //    Ej: /curso-excel => curso-excel.html
    if (pathname.endsWith('.html') && req.method === 'GET') {
        // Filtrar: si NO es 'index.html', 'login.html', ni 'registro.html',
        // entonces se pide checkAuth
        if (
            pathname !== '/index.html' &&
            pathname !== '/login.html' &&
            pathname !== '/registro.html'
        ) {
            if (!checkAuth(req, res)) {
                // si no pasa checkAuth, ya redirigió a /login
                return;
            }
        }
        // Servir el .html
        const filePath = path.join(__dirname, 'views', pathname.substring(1)); // quita la primera '/'
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                return res.end(`No se encontró el archivo: ${pathname}`);
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
        return;
    }

    // 6) Si no es un .html ni una ruta contemplada, 404
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Ruta no encontrada');
};

module.exports = router;
