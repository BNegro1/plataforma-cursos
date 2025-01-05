import { DashboardView } from '../views/DashboardView.js';
import { CursoModel } from '../models/CursoModel.js';

export class DashboardController {
    constructor() {
        this.dashboardView = new DashboardView();
        this.cursoModel = new CursoModel();
        this.init();
    }

    async init() {
        this.cargarCursosDashboard();
        this.inicializarParticles();
    }

    async cargarCursosDashboard() {
        try {
            const cursos = await this.cursoModel.obtenerCursos();
            const misCursos = cursos.slice(0, 1); // Simulación de cursos inscritos
            const disponibles = cursos.slice(1);

            this.dashboardView.mostrarCursos(misCursos, disponibles);
        } catch (error) {
            console.error('Error al cargar los cursos:', error);
        }
    }

    inicializarParticles() {
        particlesJS.load('particles-js', '/assets/particles-config.json', function () {
            console.log('Particles.js configurado correctamente');
        });
    }
}
