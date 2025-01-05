export class DailyModel {
    constructor() {
        this.baseUrl = 'https://pancho.daily.co/';
    }

    obtenerUrlLlamada() {
        //TODO: Url dinamica
        return `${this.baseUrl}probando`;
    }
}
