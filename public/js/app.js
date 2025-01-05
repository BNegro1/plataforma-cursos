import { CursoModel } from './models/CursoModel.js';
import { CursoView } from './views/CursoView.js';
import { CursoController } from './controllers/CursoController.js';

// Inicializar la aplicación
const cursoModel = new CursoModel();
const cursoView = new CursoView();
const cursoController = new CursoController(cursoModel, cursoView);