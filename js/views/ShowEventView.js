import EventController from '../controllers/EventController.js'

export default class EventView {
    constructor() {
        this.eventController = new EventController();
        this.id = window.location.search.replace('?id=', '');

        //Página
        this.Poster = document.getElementById('imgPoster');
        this.Info = document.getElementById('txtInfo');
        this.Buttons = document.getElementById('divBtn');
        this.Gauge = document.getElementById('divGauge');
        this.About = document.getElementById('txtAbout');
        this.Map = document.getElementById('imgMap');
        try {
            this.Dists = document.getElementById('frmDists');
        } catch (e) {}

        this.getContent();

        //Form Pop-up
        try {
            this.Form = document.getElementById('frmRegister');
            this.Solo = document.getElementById('frmSolo');
            this.Team = document.getElementById('frmTeam');
            try { this.d5K = document.getElementById('frm5K'); } catch (error) {}
            try { this.d10K = document.getElementById('frm10K'); } catch (error) {}
            try { this.d21K = document.getElementById('frm21K'); } catch (error) {}
            try { this.d42K = document.getElementById('frm42K'); } catch (error) {}
            this.Message = document.getElementById('mdlRegisterMessage');

            if (this.isTeamLeader() == false) { this.Solo.checked = true; this.Team.disabled = true; }

            this.eventRegister();
        } catch (e) {}
    }

    getContent() {
        this.eventController.findContent(this.Poster, this.Info, this.Buttons, this.Gauge, this.About, this.Map, this.id, this.Dists);
    }

    eventRegister() {
        this.Form.addEventListener('submit', event => {
            event.preventDefault();

            try {
                var dist = ""
                try {
                    if (this.d5K  !== null && this.d5K  !== undefined) { if (this.d5K.checked ) { dist = "5K" ; } }
                    if (this.d10K !== null && this.d10K !== undefined) { if (this.d10K.checked) { dist = "10K"; } }
                    if (this.d21K !== null && this.d21K !== undefined) { if (this.d21K.checked) { dist = "21K"; } }
                    if (this.d42K !== null && this.d42K !== undefined) { if (this.d42K.checked) { dist = "42K"; } }
                    } catch (error) { this.displayEventMessage(error, 'danger'); return;
                }
                var run = "";
                try {                    
                    if (this.Solo !== null) { if (this.Solo.checked) { run = "solo"; } }
                    if (this.Team !== null) { if (this.Team.checked) { run = "team"; } }
                } catch (error) {
                    this.displayEventMessage('Select between Solo or Team', 'danger');
                    return;
                }
                this.eventController.enroll(dist, run, this.id);
                this.displayEventMessage('Success!', 'success');
            } catch(e) {
                this.displayEventMessage(e, 'danger');
            }
        });
    }

    displayEventMessage(message, type) {
        this.Message.innerHTML =
            `<div class="alert alert-${type}" role="alert">${message}</div>`;
    }

    isTeamLeader() {
        try {
            const user = localStorage.loggedUser ? localStorage.getItem('loggedUser') : sessionStorage.getItem('loggedUser');
            const users = JSON.parse(localStorage.users);
            const teams = JSON.parse(localStorage.teams);
            for (let userId = 0; userId < users.length; userId++) {
                if (user == users[userId].username) {
                    for (let teamId = 0; teamId < teams.length; teamId++) {
                        if (users[userId].team == teams[teamId].name) {
                            for (let memberId = 0; memberId < teams[teamId].members.length; memberId++) {
                                if (userId == teams[teamId].members[memberId].userId) {
                                    return teams[teamId].leader == memberId;
                                }
                            }
                        }
                    }
                }
            }
            return false;
        } catch (error) {
            return false;
        }
    }
}