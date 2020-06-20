import EventController from '../controllers/EventController.js'

export default class LeaderboardView {
    constructor() {
        this.eventController = new EventController();

        this.Form      = document.getElementById("frmLB");    //Form onde se pesquisa entre Eventos e distâncias
        this.lbEvent   = document.getElementById("lbEvent");  //Dropdown com os eventos
        this.lbDist    = document.getElementById("lbDist");   //Dropdown com as distâncias
        this.lbSubmit  = document.getElementById("lbSubmit"); //Botão de submit
        this.tBody     = document.getElementById("tBody");    //Corpo da tabela onde é construido o Leaderboard

        this.eventController.importEvents(this.lbEvent, "closed"); //Importar os eventos concluídos para o lbEvents
        this.lbDist.addEventListener('change', (event) => { //Quando se escolhe uma distância, o Submit fica disponível
            this.lbDist.value != "" ? this.lbSubmit.disabled = false : {} ;
        });
        this.inputEvent();
        this.send();
    }

    inputEvent() { //Quando se escolhe um evento, o lbDist fica disponível e são importadas para este as distâncias do respetivo evento
        this.lbEvent.addEventListener('change', (event) => {
            this.clear();
            if (this.lbEvent.value != "") {
                this.lbDist.disabled = false; //lbDist disponível
                this.lbDist.selectedIndex = "0"; //Selecionada a sua primeira posição, default, ("Distance")
                this.eventController.importDistances(this.lbDist, this.lbEvent.value); //Importação das distâncias
            }
        });
    }
    
    clear() { //Remoção das distâncias do evento anteriormente selecionado para serem adicionadas as do novo evento
        for ( ; this.lbDist.length > 1; ) { //Loop até não existirem opções de distâncias
            this.lbDist.selectedIndex = "1"; //Seleção da segunda opção
            this.lbDist.remove(this.lbDist.selectedIndex); //Remoção da opção selecionada
        }
        this.lbDist.selectedIndex = "0"; //Selecionada a sua primeira posição, default, ("Distance")
        this.lbDist.disabled = true; //lbDist indisponível
        this.lbSubmit.disabled = true; //Submit indisponível
    }

    send() { //Envio da escolha
        this.Form.addEventListener('submit', event => {
            event.preventDefault(); //Previne o submit default de um <input type="submit"> 

            this.eventController.importFromLeaderboard(this.lbEvent.value, this.lbDist.value, this.tBody); //Importa o leaderboard
        });
    }
}