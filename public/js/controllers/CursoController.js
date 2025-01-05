import { BaseController } from './BaseController.js';

export class CursoController extends BaseController {
  constructor(model, view) {
    super();
    this.model = model;
    this.view = view;
    this.init();
  }

  async init() {
    await this.protected(async () => {
      this.setupEventListeners();
      await this.cargarCursos();
    });
  }

  setupEventListeners() {
    document.getElementById('listaCursos').addEventListener('click', 
      (e) => this.manejarClickCurso(e));
  }

  async cargarCursos() {
    await this.protected(async () => {
      const cursos = await this.model.obtenerCursos();
      this.view.renderizarCursos(cursos);
    });
  }

  async manejarClickCurso(evento) {
    if (evento.target.classList.contains('btn-inscribir')) {
      const cursoId = evento.target.dataset.cursoId;
      await this.inscribirEnCurso(cursoId);
    }
  }

  async inscribirEnCurso(cursoId) {
    await this.protected(async () => {
      const curso = await this.model.obtenerCurso(cursoId);
      this.view.renderizarDetalleCurso(curso);
      this.mostrarSeccion('contenidoCurso');
    });
  }

  mostrarSeccion(seccionId) {
    document.querySelectorAll('.seccion').forEach(seccion => {
      seccion.classList.add('oculto');
    });
    document.getElementById(seccionId).classList.remove('oculto');
  }
}