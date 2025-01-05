const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Inicializar base de datos SQLite
const db = new sqlite3.Database('./data/db.sqlite', (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.message);
  } else {
    console.log('Conexión a SQLite exitosa.');
    inicializarBaseDatos();
  }
});

// Crear tablas si no existen
function inicializarBaseDatos() {
  db.run(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    `);

  db.run(`
        CREATE TABLE IF NOT EXISTS cursos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            descripcion TEXT NOT NULL,
            contenido TEXT NOT NULL
        )
    `);
}

// Servir archivos estáticos desde la carpeta `public`
function manejarArchivosEstaticos(req, res) {
  const parsedUrl = url.parse(req.url);
  let pathname = `./public${parsedUrl.pathname}`;
  if (pathname === './public/') {
    pathname = './public/index.html'; // Archivo por defecto
  }

  const ext = path.parse(pathname).ext || '.html';
  const map = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
  };

  fs.exists(pathname, (exist) => {
    if (!exist) {
      res.statusCode = 404;
      res.end('Archivo no encontrado');
      return;
    }

    fs.readFile(pathname, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error al cargar el archivo: ${err.message}`);
      } else {
        res.setHeader('Content-Type', map[ext] || 'text/plain');
        res.end(data);
      }
    });
  });
}

// Manejar solicitudes POST para login y registro
function manejarSolicitudesPost(req, res) {
  let body = '';
  req.on('data', chunk => (body += chunk.toString()));
  req.on('end', () => {
    const parsedUrl = url.parse(req.url, true);
    const { pathname } = parsedUrl;

    if (pathname === '/login') {
      const { username, password } = JSON.parse(body);
      db.get(
        'SELECT * FROM usuarios WHERE username = ? AND password = ?',
        [username, password],
        (err, row) => {
          if (err) {
            res.statusCode = 500;
            res.end('Error en el servidor');
          } else if (row) {
            res.end(JSON.stringify({ success: true, message: 'Login exitoso' }));
          } else {
            res.end(JSON.stringify({ success: false, message: 'Credenciales incorrectas' }));
          }
        }
      );
    } else if (pathname === '/register') {
      const { username, password } = JSON.parse(body);
      db.run(
        'INSERT INTO usuarios (username, password) VALUES (?, ?)',
        [username, password],
        (err) => {
          if (err) {
            res.statusCode = 400;
            res.end('Usuario ya registrado');
          } else {
            res.end(JSON.stringify({ success: true, message: 'Registro exitoso' }));
          }
        }
      );
    } else {
      res.statusCode = 404;
      res.end('Ruta no encontrada');
    }
  });
}

// Crear servidor
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (req.method === 'POST') {
    manejarSolicitudesPost(req, res);
  } else {
    manejarArchivosEstaticos(req, res);
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
