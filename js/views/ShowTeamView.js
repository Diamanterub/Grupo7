import TeamController from '../controllers/TeamController.js'

export default class ShowTeamView {
    constructor() {
        this.teamController = new TeamController();
        this.id = window.location.search.replace('?id=', ''); //Saber o Id da team chamada, através do url

        //Área 'principal'
        this.imgShirt   = document.getElementById('imgShirt');
        this.txtName    = document.getElementById('txtName');
        this.txtCountry = document.getElementById('txtCountry');
        this.txtCity    = document.getElementById('txtCity');
        this.divBtnJL   = document.getElementById('divBtnJL');
        this.divBtnReq  = document.getElementById('divBtnReq');
        this.btnChat    = document.getElementById('btnChat');

        //Modal de ver Requests
        this.slcReq     = document.getElementById('slcRequest');
        this.reqRead    = document.getElementById('reqRead');
        this.reqAccept  = document.getElementById('reqAccept');
        this.reqDecline = document.getElementById('reqDecline');

        //Modal de mandar Request
        this.frmJoin    = document.getElementById('frmJoin');
        this.txtReason  = document.getElementById('txtReason');
        this.btnRequest = document.getElementById('btnRequest');

        //Stats
        this.slcType     = document.getElementById('slcType');
        this.slcDist     = document.getElementById('slcDist');
        this.txtSumDist  = document.getElementById('txtSumDist');
        this.txtSumTime  = document.getElementById('txtSumTime');
        this.txtPace     = document.getElementById('txtPace');
        this.txtBestTime = document.getElementById('txtBestTime');
        this.txtBestPos  = document.getElementById('txtBestPos');
        this.txtBTMember = document.getElementById('txtBTMember');
        this.txtBPMember = document.getElementById('txtBPMember');
        this.txtRank     = document.getElementById('txtRank');

        //Modals das Medalhas
        this.mdlCopper  = document.getElementById('mdlCopper');
        this.mdlBronze  = document.getElementById('mdlBronze');
        this.mdlSilver  = document.getElementById('mdlSilver');
        this.mdlGold    = document.getElementById('mdlGold');
        this.mdlPlat    = document.getElementById('mdlPlat');
        this.mdlDiamond = document.getElementById('mdlDiamond');
        this.mdlMaster  = document.getElementById('mdlMaster');
        this.mdlSwift   = document.getElementById('mdlSwift');

        //Tabela users
        this.tblMembers = document.getElementById('tblMembers');

        //Carregar todas informações
        this.loadAll();        
    }

    loadAll() {
        //Busca de toda a informação da equipa em questão
        const allInfo = this.teamController.teamModel.getAll()[this.id];

        //Carrega a informação da área 'principal', e o modal, se o user for o lider, com os pedidos de entrada
        this.loadMain(this.teamController.getMain(allInfo));
        this.loadBtns(this.isTeamMember(allInfo.members), allInfo.leader) ? this.loadReqs(allInfo.requests) : {} ;
        
        this.slcReq.addEventListener('change', (event) => {
            if (this.slcReq.value != "") {
                this.reqRead.disabled = false;
                this.reqAccept.disabled = false;
                this.reqDecline.disabled = false;
        
                this.reqRead.addEventListener('click', event => {
                    alert(allInfo.requests[this.slcReq.value].reason);
                });
                this.reqAccept.addEventListener('click', event => {
                    this.teamController.addMember(
                        true, this.slcReq.value, allInfo.requests[this.slcReq.value].name,
                        allInfo.requests[this.slcReq.value].userId, this.id
                    );
                    this._reload();
                });
                this.reqDecline.addEventListener('click', event => {
                    this.teamController.addMember( false, this.slcReq.value, "", "", this.id);
                    this._reload();
                });
            }
        });

        //Carregar Stats e Medalhas
        this.loadStats(this.teamController.getStats(this.slcType.value, this.slcDist.value, allInfo.stats));
        this.loadMedals(allInfo.medals);

        //Atualizar stats ao mudar o valor de um dropdown
        this.slcType.addEventListener('change', (event) => { this.loadStats(); });
        this.slcDist.addEventListener('change', (event) => { this.loadStats(); });

        //Carregar membros e respetivos ranks
        this.loadMembers(allInfo.members, allInfo.leader);

        //Envio de pedido de entrada
        this.frmJoin.addEventListener('submit', event => {
            event.preventDefault();
            this.teamController.sendRequest(this.txtReason.value, this.id);
            this.btnRequest.disabled = true;
        });
    }

    loadMain(mainInfo) { //Carrega as informações principais
        this.imgShirt.src = mainInfo.shirt;
        this.txtName.innerHTML = mainInfo.name;
        this.txtCountry.innerHTML = mainInfo.country;
        this.txtCity.innerHTML = mainInfo.city;
        this.btnChat.onclick = function() { window.open(mainInfo.chat); }
    }

    loadBtns(memberId, leader) { //Consoante duas verificações, coloca os botões de Join, Leave, e Requests
        if (memberId !== false) { //Se o user logado fizer parte da equipa...
            this.divBtnJL.innerHTML = `<input type="button" value="Leave" id="">`; //...Coloca o botão de Leave

            if (memberId == leader) { //...Se o membro for o líder...
                this.divBtnReq.innerHTML = //...Coloca o botão de ver Requests
                `<input type="button" value="Requests" id="" data-toggle="modal" data-target="#SeeReqs">`;
                return true; //...Retorna verdadeiro para a função loadReqs correr
            }
        } else { //Senão coloca o botão de Join
            this.divBtnJL.innerHTML = `<input type="button" value="Join" id="" data-toggle="modal" data-target="#ReqJoin">`;
            this.btnChat.disabled = true; //Impede o user de aceder ao chat da equipa a que não pertence
        }
        return false; //Retorna falso para a função loadReqs não correr
    }

    isTeamMember(members) { //Verifica se é membro da equipa
        //Vai buscar o user logado
        const user = localStorage.loggedUser ? localStorage.getItem('loggedUser') : sessionStorage.getItem('loggedUser');
        for (let memberId = 0; memberId < members.length; memberId++) { //Percorre os membros da equipa
            if (user == members[memberId].name) { //Se o user tiver o mesmo username que o membro em questão...
                return memberId; //...retorna o id de membro
            }
        }
        return false; //Retorna que não é membro
    }
    
    loadReqs(requests) { //Coloca no modal de Requests os pedidos de entrada para serem aceites ou recusados
        for (let requestId = 0; requestId < requests.length; requestId++) {
            var option = document.createElement("option"); //Cria um elemento <option>
            option.text  = requests[requestId].name; //Atribui ao texto da option o username do user
            option.value = requestId; //Atruibui ao valor da option o id do pedido
            this.slcReq.add(option); //Adiciona ao dropdown a option
        }
    }

    _reload() {
        this.slcReq.selectedIndex = 0;
        this.reqRead.disabled = true;
        this.reqAccept.disabled = true;
        this.reqDecline.disabled = true;
        this.loadAll();
    }

    loadStats(teamStats) { //Coloca dentro dos <p> as respetivas estatísticas
        this.txtSumDist.innerHTML  = `Total Distance: ${teamStats.sumDist} km`;
        this.txtSumTime.innerHTML  = `Total Time: ${Math.round((teamStats.sumTime / 3600) * 100) / 100} hours`;
        this.txtBestTime.innerHTML = `Record: ${teamStats.bestTime}`;
        this.txtBestPos.innerHTML  = `Best Position: ${this._getNth(teamStats.bestPos)}`;
        this.txtBTMember.innerHTML = `Record by Member: ${teamStats.bestTimeMember}`;
        this.txtBPMember.innerHTML = `Best Pos. Member: ${teamStats.bestPosMember}`;
        this.txtPace.innerHTML     = `Average Pace: ${teamStats.pace} km/h`;
    }

    loadMedals(teamMedals) { //Coloca dentro das tabelas de cada modal de medalha as infos respetivas
        for (let i = 0; i < teamMedals.copper.length; i++) {
            this.mdlCopper.innerHTML +=
            `<tr>
                <th scope="row">${teamMedals.copper[i].event}</th>
                <td>${this._getNth(teamMedals.copper[i].edition)}</td>
                <td>${teamMedals.copper[i].dist}</td>
                <td>${teamMedals.copper[i].type}</td>
                <td>${this._getNth(teamMedals.copper[i].pos)}</td>
                <td>${teamMedals.copper[i].time}</td>
                <td>${teamMedals.copper[i].member}</td>
            </tr>`
        }
        
        for (let i = 0; i < teamMedals.bronze.length; i++) {
            this.mdlBronze.innerHTML +=
            `<tr>
                <th scope="row">${teamMedals.bronze[i].event}</th>
                <td>${this._getNth(teamMedals.bronze[i].edition)}</td>
                <td>${teamMedals.bronze[i].dist}</td>
                <td>${teamMedals.bronze[i].type}</td>
                <td>${this._getNth(teamMedals.bronze[i].pos)}</td>
                <td>${teamMedals.bronze[i].time}</td>
                <td>${teamMedals.bronze[i].member}</td>
            </tr>`
        }
        
        for (let i = 0; i < teamMedals.silver.length; i++) {
            this.mdlSilver.innerHTML +=
            `<tr>
                <th scope="row">${teamMedals.silver[i].event}</th>
                <td>${this._getNth(teamMedals.silver[i].edition)}</td>
                <td>${teamMedals.silver[i].dist}</td>
                <td>${teamMedals.silver[i].type}</td>
                <td>${this._getNth(teamMedals.silver[i].pos)}</td>
                <td>${teamMedals.silver[i].time}</td>
                <td>${teamMedals.silver[i].member}</td>
            </tr>`
        }
        
        for (let i = 0; i < teamMedals.gold.length; i++) {
            this.mdlGold.innerHTML +=
            `<tr>
                <th scope="row">${teamMedals.gold[i].event}</th>
                <td>${this._getNth(teamMedals.gold[i].edition)}</td>
                <td>${teamMedals.gold[i].dist}</td>
                <td>${teamMedals.gold[i].type}</td>
                <td>${this._getNth(teamMedals.gold[i].pos)}</td>
                <td>${teamMedals.gold[i].time}</td>
                <td>${teamMedals.gold[i].member}</td>
            </tr>`
        }
        
        for (let i = 0; i < teamMedals.plat.length; i++) {
            this.mdlPlat.innerHTML +=
            `<tr>
                <th scope="row">${teamMedals.plat[i].event}</th>
                <td>${this._getNth(teamMedals.plat[i].edition)}</td>
                <td>${teamMedals.plat[i].dist}</td>
                <td>${teamMedals.plat[i].type}</td>
                <td>${this._getNth(teamMedals.plat[i].pos)}</td>
                <td>${teamMedals.plat[i].time}</td>
                <td>${teamMedals.plat[i].member}</td>
            </tr>`
        }
        
        for (let i = 0; i < teamMedals.diamond.length; i++) {
            this.mdlDiamond.innerHTML +=
            `<tr>
                <th scope="row">${teamMedals.diamond[i].event}</th>
                <td>${this._getNth(teamMedals.diamond[i].edition)}</td>
                <td>${teamMedals.diamond[i].dist}</td>
                <td>${teamMedals.diamond[i].type}</td>
                <td>${this._getNth(teamMedals.diamond[i].pos)}</td>
                <td>${teamMedals.diamond[i].time}</td>
                <td>${teamMedals.diamond[i].member}</td>
            </tr>`
        }
        
        for (let i = 0; i < teamMedals.master.length; i++) {
            this.mdlMaster.innerHTML +=
            `<tr>
                <th scope="row">${teamMedals.master[i].event}</th>
                <td>${this._getNth(teamMedals.master[i].edition)}</td>
                <td>${teamMedals.master[i].dist}</td>
                <td>${teamMedals.master[i].type}</td>
                <td>${this._getNth(teamMedals.master[i].pos)}</td>
                <td>${teamMedals.master[i].time}</td>
                <td>${teamMedals.master[i].member}</td>
            </tr>`
        }
        
        for (let i = 0; i < teamMedals.swift.length; i++) {
            this.mdlSwift.innerHTML +=
            `<tr>
                <th scope="row">${teamMedals.swift[i].event}</th>
                <td>${this._getNth(teamMedals.swift[i].edition)}</td>
                <td>${teamMedals.swift[i].dist}</td>
                <td>${teamMedals.swift[i].type}</td>
                <td>${this._getNth(teamMedals.swift[i].pos)}</td>
                <td>${teamMedals.swift[i].time}</td>
                <td>${teamMedals.swift[i].member}</td>
            </tr>`
        }
    }

    _getNth(number) { //Adição do sufixo inglês de numeros ordinais 
        number = number.toString(); //Converção para string de modo a se poder escolher o dígito
        if (number.length == 1) { //Se o número já for de 1 só digito, calcula logo
            return number + this._lastDigit(number);
        } else { //Senão...
            if (number == "N/A") { return number; } //Se não for um número, no caso "Not Available", não faz o cálculo
            if (number[number.length - 2] == 1) { //If, devido a números acabados em 11, 12, e 13 serem a excepção
                return number + "th";
            } else {
                return number + this._lastDigit(number[number.length - 1]);
            }
        }
    }

    _lastDigit(num) { //Função que retorna o sufixo dependendo do último digito do número
        switch (num) {
            case "1": return "st";
            case "2": return "nd";
            case "3": return "rd";
            default:  return "th";
        }
    }

    loadMembers(members, leader) { //Carrega os membros da equipa para uma tabela
        const users = JSON.parse(localStorage.users);
        this.tblMembers.innerHTML = //O lider da equipa fica sempre em primeiro, tendo formatação especial
        `<tr>
            <th scope="row">${members[leader].name}</th>
            <td>${users[members[leader].userId].rank}</td>
        </tr>`
        for (let memberId = 0; memberId < members.length; memberId++) { //Depois são inseridos todos os membros...
            if (memberId != leader) { //...passando à frente o lider
                this.tblMembers.innerHTML += 
                `<tr>
                    <td>${members[memberId].name}</td>
                    <td>${users[members[memberId].userId].rank}</td>
                </tr>`
            }
        }
    }
}