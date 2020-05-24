import EventModel from "../models/EventModel.js"

export default class EventController {
    constructor() {
        this.eventModel = new EventModel();
    }

    createEvent(name, edition, country, city, date, time, capacity, price, d5K, d10K, d21K, d42K, race, walk, poster, tshirt, map, about) {
        this.eventModel.create(name, edition, country, city, date, time, capacity, price, d5K, d10K, d21K, d42K, race, walk, poster, tshirt, map, about);
    }

    checkEdition(name) {
        return this.eventModel.searchEdition(name);
    }

    searchEvent(name, country, city, selected, d5K, d10K, d21K, d42K, race, walk, area) {
        this.eventModel.search(name, country, city, selected, d5K, d10K, d21K, d42K, race, walk, area);
    }

    findContent(poster, info, buttons, gauge, about, map, id, dists) {
        this.eventModel.displayContent(poster, info, buttons, gauge, about, map, id, dists);
    }
}