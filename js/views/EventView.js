import EventController from '../controllers/EventController.js'

export default class EventView {
    constructor() {
        this.eventController = new EventController();

        this.eventForm = document.getElementById('frmEvent');
        this.eventName = document.getElementById('txtName');
        this.eventEdition = document.getElementById('txtEdition');
        this.eventCountry = document.getElementById('txtCountry');
        this.eventCity = document.getElementById('txtCity');
        this.eventDate = document.getElementById('txtDate');
        this.eventTime = document.getElementById('txtTime');
        this.eventCapacity = document.getElementById('txtCapacity');
        this.eventPrice = document.getElementById('txtPrice');
        this.eventMessage = document.getElementById('EventMessage');

        this.bindAddEventForm();
    }

    bindAddEventForm() {
        this.eventForm.addEventListener('submit', event => {
            event.preventDefault();

            try {
                this.eventController.createEvent(this.eventName.value, this.eventEdition.value, this.eventCountry.value, this.eventCity.value, this.eventDate.value, this.eventTime.value, this.eventCapacity.value, this.eventPrice.value);
                this.displayEventMessage('Evento registado com successo!', 'success');
            } catch(e) {
                this.displayEventMessage(e, 'danger');
            }
        });
    }

    displayEventMessage(message, type) {
        this.eventMessage.innerHTML =
            `<div class="alert alert-${type}" role="alert">${message}</div>`;
    }
}