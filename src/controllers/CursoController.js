import { BaseController } from './BaseController.js';
import { CursoModel } from '../models/CursoModel.js';
import { HttpResponse } from '../utils/HttpResponse.js';

export class CursoController extends BaseController {
  constructor() {
    super();
    this.cursoModel = new CursoModel();
  }

  async listarCursos(req, res) {
    await this.protected(req, res, async () => {
      const cursos = await this.cursoModel.obtenerTodos();
      HttpResponse.enviarJSON(res, cursos);
    });
  }

  async obtenerCurso(req, res, id) {
    await this.protected(req, res, async () => {
      const curso = await this.cursoModel.obtenerPorId(id);
      if (!curso) {
        return HttpResponse.enviarError(res, 'Curso no encontrado', 404);
      }
      HttpResponse.enviarJSON(res, curso);
    });
  }
}