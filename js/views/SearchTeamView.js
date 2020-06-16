import TeamController from '../controllers/TeamController.js'

export default class EventView {
    constructor() {
        this.teamController = new TeamController();
        this.Form    = document.getElementById('frmSearchTeam');
        this.Name    = document.getElementById('txtName');
        this.Country = document.getElementById('txtCountry');
        this.City    = document.getElementById('txtCity');
        this.Select  = document.getElementById('selectOps');
        this.Btns    = document.getElementById('areaMessage');
        this.Message = document.getElementById('areaMessage');
        this.Catalog = document.getElementById('areaCatalog');

        this.loadShow();
        this.loadBtn();
        
        this.Form.addEventListener('submit', event => {
            event.preventDefault();
            this.loadShow();
        });
    }

    loadShow() {
        try {
            const teamCatalog = this.teamController.searchTeam(
                this.Name.value, this.Country.value, this.City.value, this.Select.value);
            for (let i = 0; i < teamCatalog.length; i++) {
                this.Catalog.innerHTML += 
                `<a href="Team.html?id=${teamCatalog[i].id}"><div class="card"><img src="${teamCatalog[i].url}" class="img-fluid" alt="Tshirt"></div></a>`
            }
        } catch(e) {
            this.displayMessage(e, 'danger');
        }
        
    }

    loadBtn() {
        const userTeamID = this.teamController.getId();
        if (userTeamID != false) {
            this.Btns.innerHTML =
            `<input id="buttonopt" type="submit" onclick="window.location.href='/html/Team.html?id=${userTeamID}'"
            value="${this.teamController.teamModel.getAll()[userTeamID].name}">`
        } else {
            this.Btns.innerHTML = `<input id="buttonopt" type="submit" value="CREATE TEAM"
            onclick="window.location.href='/html/team-c.html'">`
        }
    }

    displayMessage(message, type) {
        this.Message.innerHTML =
            `<div class="alert alert-${type}" role="alert">${message}</div>`;
    }
}