import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { ApiRouter } from './routes/api.js';
import { serveStaticFile } from './utils/staticFiles.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3000;

const apiRouter = new ApiRouter();

const server = http.createServer(async (req, res) => {
  if (req.url.startsWith('/api')) {
    await apiRouter.handleRequest(req, res);
    return;
  }

  const filePath = path.join(__dirname, '..', 'public', 
    req.url === '/' ? 'index.html' : req.url);
  serveStaticFile(filePath, res);
});

server.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});