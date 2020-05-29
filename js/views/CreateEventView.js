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
        this.event5K = document.getElementById('txt5K');
        this.event10K = document.getElementById('txt10K');
        this.event21K = document.getElementById('txt21K');
        this.event42K = document.getElementById('txt42K');
        this.eventRace = document.getElementById('txtRace');
        this.eventWalk = document.getElementById('txtWalk');
        this.eventPoster = document.getElementById('txtPoster');
        this.eventMap = document.getElementById('txtMap');
        this.imagePoster = document.getElementById('imgPoster');
        this.imageMap = document.getElementById('imgMap');
        this.eventAbout = document.getElementById('txtAbout');
        this.eventMessage = document.getElementById('EventMessage');

        this.eventDate.setAttribute("min", this.caldDataMin());

        this.eventName.addEventListener('input', (event) => {
            this.eventEdition.value = this.eventController.checkEdition(this.eventName.value, this.eventCountry,
                this.eventCity, this.eventTime, this.eventCapacity, this.eventPrice, this.event5K,
                this.event10K, this.event21K, this.event42K, this.eventRace, this.eventWalk,
                this.eventPoster, this.eventMap, this.eventAbout);});

        this.eventPoster.addEventListener('input', (event) => { this.imagePoster.src = this.eventPoster.value});
        this.eventMap.addEventListener('input', (event) => { this.imageMap.src = this.eventMap.value});
        
        this.bindAddEventForm();
    }

    bindAddEventForm() {
        this.eventForm.addEventListener('submit', event => {
            event.preventDefault();

            try {
                if (!this.event5K.checked && !this.event10K.checked && !this.event21K.checked && !this.event42K.checked) {
                    throw Error(`Selecione pelo menos uma distância`);
                }
                if (!this.eventRace.checked && !this.eventWalk.checked) {
                    throw Error(`Selecione um tipo`);
                }
                this.eventController.createEvent(
                    this.eventName.value, this.eventEdition.value, this.eventCountry.value, this.eventCity.value,
                    this.eventDate.value, this.eventTime.value, this.eventCapacity.value, this.eventPrice.value,
                    this.event5K.checked, this.event10K.checked, this.event21K.checked, this.event42K.checked,
                    this.eventRace.checked, this.eventWalk.checked, this.eventPoster.value, this.eventMap.value,
                    this.eventAbout.value);
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

    caldDataMin() {
        var now = new Date();
        var datamin = new Date(now.getUTCFullYear(), now.getUTCMonth() + 1, now.getUTCDate() + 7);
        var month = '' + datamin.getUTCMonth();
        if (month.length < 2) {
            month = '0' + month;
        }
        var day = '' + datamin.getUTCDate();
        if (day.length < 2) {
            day = '0' + day;
        }
        return [datamin.getUTCFullYear(), month, day].join('-');
    }
}