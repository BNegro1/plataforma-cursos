import { BaseView } from './BaseView.js';

export class DashboardView extends BaseView {
    mostrarCursos(misCursos, disponibles) {
        this.renderizarCursos(misCursos, 'misCursos');
        this.renderizarCursos(disponibles, 'listaCursos');
    }

    renderizarCursos(cursos, contenedorId) {
        const contenedor = this.obtenerElemento(contenedorId);
        this.limpiarElemento(contenedor);
        cursos.forEach(curso => {
            const cursoHtml = `
                <div class="curso-card">
                    <h3>${curso.titulo}</h3>
                    <p>${curso.descripcion}</p>
                    <button class="btn-inscribir">Inscribirse</button>
                </div>`;
            contenedor.innerHTML += cursoHtml;
        });
    }
}
