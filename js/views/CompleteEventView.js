import EventController from '../controllers/EventController.js'

export default class CompleteEventView {
    constructor() {
        this.eventController = new EventController();

        this.Form      = document.getElementById("frmComplete");
        this.opsEvent  = document.getElementById("opsEvents");
        this.opsRunner = document.getElementById("opsRunners");
        this.runTime   = document.getElementById("runTime");
        this.Message   = document.getElementById('frmMessage');
        this.Submit    = document.getElementById('btnSubmit');
        this.Close     = document.getElementById('btnClose');

        this.eventController.importEvents(this.opsEvent, "ongoing");
        this.opsRunner.addEventListener('change', (event) => {
            this.opsRunner.value != "" ? this.runTime.disabled = false : {} ;
        });
        this.runTime.addEventListener('input', (event) => {
            this.runTime.value != "" ? this.Submit.disabled = false : {} ;
        });
        this.inputEvent();
        this.send();
        this.Close.addEventListener('click', (event) => this.close());
    }

    inputEvent() {
        this.opsEvent.addEventListener('change', (event) => {
            this.clear();
            if (this.opsEvent.value != "") {
                this.opsRunner.disabled = false;
                this.opsRunner.selectedIndex = "0";
                this.eventController.importRunners(this.opsRunner, this.opsEvent.value);
                this.Close.disabled = false;
            }
        });
    }

    clear() {
        for ( ; this.opsRunner.length > 1; ) {
            this.opsRunner.selectedIndex = "1";
            this.opsRunner.remove(this.opsRunner.selectedIndex);
        }
        this.opsRunner.selectedIndex = "0";
        this.opsRunner.disabled = true;
        this.runTime.value = "";
        this.runTime.disabled = true;
        this.Close.disabled = true;
        this.Submit.disabled = true;
    }

    send() {
        this.Form.addEventListener('submit', event => {
            event.preventDefault();

            this.eventController.exportToLeaderBoard(this.opsEvent.value, this.opsRunner.value, this.runTime.value)
            this.displayEventMessage('Success', 'success');

            this.clear();
            this.opsEvent.selectedIndex = "0";
        });
    }

    close() {
        this.eventController.closeEvent(this.opsEvent.value);
        this.opsEvent.remove(this.opsEvent.selectedIndex);
        this.opsEvent.selectedIndex = "0";
        this.clear();
    }

    displayEventMessage(message, type) {
        this.Message.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
    }
}