import UserController from '../controllers/UserController.js'

export default class ExamineUsersView {
    constructor() {
        this.userController = new UserController();


        //Elementos do DOM
        this.txtSearchUser = document.getElementById('txtSearchUser');
        this.btnRemove = document.getElementById('btnRemove');        
        this.tBody = document.getElementById('tBody');

        this.loadTable("");
        
        //À medida que se vai escrevendo no search...
        this.txtSearchUser.addEventListener('input', (event) => {
            this.loadTable(this.txtSearchUser.value);
        });

        //Clicar numa coluna da tabela indica qual o id do user selecionado, e ativa botões
        this.tBody.addEventListener('click', (e) => {
            this.selectedId = parseInt(e.target.parentNode.firstElementChild.innerHTML);
            this.btnRemove.disabled = false;
        });


        this.btnRemove.addEventListener('click', (event) => {
            if (confirm("Are you sure you wish to delete " + this.users[this.selectedId].username + "?")) {
                this.userController.deleteUser(this.selectedId);
                this.loadTable("");
            }
        });
    }

    loadTable(search) {
        //Limpar tabela de valores anteriors
        this.tBody.innerHTML = ``;
        //Importar utilizadores
        this.users = this.userController.userModel.getAll();
        for (let userId = 0; userId < this.users.length; userId++) { //Percorrer utilizadores
            //Do seguinte modo não é necessário escrever o username inteiro para que apareça
            //No entanto apareceram outros users que ainda correspondam
            var flag = true; //Flag para determinar se o user é mostrado ou não
            for (let index = 0; index < search.length; index++) { //Percorre cada character do Search e do Username
                if (search[index] != this.users[userId].username[index]) { //Se os characteres não corresponderem...
                    flag = false; break; //...A flag será falsa, e quebra-se o ciclo
                } 
            }
            if (flag) { //Se for verdadeiro
                //Adiciona à tabela o id e username de cada user que passou a flag
                this.tBody.innerHTML += `<tr id="tr${userId}"> <td>${this.users[userId].id}</td> <td>${this.users[userId].username}</td> </tr>`;
                document.getElementById('tr'+userId).style.cursor = "pointer";
            }
        }
    }
}