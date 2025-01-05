import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class LectorArchivos {
  constructor() {
    this.dataPath = path.join(__dirname, '../../data');
  }

  async leerJSON(nombreArchivo) {
    try {
      const contenido = await fs.readFile(
        path.join(this.dataPath, nombreArchivo), 
        'utf8'
      );
      return JSON.parse(contenido);
    } catch (error) {
      throw new Error(`Error al leer archivo ${nombreArchivo}: ${error.message}`);
    }
  }
}