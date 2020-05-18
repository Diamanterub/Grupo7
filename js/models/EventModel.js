export default class EventModel {
    constructor() {
        this.events = localStorage.events ? JSON.parse(localStorage.events) : [];
    }

    getAll() {
        return this.events;
    }

    _persist() {
        localStorage.setItem('events', JSON.stringify(this.events));
    }

    create(name, edition, country, city, date, time, capacity, price) {
        const event = {
            id: this.events.length > 0 ? this.events[this.events.length - 1].id + 1 : 1,
            name: name,
            edition: edition,
            country: country,
            city: city,
            date: date,
            time: time,
            capacity: capacity,
            price: price
        }
        this.events.push(event);
        this._persist();
    }
}