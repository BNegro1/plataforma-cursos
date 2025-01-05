const db = require('../utils/db');

class CursoModel {
  static obtenerCursos(callback) {
    const sql = 'SELECT * FROM CURSO';
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error('Error en la consulta:', err.message);
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
  }
}

module.exports = CursoModel;
