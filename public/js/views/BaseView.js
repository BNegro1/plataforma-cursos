export class BaseView {
  constructor() {
    if (this.constructor === BaseView) {
      throw new Error('BaseView es una clase abstracta');
    }
  }

  obtenerElemento(id) {
    const elemento = document.getElementById(id);
    if (!elemento) {
      throw new Error(`Elemento con id "${id}" no encontrado`);
    }
    return elemento;
  }

  limpiarElemento(elemento) {
    elemento.innerHTML = '';
  }
}