import EventModel from "../models/EventModel.js"

export default class EventController {
    constructor() {
        this.eventModel = new EventModel();
    }

    createEvent(name, edition, country, city, date, time, capacity, price) {
        if (!this.eventModel.getAll().some(event => event.name === name && event.edition <= edition)) {
            this.eventModel.create(name, edition, country, city, date, time, capacity, price);
        } else {
            throw Error(`A "${edition}"ª edição do evento "${name}" já existe!`);
        }
    }
}