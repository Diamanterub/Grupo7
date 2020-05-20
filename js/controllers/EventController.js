import EventModel from "../models/EventModel.js"

export default class EventController {
    constructor() {
        this.eventModel = new EventModel();
    }

    createEvent(name, edition, country, city, date, time, capacity, price, d5K, d10K, d21K, d42K, race, walk, poster, tshirt, map) {
        this.eventModel.create(name, edition, country, city, date, time, capacity, price, d5K, d10K, d21K, d42K, race, walk, poster, tshirt, map);
    }

    checkEdition(name) {
        return this.eventModel.searchEdition(name);
    }
}