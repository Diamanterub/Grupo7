import EventController from '../controllers/EventController.js'

export default class ManageRunnersView {
    constructor() {
        this.eventController = new EventController();

        //Elementos do DOM
        this.slcEvent = document.getElementById('slcEvent');
        this.tBody = document.getElementById('tBody');
        
        //Importar eventos para o Select
        this.eventController.importEvents(this.slcEvent, "all");
        //Quando se escolhe um valor no Select
        this.slcEvent.addEventListener('change', (event) => {
            //Limpar tabela de valores anteriors
            this.tBody.innerHTML = ``;
            //Importar atletas inscritos no evento escolhido
            const runners = this.eventController.getRunners(this.slcEvent.value);
            for (let runnerId = 0; runnerId < runners.length; runnerId++) {
                //Adicionar à tabela o username de cada atleta
                this.tBody.innerHTML += `<tr> <td>${runners[runnerId].data.runner}</td> </tr>`;
            }
        });
    }

}