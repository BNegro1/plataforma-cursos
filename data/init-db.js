const sqlite3 = require('sqlite3').verbose();

// Conexión a la base de datos
const db = new sqlite3.Database('D:/Repositorios Oficial/plataforma-cursos/data/db.sqlite', (err) => {
    if (err) {
        return console.error('Error al conectar con SQLite:', err.message);
    }
    console.log('Conexión exitosa a SQLite.');
});

// SQL para crear las tablas y datos iniciales
const sqlScript = `
CREATE TABLE IF NOT EXISTS USUARIO (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    ID_ROL INTEGER NOT NULL,
    RUT_USUARIO INTEGER,
    NOMBRE TEXT NOT NULL,
    APELLIDO TEXT NOT NULL,
    CORREO TEXT NOT NULL,
    CONTRASENIA TEXT NOT NULL,
    REGION TEXT,
    COMUNA TEXT
);

CREATE TABLE IF NOT EXISTS CURSO (
    COD_CURSO INTEGER PRIMARY KEY AUTOINCREMENT,
    ID INTEGER NOT NULL,
    NOMBRE_CURSO VARCHAR(50),
    FECHA_INICIO DATE,
    FECHA_FIN DATE,
    ESTADO VARCHAR(10),
    DESCRIPCION_CURSO TEXT
);

INSERT INTO CURSO (ID, NOMBRE_CURSO, FECHA_INICIO, FECHA_FIN, ESTADO, DESCRIPCION_CURSO)
VALUES 
    (1, 'Curso de Node.js', '2023-01-01', '2023-02-01', 'Activo', 'Aprende Node.js desde cero'),
    (2, 'Curso de Express.js', '2023-03-01', '2023-04-01', 'Activo', 'Construcción de aplicaciones web'),
    (3, 'Curso de React', '2023-05-01', '2023-06-01', 'Activo', 'Desarrollo de interfaces con React'),
    (4, 'Curso de Angular', '2023-07-01', '2023-08-01', 'Activo', 'Desarrollo de aplicaciones con Angular'),
    (5, 'Curso de Vue.js', '2023-09-01', '2023-10-01', 'Activo', 'Desarrollo de interfaces con Vue.js'),
    (6, 'Curso de Python', '2023-11-01', '2023-12-01', 'Activo', 'Introducción a la programación con Python'),
    (7, 'Curso de Django', '2024-01-01', '2024-02-01', 'Activo', 'Desarrollo web con Django'),
    (8, 'Curso de Flask', '2024-03-01', '2024-04-01', 'Activo', 'Desarrollo de aplicaciones con Flask'),
    (9, 'Curso de Java', '2024-05-01', '2024-06-01', 'Activo', 'Programación en Java'),
    (10, 'Curso de Spring', '2024-07-01', '2024-08-01', 'Activo', 'Desarrollo de aplicaciones con Spring'),
    (11, 'Curso de Kotlin', '2024-09-01', '2024-10-01', 'Activo', 'Programación en Kotlin'),
    (12, 'Curso de Swift', '2024-11-01', '2024-12-01', 'Activo', 'Desarrollo de aplicaciones iOS con Swift'),
    (13, 'Curso de C#', '2025-01-01', '2025-02-01', 'Activo', 'Programación en C#'),
    (14, 'Curso de ASP.NET', '2025-03-01', '2025-04-01', 'Activo', 'Desarrollo de aplicaciones con ASP.NET'),
    (15, 'Curso de Ruby', '2025-05-01', '2025-06-01', 'Activo', 'Programación en Ruby'),
    (16, 'Curso de Rails', '2025-07-01', '2025-08-01', 'Activo', 'Desarrollo de aplicaciones con Ruby on Rails'),
    (17, 'Curso de PHP', '2025-09-01', '2025-10-01', 'Activo', 'Desarrollo web con PHP');
`;

// Ejecutar el script SQL
db.exec(sqlScript, (err) => {
    if (err) {
        return console.error('Error al inicializar la base de datos:', err.message);
    }
    console.log('Base de datos inicializada con éxito.');
});

// Cerrar la conexión
db.close((err) => {
    if (err) {
        return console.error('Error al cerrar la conexión con SQLite:', err.message);
    }
    console.log('Conexión con SQLite cerrada.');
});
