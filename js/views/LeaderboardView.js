import EventController from '../controllers/EventController.js'

export default class LeaderboardView {
    constructor() {
        this.eventController = new EventController();

        this.Form      = document.getElementById("frmLB");
        this.lbEvent   = document.getElementById("lbEvent");
        this.lbDist    = document.getElementById("lbDist");
        this.lbSubmit  = document.getElementById("lbSubmit");
        this.tBody  = document.getElementById("tBody");

        this.eventController.importEvents(this.lbEvent, "closed");
        this.lbEvent.addEventListener('change', (event) => {
            this.lbEvent.value != "" ? this.lbDist.disabled = false : {} ;
        });
        this.lbDist.addEventListener('change', (event) => {
            this.lbDist.value != "" ? this.lbSubmit.disabled = false : {} ;
        });
        this.inputEvent();
        this.send();
    }

    inputEvent() {
        this.lbEvent.addEventListener('change', (event) => {
            this.clear();
            if (this.lbEvent.value != "") {
                this.lbDist.disabled = false;
                this.lbDist.selectedIndex = "0";
                this.eventController.importDistances(this.lbDist, this.lbEvent.value);
            }
        });
    }
    
    clear() {
        for ( ; this.lbDist.length > 1; ) {
            this.lbDist.selectedIndex = "1";
            this.lbDist.remove(this.lbDist.selectedIndex);
        }
        this.lbDist.selectedIndex = "0";
        this.lbDist.disabled = true;
        this.lbSubmit.disabled = true;
    }

    send() {
        this.Form.addEventListener('submit', event => {
            event.preventDefault();

            this.eventController.importFromLeaderboard(this.lbEvent.value, this.lbDist.value, this.tBody);

            this.clear();
            this.lbEvent.selectedIndex = "0";
        });
    }
}