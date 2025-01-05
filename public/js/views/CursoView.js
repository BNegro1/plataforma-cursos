import { BaseView } from './BaseView.js';

export class CursoView extends BaseView {
  renderizarCursos(cursos) {
    const contenedor = this.obtenerElemento('listaCursos');
    this.limpiarElemento(contenedor);
    contenedor.innerHTML = cursos.map(curso => this.crearTarjetaCurso(curso)).join('');
  }

  crearTarjetaCurso(curso) {
    return `
      <div class="curso-card" data-id="${curso.id}">
        <h3>${curso.titulo}</h3>
        <p>${curso.descripcion}</p>
        <button class="btn-inscribir" data-curso-id="${curso.id}">
          Inscribirse
        </button>
      </div>
    `;
  }

  renderizarDetalleCurso(curso) {
    const contenedor = this.obtenerElemento('contenidoCurso');
    this.limpiarElemento(contenedor);
    contenedor.innerHTML = `
      <h2>${curso.titulo}</h2>
      <div class="contenido">
        ${curso.contenido.map(item => this.crearTema(item)).join('')}
      </div>
    `;
  }

  crearTema(tema) {
    return `
      <div class="tema">
        <h3>${tema.titulo}</h3>
        <p>${tema.texto}</p>
      </div>
    `;
  }
}