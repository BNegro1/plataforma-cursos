const fs = require('fs');
const path = require('path');
const url = require('url');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const authController = require('./controllers/auth/authController');

// Renderizado: plantilla base + contenido específico
const renderWithLayout = async (res, contentPath, data = {}) => { // Esta función se encarga de renderizar la plantilla base con el contenido específico de cada página !!!

    try {
        // Leer la plantilla base
        const layoutPath = path.join(__dirname, 'views/layouts/main.html');
        const layout = await fs.promises.readFile(layoutPath, 'utf8');

        // Leer el contenido específico (Por ejemplo, 'views/index.html' será de la ruta '/index.html')

        // Entonces, el flujo sería: '/index.html' -> 'views/index.html', en las lineas de este archivo es: '/auth/login' -> 'views/auth/login.html', '/auth/registro' -> 'views/auth/registro.html', '/users/perfil' -> 'views/users/perfil.html', '/courses/crear' -> 'views/courses/crear-curso.html'.

        const contentFilePath = path.join(__dirname, 'views', contentPath);
        const content = await fs.promises.readFile(contentFilePath, 'utf8');

        // Preparar datos base para la plantilla
        const baseData = {
            title: 'Elearn',
            dynamic_nav: getDynamicNav(authController.getCurrentUser()),
            content: content,
            ...data
        };

        // Reemplazar TODAS las variables
        let html = layout;
        for (const [key, value] of Object.entries(baseData)) {
            html = html.replace(new RegExp(`{{${key}}}`, 'g'), value);
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
    } catch (err) {
        console.error('Error al renderizar:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error interno del servidor');
    }
};

// Rutas PROTEGIDAS
const protectedRoutes = ['/perfil', '/cursos/crear'];

const router = async (req, res, logger) => {
    const parsedUrl = url.parse(req.url, true);
    const { pathname, query } = parsedUrl;

    // Servir archivos estáticos
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

    // Verificar autenticaciónn para rutas protegidass
    if (protectedRoutes.some(route => pathname.startsWith(route))) {
        const currentUser = authController.getCurrentUser();
        if (!currentUser) {
            res.writeHead(302, { Location: '/auth/login?error=auth' });
            return res.end();
        }
    }

    // Ruteo
    try {
        switch (pathname) {
            case '/':
            case '/index.html':
                return await renderWithLayout(res, 'index.html', {
                    title: 'Elearn - Inicio',
                    successParam: query.success || ''
                });

            case '/auth/login':
                if (authController.getCurrentUser()) {
                    res.writeHead(302, { Location: '/' });
                    return res.end();
                }
                return await renderWithLayout(res, 'auth/login.html', {
                    title: 'Elearn - Login'
                });

            case '/auth/registro':
                if (authController.getCurrentUser()) {
                    res.writeHead(302, { Location: '/' });
                    return res.end();
                }
                return await renderWithLayout(res, 'auth/registro.html', {
                    title: 'Elearn - Registro'
                });

            case '/users/perfil':
                return await renderWithLayout(res, 'users/perfil.html', {
                    title: 'Elearn - Perfil',
                    userData: JSON.stringify(authController.getCurrentUser())
                });

            case '/courses/crear':
                const user = authController.getCurrentUser();
                if (user?.tipo !== 'docente') {
                    res.writeHead(403, { 'Content-Type': 'text/plain' });
                    return res.end('Acceso denegado');
                }
                return await renderWithLayout(res, 'courses/crear-curso.html', {
                    title: 'Elearn - Crear Curso'
                });

            default:
                if (req.method === 'POST') {
                    // Manejo de formularios POST
                    if (pathname === '/auth/login') return authRoutes.handleLogin(req, res, logger);
                    if (pathname === '/auth/registro') return authRoutes.handleRegister(req, res, logger);
                    if (pathname === '/auth/logout') {
                        logger.success('Usuario cerró sesión');
                        return authRoutes.handleLogout(req, res);
                    }
                    if (pathname === '/courses/crear') return courseRoutes.handleCreateCourse(req, res);
                }

                // 404 para rutas no encontradas
                logger.error(`Ruta no encontrada: ${pathname}`);
                return await renderWithLayout(res, 'errors/404.html', {
                    title: 'Elearn - Página no encontrada',
                    path: pathname
                });
        }
    } catch (err) {
        logger.error('Error en router:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error interno del servidor');
    }
};





// Helper para navegación dinámica 
// Explicación: Si el usuario está logueado, se muestra un conjunto de links, si no, se muestra otro conjunto de links.
// Aquí se define el contenido de la barra de navegación dependiendo si el usuario está logueado o no.	
function getDynamicNav(user) {
    if (!user) {
        return `
            <li class="nav-item"><a class="nav-link" href="/">Inicio</a></li>
            <li class="nav-item"><a class="nav-link" href="/auth/login">Ingresar</a></li>
            <li class="nav-item"><a class="nav-link" href="/auth/registro">Registrar</a></li>
        `;
    }

    return `
        <li class="nav-item"><a class="nav-link" href="/">Inicio</a></li>
        <li class="nav-item"><a class="nav-link" href="/courses">Cursos</a></li>
        ${user.tipo === 'docente' ?
            '<li class="nav-item"><a class="nav-link" href="/courses/crear">Crear Curso</a></li>'
            : ''
        }
        <li class="nav-item"><a class="nav-link" href="/users/perfil">Mi Perfil</a></li>
        <li class="nav-item"><a class="nav-link" href="/auth/logout">Cerrar Sesión</a></li>
    `;
}

module.exports = router;
