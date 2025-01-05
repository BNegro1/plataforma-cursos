import { DailyController } from './DailyController.js';
import { DashboardView } from '../views/DashboardView.js';
import { CursoModel } from '../models/CursoModel.js';

export class DashboardController {
    constructor() {
        this.dailyController = new DailyController();
        this.dashboardView = new DashboardView();
        this.cursoModel = new CursoModel();
        this.init();
    }

    async init() {
        this.cargarCursosDashboard();
        this.dailyController.inicializarLlamadas();
    }

    async cargarCursosDashboard() {
        try {
            const cursos = await this.cursoModel.obtenerCursos();
            const misCursos = cursos.slice(0, 1); // Simulación de cursos inscritos (solo el primero)
            const disponibles = cursos.slice(1);

            this.dashboardView.mostrarCursos(misCursos, disponibles);
        } catch (error) {
            console.error('Error al cargar los cursos:', error);
        }
    }
}
