import TeamController from '../controllers/TeamController.js'

export default class InspectTeamsView {
    constructor() {
        this.teamController = new TeamController();

        //Elementos do DOM
        this.txtSearchTeam = document.getElementById('txtSearchTeam');
        this.btnRemove = document.getElementById('btnRemove');        
        this.tBody = document.getElementById('tBody');

        this.loadTable("");
        
        //À medida que se vai escrevendo no search...
        this.txtSearchTeam.addEventListener('input', (event) => {
            this.loadTable(this.txtSearchTeam.value);
        });

        //Clicar numa coluna da tabela indica qual o id do user selecionado, e ativa botões
        this.tBody.addEventListener('click', (e) => {
            this.selectedId = parseInt(e.target.parentNode.firstElementChild.innerHTML);
            this.btnRemove.disabled = false;
        });


        this.btnRemove.addEventListener('click', (event) => {
            if (confirm("Are you sure you wish to delete " + this.teams[this.selectedId].name + "?")) {
                this.teamController.deleteTeam(this.selectedId);
                this.loadTable("");
            }
        });
    }

    loadTable(search) {
        //Limpar tabela de valores anteriors
        this.tBody.innerHTML = ``;
        //Importar equipas
        this.teams = this.teamController.teamModel.getAll();
        for (let teamId = 0; teamId < this.teams.length; teamId++) { //Percorrer equipas
            //Do seguinte modo não é necessário escrever o nome inteiro para que apareça
            //No entanto apareceram outras equipas que ainda correspondam
            var flag = true; //Flag para determinar se a equipa é mostrada ou não
            for (let index = 0; index < search.length; index++) { //Percorre cada character do Search e do Nome
                if (search[index] != this.teams[teamId].username[index]) { //Se os characteres não corresponderem...
                    flag = false; break; //...A flag será falsa, e quebra-se o ciclo
                } 
            }
            if (flag) { //Se for verdadeiro
                //Adiciona à tabela o id e nome de cada equipa que passou a flag
                this.tBody.innerHTML += `<tr id="tr${teamId}"> <td>${teamId}</td> <td>${this.teams[teamId].name}</td> </tr>`;
                document.getElementById('tr'+teamId).style.cursor = "pointer";
            }
        }
    }
}