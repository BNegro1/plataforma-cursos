import { DailyModel } from '../models/DailyModel.js';

export class DailyController {
    constructor() {
        this.dailyModel = new DailyModel();
    }

    inicializarLlamadas() {
        const callButton = document.getElementById('joinCall');
        if (callButton) {
            callButton.addEventListener('click', () => {
                const callUrl = this.dailyModel.obtenerUrlLlamada();
                const callFrame = window.Daily.createFrame();
                callFrame.join({ url: callUrl });
            });
        }
    }
}
