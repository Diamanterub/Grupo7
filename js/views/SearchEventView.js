import EventController from '../controllers/EventController.js'

export default class EventView {
    constructor() {
        this.eventController = new EventController();

        this.eventForm = document.getElementById('frmSearchEvent');
        this.eventName = document.getElementById('txtName');
        this.eventCountry = document.getElementById('txtCountry');
        this.eventCity = document.getElementById('txtCity');
        this.event5K = document.getElementById('chk5K');
        this.event10K = document.getElementById('chk10K');
        this.event21K = document.getElementById('chk21K');
        this.event42K = document.getElementById('chk42K');
        this.eventRace = document.getElementById('chkRace');
        this.eventWalk = document.getElementById('chkWalk');
        this.eventSelect = document.getElementById('selectOps');
        this.eventMessage = document.getElementById('EventMessage');
        this.eventArea = document.getElementById('EventArea');

        this.loadShow();
        
        this.bindAddEventForm();
    }

    loadShow() {
        try {
            this.eventController.searchEvent(this.eventName.value, this.eventCountry.value, this.eventCity.value,
                this.eventSelect.value, this.event5K.checked, this.event10K.checked, this.event21K.checked,
                this.event42K.checked, this.eventRace.checked, this.eventWalk.checked, this.eventArea);
        } catch(e) {
            this.displayEventMessage(e, 'danger');
        }
        
    }

    bindAddEventForm() {
        this.eventForm.addEventListener('submit', event => {
            event.preventDefault();
            this.loadShow();
        });
    }

    displayEventMessage(message, type) {
        this.eventMessage.innerHTML =
            `<div class="alert alert-${type}" role="alert">${message}</div>`;
    }
}