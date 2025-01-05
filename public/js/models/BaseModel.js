export class BaseModel {
  constructor() {
    if (this.constructor === BaseModel) {
      throw new Error('BaseModel es una clase abstracta');
    }
  }

  async fetchData(url, options = {}) {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    return response.json();
  }
}