import { BaseModel } from './BaseModel.js';

export class CursoModel extends BaseModel {
  async obtenerCursos() {
    try {
      return await this.fetchData('/api/cursos');
    } catch (error) {
      throw new Error('Error al obtener cursos: ' + error.message);
    }
  }

  async obtenerCurso(id) {
    try {
      return await this.fetchData(`/api/cursos/${id}`);
    } catch (error) {
      throw new Error('Error al obtener curso: ' + error.message);
    }
  }
}