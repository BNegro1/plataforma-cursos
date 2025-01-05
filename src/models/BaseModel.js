// Clase base para modelos con funcionalidad común
export class BaseModel {
  constructor() {
    if (this.constructor === BaseModel) {
      throw new Error('BaseModel es una clase abstracta');
    }
  }

  async validar() {
    throw new Error('El método validar debe ser implementado');
  }
}