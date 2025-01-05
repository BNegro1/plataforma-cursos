export class BaseController {
  constructor() {
    if (this.constructor === BaseController) {
      throw new Error('BaseController es una clase abstracta');
    }
  }

  protected(callback) {
    try {
      return callback();
    } catch (error) {
      console.error('Error:', error);
      this.manejarError(error);
    }
  }

  manejarError(error) {
    
    // Implementar manejo de errores específico
    console.error('Error en controlador:', error);
  }
}