import { HttpResponse } from '../utils/HttpResponse.js';

export class BaseController {
  constructor() {
    if (this.constructor === BaseController) {
      throw new Error('BaseController es una clase abstracta');
    }
  }

  protected(req, res, callback) {
    try {
      return callback();
    } catch (error) {
      HttpResponse.enviarError(res, error.message);
    }
  }
}