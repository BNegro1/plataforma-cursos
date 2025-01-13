# Instrucciones de Inicio

1. **Instalar Dependencias**

   ```bash
   npm install sqlite3 bcrypt
   ```
2. **Inicializar Base de Datos**

   ```bash
   node data/init-db.js
   ```
3. **Crear Usuario Docente (Opcional)**

   ```bash
   # Acceder a la base de datos
   sqlite3 data/db.sqlite

   # Insertar docente (desde SQLite)
   INSERT INTO users (
     rut, 
     nombre, 
     apellido, 
     correo, 
     contrasenia, 
     tipo_usuario
   ) VALUES (
     '12345678-9',
     'Profesor',
     'Demo',
     'docente@demo.com',
     '$2b$10$abcdefghijklmnopqrstuv', # usar bcrypt para generar hash
     'docente'
   );

   # Salir de SQLite
   .exit
   ```
4. **Iniciar Servidor**

   ```bash
   node src/server.js
   ```
5. **Acceder al Proyecto**

   - Abrir navegador: [http://localhost:3000](http://localhost:3000)

   Credenciales de prueba:

   - Estudiante: estudiante@demo.com / 123456
   - Docente: docente@demo.com / 123456

**Notas:**

- Asegúrate de tener Node.js v14 o superior
- La base de datos SQLite se crea automáticamente
- Los archivos estáticos se sirven desde /assets
- Las vistas se encuentran en /src/views
