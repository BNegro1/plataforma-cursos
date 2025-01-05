export class HttpResponse {
  static enviarJSON(res, datos, codigo = 200) {
    res.writeHead(codigo, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(datos));
  }

  static enviarError(res, mensaje, codigo = 500) {
    res.writeHead(codigo, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: mensaje }));
  }
}