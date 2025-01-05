import { BaseModel } from './BaseModel.js';
import { LectorArchivos } from '../utils/LectorArchivos.js';

export class CursoModel extends BaseModel {
  constructor() {
    super();
    this.lectorArchivos = new LectorArchivos();
  }

  async obtenerTodos() {
    try {
      const cursos = await this.lectorArchivos.leerJSON('cursos.json');
      return cursos.cursos;
    } catch (error) {
      throw new Error('Error al obtener cursos: ' + error.message);
    }
  }

  async obtenerPorId(id) {
    try {
      const cursos = await this.obtenerTodos();
      return cursos.find(curso => curso.id === parseInt(id));
    } catch (error) {
      throw new Error('Error al obtener curso: ' + error.message);
    }
  }

  async validar(curso) {
    if (!curso.titulo || !curso.descripcion) {
      throw new Error('El curso debe tener título y descripción');
    }
    return true;
  }
}