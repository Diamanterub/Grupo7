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

    create(name, edition, country, city, date, time, capacity, price, d5K, d10K, d21K, d42K, race, walk) {
        alert(d5K + " " + d10K + " " + d21K + " " + d42K);
        const dist = JSON.parse(this._dist(d5K, d10K, d21K, d42K))
        let type;
        if (race) {
            type = "race";
        } else if (walk) {
            type = "walk";
        } else {
            throw Error(`Invalid create! (type)`);
        }
        const event = {
            id: this.events.length > 0 ? this.events[this.events.length - 1].id + 1 : 1,
            name: name, edition: edition, country: country, city: city, date: date,
            time: time, capacity: capacity, price: price, dist: dist, type: type
        }
        this.events.push(event);
        this._persist();
    }

    _dist(d5K, d10K, d21K, d42K) {
        let quant = '{', i = 0, e = 0;

        if (d5K) { 
            quant += '"'+i+'": "5K"'; 
            i++; 
        } else { e++; }
        if (d10K) {
            if (i > 0) {quant += ', ';}
            quant += '"'+i+'": "10K"'; 
            i++;  
        } else { e++; }
        if (d21K) {
            if (i > 0) {quant += ', ';}
            quant += '"'+i+'": "21K"'; 
            i++;  
        } else { e++; }
        if (d42K) { 
            if (i > 0) {quant += ', ';}
            quant += '"'+i+'": "42K"'; 
            i++;  
        } else { e++; }

        quant += '}';

        if (e == 4) {
            throw Error(`Invalid create! (dist)`);
        }

        return quant;
    }

    searchEdition(name) {
        let events = [];
        let e = 1;
        try {
            events = JSON.parse(localStorage.getItem('events'));
            for (let index = 0; index < events.length; index++) {
                if (events[index].name === name && events[index].edition > e) {
                    e = parseInt(events[index].edition) + 1;
                }
            }
        } catch (error) {}
        
        return e;
    }
}