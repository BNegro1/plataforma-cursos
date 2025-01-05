import { CursoModel } from './models/CursoModel.js';
import { CursoView } from './views/CursoView.js';
import { CursoController } from './controllers/CursoController.js';

// Inicializar modelos, vistas y controladores
const cursoModel = new CursoModel();
const cursoView = new CursoView();
const cursoController = new CursoController(cursoModel, cursoView);

// Variables globales
let usuarioLogueado = null;

// Funciones auxiliares
async function login(username, password) {
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.success) {
        usuarioLogueado = username;
        alert(data.message);
        window.location.href = '/public/dashboard.html';
    } else {
        alert(data.message);
    }
}

async function register(username, password) {
    const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.success) {
        alert(data.message);
    } else {
        alert(data.message);
    }
}

async function cargarCursosDashboard() {
    const cursos = await cursoModel.obtenerCursos();
    const misCursos = cursos.slice(0, 1); // Simulación de cursos inscritos
    const disponibles = cursos.slice(1);

    // Renderizar cursos
    cursoView.renderizarCursos(misCursos, 'misCursos');
    cursoView.renderizarCursos(disponibles, 'listaCursos');
}

// Eventos principales
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const dashboardCursos = document.getElementById('misCursos');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            login(username, password);
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('regUsername').value;
            const password = document.getElementById('regPassword').value;
            register(username, password);
        });
    }

    if (dashboardCursos) {
        cargarCursosDashboard();
    }
});
