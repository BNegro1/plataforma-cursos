# Plataforma de Cursos Elearn

Plataforma educativa desarrollada con Node.js vanilla y SQLite.

## Requisitos

- Node.js 14.x o superior
- SQLite3
- bcrypt

## Estructura del Proyecto

```
src/
├── controllers/
│   ├── auth/
│   │   └── authController.js
│   └── courses/
│       └── coursesController.js
├── middleware/
│   ├── auth.js
│   └── validation.js
├── routes/
│   ├── authRoutes.js
│   ├── courseRoutes.js
│   └── userRoutes.js
├── views/
│   ├── auth/
│   │   ├── login.html
│   │   └── registro.html
│   ├── courses/
│   │   └── crear-curso.html
│   ├── errors/
│   │   └── 404.html
│   ├── layouts/
│   │   └── main.html
│   └── users/
│       └── perfil.html
├── router.js
└── server.js

data/
└── db.sqlite
```

## Instalación

1. Clonar el repositorio:

```bash
git clone <url-repositorio>
cd plataforma-cursos
```

2. Instalar dependencias:

```bash
npm install sqlite3 bcrypt
```

3. Inicializar base de datos:

```bash
node data/init-db.js
```

## Uso

1. Iniciar servidor:

```bash
node src/server.js
```

2. Acceder a la aplicación:

- URL: http://localhost:3000
- Puerto por defecto: 3000

## Características

- Autenticación de usuarios (estudiantes/docentes)
- Sistema de plantillas HTML
- Manejo de sesiones
- CRUD de cursos
- Perfiles de usuario
- Sistema de rutas modular
- Validaciones de formularios
- Manejo de errores

## Desarrollo

- Las vistas usan main.html como plantilla base
- Sistema de rutas basado en archivos
- Middlewares de autenticación y validación
- SQLite para persistencia de datos
- bcrypt para hash de contraseñas

## API Endpoints

### Autenticación

- GET/POST `/auth/login` - Iniciar sesión
- GET/POST `/auth/registro` - Registrar usuario
- GET `/auth/logout` - Cerrar sesión

### Usuarios

- GET `/users/perfil` - Ver perfil de usuario

### Cursos

- GET `/courses` - Listar cursos
- GET/POST `/courses/crear` - Crear nuevo curso (solo docentes)

## Base de Datos

### Tabla users

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rut TEXT UNIQUE NOT NULL,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    correo TEXT UNIQUE NOT NULL,
    contrasenia TEXT NOT NULL,
    tipo_usuario TEXT CHECK(tipo_usuario IN ('estudiante', 'docente')) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Contribuir

1. Fork el repositorio
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Crea un Pull Request

## Licencia

MIT
