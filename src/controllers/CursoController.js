const CursoModel = require('../models/CursoModel');

class CursoController {
  static obtenerCursos(req, res) {
    CursoModel.obtenerCursos((err, cursos) => {
      if (err) {
        console.error('Error al obtener los cursos:', err.message);
        res.status(500).send('Error al obtener los cursos.');
      } else {
        res.render('dashboard', { cursos });
      }
    });
  }
}

module.exports = CursoController;
