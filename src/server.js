const http = require('http');
const router = require('./router');

// Configuración
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

// Logger personalizado mejorado
const logger = {
    route: (req) => {
        // Ignorar assets y favicon completamente
        if (!req.url.startsWith('/assets') && req.url !== '/favicon.ico') {
            console.log(`\n🌐 [${new Date().toLocaleString()}] ${req.method} ${req.url}`);
        }
    },
    error: (message, error) => {
        // Solo loguear errores que no sean de favicon
        if (!message.includes('favicon')) {
            console.error(`❌ [${new Date().toLocaleString()}] Error: ${message}`, error);
        }
    },
    success: (message, data = null) => {
        console.log(`✅ [${new Date().toLocaleString()}] ${message}`);
        if (data) console.log('📦 Datos:', data);
    }
};

// Crear servidor
const server = http.createServer((req, res) => {
    // Ignorar peticiones de favicon completamente
    if (req.url === '/favicon.ico') {
        res.writeHead(204);
        return res.end();
    }

    try {
        // Log solo rutas principales
        logger.route(req);

        // Middleware para CORS básico
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        // Manejar OPTIONS para CORS
        if (req.method === 'OPTIONS') {
            res.writeHead(204);
            res.end();
            return;
        }

        // Ruteo principal
        router(req, res, logger);
    } catch (error) {
        logger.error('Error en el servidor:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error interno del servidor');
    }
});

// Manejo de errores del servidor
server.on('error', (error) => {
    console.error('Error en el servidor:', error);
    if (error.code === 'EADDRINUSE') {
        console.error(`Puerto ${PORT} está en uso`);
    }
});

// Iniciar servidor
server.listen(PORT, HOST, () => {
    console.log('\x1b[32m%s\x1b[0m', '🚀 Servidor iniciado correctamente');
    console.log('\x1b[36m%s\x1b[0m', `📡 Escuchando en http://${HOST}:${PORT}`);
    console.log('\x1b[33m%s\x1b[0m', '⚡ Presiona Ctrl+C para detener');
});

// Manejo de cierre graceful
process.on('SIGTERM', () => {
    console.log('\n🛑 Cerrando servidor...');
    server.close(() => {
        console.log('Servidor cerrado');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('\n🛑 Cerrando servidor...');
    server.close(() => {
        console.log('Servidor cerrado');
        process.exit(0);
    });
});
