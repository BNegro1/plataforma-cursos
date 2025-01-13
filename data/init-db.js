const sqlite3 = require('sqlite3').verbose();

// Conexión a la base de datos SQLite
const db = new sqlite3.Database('./data/db.sqlite', (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
    } else {
        console.log('Conexión a la base de datos SQLite exitosa.');
    }
});

// Creación de tablas en secuencia usando promesas para asegurar el orden correcto
const createTables = () => {

    // Iniciar con las tablas base que NO tienen dependencias
    const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            rut TEXT UNIQUE NOT NULL,
            nombre TEXT NOT NULL,
            apellido TEXT NOT NULL,
            correo TEXT UNIQUE NOT NULL,
            contrasenia TEXT NOT NULL,
            tipo_usuario TEXT CHECK(tipo_usuario IN ('estudiante', 'docente')) NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `;

    const createCoursesTable = `
        CREATE TABLE IF NOT EXISTS courses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            codigo TEXT UNIQUE NOT NULL,
            nombre TEXT NOT NULL,
            descripcion TEXT,
            fecha_inicio DATE,
            fecha_fin DATE,
            estado TEXT CHECK(estado IN ('activo', 'inactivo', 'borrador')) DEFAULT 'borrador',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `;

    const createLessonsTable = `
        CREATE TABLE IF NOT EXISTS lessons (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            course_id INTEGER NOT NULL,
            titulo TEXT NOT NULL,
            descripcion TEXT,
            orden INTEGER NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
        )
    `;

    const createContentsTable = `
        CREATE TABLE IF NOT EXISTS contents (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            lesson_id INTEGER NOT NULL,
            titulo TEXT NOT NULL,
            contenido TEXT NOT NULL,
            url_recurso TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
        )
    `;

    const createEnrollmentsTable = `
        CREATE TABLE IF NOT EXISTS enrollments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            course_id INTEGER NOT NULL,
            fecha_inscripcion DATETIME DEFAULT CURRENT_TIMESTAMP,
            estado TEXT CHECK(estado IN ('activo', 'completado', 'abandonado')) DEFAULT 'activo',
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
            UNIQUE(user_id, course_id)
        )
    `;

    const createProgressTable = `
        CREATE TABLE IF NOT EXISTS progress (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            lesson_id INTEGER NOT NULL,
            completed BOOLEAN DEFAULT FALSE,
            last_accessed DATETIME,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
            UNIQUE(user_id, lesson_id)
        )
    `;

    // Crear tablas en secuencia y retornar una promesa
    // Recordar: Las promesas se definen como una función que recibe dos parámetros: resolve y reject, la finalidad de una "promesa" es ejecutar una tarea asíncrona y devolver un resultado exitoso o un error.
    
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run('PRAGMA foreign_keys = ON');

            db.run(createUsersTable, (err) => {
                if (err) reject(err);
            });

            db.run(createCoursesTable, (err) => {
                if (err) reject(err);
            });

            db.run(createLessonsTable, (err) => {
                if (err) reject(err);
            });

            db.run(createContentsTable, (err) => {
                if (err) reject(err);
            });

            db.run(createEnrollmentsTable, (err) => {
                if (err) reject(err);
            });

            db.run(createProgressTable, (err) => {
                if (err) reject(err);
            });

            resolve();
        });
    });
};

// Ejecutar la creación de tablas y luego cerrar la conexión
createTables()
    .then(() => {
        console.log('Todas las tablas fueron creadas exitosamente.');
        // Cerrar la conexión
        db.close((err) => {
            if (err) {
                console.error('Error al cerrar la base de datos:', err.message);
            } else {
                console.log('Conexión a la base de datos cerrada.');
            }
        });
    })
    .catch((err) => {
        console.error('Error al crear las tablas:', err);
        db.close();
    });