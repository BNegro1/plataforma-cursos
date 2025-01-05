import { CursoController } from '../controllers/CursoController.js';

export class ApiRouter {
  constructor() {
    this.cursoController = new CursoController();
  }

  async handleRequest(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const path = url.pathname;

    if (path === '/api/cursos' && req.method === 'GET') {
      await this.cursoController.listarCursos(req, res);
    } else if (path.match(/^\/api\/cursos\/\d+$/) && req.method === 'GET') {
      const id = path.split('/').pop();
      await this.cursoController.obtenerCurso(req, res, id);
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
    }
  }
}