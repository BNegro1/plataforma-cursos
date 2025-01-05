# Plataforma de Aprendizaje

Roadmap con los pasos necesarios para desarrollar una plataforma de aprendizaje en línea, siguiendo las especificaciones y restricciones **proporcionadas**.

## Objetivo General

Crear una plataforma de aprendizaje en línea simple y funcional, respetando las restricciones impuestas:

* **Backend:** Usar **Node.js** con **JavaScript puro**.
* **Frontend:** Usar **JavaScript puro, HTML** y **CSS**.
* **Sin Frameworks:** No usar ningún framework en el **frontend** ni en el **backend**.
* **Arquitectura MVC:** Implementar la arquitectura **Modelo-Vista-Controlador** manualmente.
* **POO:** Aplicar los principios de Programación Orientada a Objetos.
* **Enfoque:** Priorizar la simplicidad y la eficiencia.

## I. Planificación y Configuración del Proyecto

1. **Estructura del proyecto:**
   * Crear una carpeta raíz llamada `plataforma-aprendizaje`.
   * Dentro, crear las carpetas:
     * `public/`: Para archivos estáticos del frontend (HTML, CSS, JavaScript).
     * `data/`: Para la base de datos (ej., archivos JSON o sqlite).
   * Crear los archivos:
     * `backend.js`: Para el código del servidor Node.js.
     * `package.json`: Para la gestión de dependencias.
2. **Inicialización de Node.js:**
   * Ejecutar `npm init -y` en la carpeta raíz.
3. **Configuración del Frontend Inicial:**
   * En `public/` crear:
     * `index.html`: Estructura de la página principal.
     * `style.css`: Estilos de la página.
     * `app.js`: Lógica del frontend.
4. **Selección de la Base de Datos:**
   * Seleccionar una base de datos (JSON, SQLite, etc.).
   * Instalar la librería correspondiente si es necesario (ej. `npm install sqlite3`).

## II. Desarrollo del Backend con Node.js

1. **Servidor HTTP:**
   * Usar el módulo `http` de Node.js para crear un servidor.
   * El servidor debe escuchar en un puerto específico (ej., 3000).
2. **Enrutamiento:**
   * Crear una función para analizar la URL y redirigir a la función correspondiente.
   * Definir rutas: `/` (página principal), `/cursos` (listar cursos), etc.
3. **Gestión de Archivos Estáticos:**
   * Usar el módulo `fs` para servir archivos desde `public/`.
4. **Envío de Respuestas JSON:**
   * Crear una función para enviar datos en formato JSON.
   * Utilizar `JSON.stringify()`.
5. **Conexión a la Base de Datos:**
   * Usar la librería correspondiente (ej. `sqlite3`).
   * Crear funciones para realizar consultas (SELECT, INSERT, UPDATE, DELETE).
6. **Lógica del Backend:**
   * Crear modelos para interactuar con la base de datos.
   * Crear un sistema simple de plantillas (si es necesario).
   * Crear controladores para gestionar peticiones del frontend:
     * Obtener cursos.
     * Añadir cursos al panel del usuario.
     * Obtener información de un curso.
     * Realizar evaluaciones.
     * Enviar datos al frontend.

## III. Desarrollo del Frontend con JavaScript Puro

1. **Estructura HTML:**
   * Crear `index.html` con:
     * Listado de cursos.
     * Información de cada curso.
     * Contenido de cursos y evaluaciones.
2. **Estilos CSS:**
   * Crear `style.css` con estilos para la página.
   * Usar un CSS modular, Grid o Flexbox si es necesario.
3. **Lógica JavaScript:**
   * Crear `app.js` con la lógica para:
     * Hacer peticiones al backend (con `fetch` o `XMLHttpRequest`).
     * Manipular el DOM para mostrar la información.
     * Gestionar interacciones del usuario (seleccionar curso, realizar evaluación).

## IV. Implementación Manual del Patrón MVC

1. **Backend (Node.js):**
   * **Modelos:** Lógica de negocio y acceso a la base de datos.
   * **Vistas:** Plantillas HTML básicas (si es necesario).
   * **Controladores:** Funciones para recibir peticiones, interactuar con modelos y vistas, y enviar respuestas.
2. **Frontend (JavaScript):**
   * **Modelos:** Funciones para obtener datos del backend y gestionarlos.
   * **Vistas:** Elementos del DOM que se actualizan dinámicamente.
   * **Controladores:** Manejadores de eventos y peticiones al servidor que actualizan los modelos y las vistas.

## V. Funcionalidades Principales

1. **Visualización de Cursos:**
   * Mostrar una lista de cursos en la página principal.
2. **Selección de Cursos:**
   * Permitir al usuario seleccionar cursos y agregarlos a su tablero.
   * Almacenar esta información en la base de datos o sesión del usuario.
3. **Contenido de Cursos:**
   * Mostrar el contenido de cada curso (textos, imágenes, videos, etc.).
   * Este contenido puede ser ficticio.
4. **Evaluaciones:**
   * Permitir al usuario realizar evaluaciones en cada curso.
   * Usar preguntas de selección múltiple relacionadas con el contenido.
   * Mostrar los resultados de las evaluaciones al usuario.

## VI. Refinamiento, Pruebas y Documentación

1. **Pruebas:**
   * Realizar pruebas unitarias para cada módulo.
   * Realizar pruebas de integración entre el frontend y el backend.
2. **Refactorización:**
   * Eliminar código duplicado.
   * Mejorar la legibilidad y mantenibilidad del código.
3. **Manejo de Errores:**
   * Implementar un sistema para gestionar errores del servidor y la base de datos.
4. **Documentación:**
   * Comentar el código de forma clara y concisa.
   * Escribir una breve descripción sobre cómo ejecutar el proyecto.

## Restricciones a Cumplir

* **JavaScript puro:** Utilizar JavaScript sin frameworks.
* **Sin Frameworks:** No utilizar frameworks en el frontend ni en el backend.
* **Arquitectura MVC manual:** Implementar el patrón MVC sin frameworks.
* **POO:** Aplicar los principios de la Programación Orientada a Objetos.
