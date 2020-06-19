import TeamController from '../controllers/TeamController.js'

export default class CreatTeamView {
    constructor() {
        this.teamController = new TeamController();

        this.Form       = document.getElementById('frmCreateTeam');
        this.txtName    = document.getElementById('txtName');
        this.txtCountry = document.getElementById('txtCountry');
        this.txtCity    = document.getElementById('txtCity');
        this.urlShirt   = document.getElementById('txtShirt');
        this.imgShirt   = document.getElementById('imgShirt');
        this.urlChat    = document.getElementById('txtChat');
        this.Message    = document.getElementById('Message');

        this.urlShirt.addEventListener('input', () => { this.imgShirt.src = this.urlShirt.value});        
        this.bindAddForm();
    }

    bindAddForm() {
        this.Form.addEventListener('submit', event => {
            event.preventDefault();
            try {
                this.teamController.createTeam(this.txtName.value, this.txtCountry.value, this.txtCity.value, this.urlShirt.value, this.urlChat.value);
                window.location.href = "Team.html?id=" + this.teamController.getId();
            } catch(e) {
                this.displayMessage(e, 'danger');
            }
        });
    }

    displayMessage(message, type) {
        this.Message.innerHTML =
            `<div class="alert alert-${type}" role="alert">${message}</div>`;
    }
}