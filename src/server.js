const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { agregarUsuario } = require('./controllers/RegisterController');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

// Configurar EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Conexión a la base de datos
const db = new sqlite3.Database('data/db.sqlite', (err) => {
    if (err) {
        return console.error('Error al conectar con SQLite:', err.message);
    }
    console.log('Conexión exitosa a SQLite.');
});

// Middleware para parsear formularios
app.use(bodyParser.urlencoded({ extended: false }));

// Archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Rutas
app.get('/', (req, res) => res.render('index'));

app.get('/dashboard', (req, res) => {
    const sql = 'SELECT * FROM CURSO';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return console.error('Error al obtener los cursos:', err.message);
        }
        res.render('dashboard', { cursos: rows });
    });
});

app.get('/register', (req, res) => res.render('register'));

app.get('/login', (req, res) => res.render('login')); // Nueva ruta para la vista de inicio de sesión

// Ruta para procesar el formulario de registro
app.post('/register', agregarUsuario);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
