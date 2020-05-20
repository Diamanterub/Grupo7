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

    create(name, edition, country, city, date, time, capacity, price, d5K, d10K, d21K, d42K, race, walk, poster, tshirt, map) {
        const dist = JSON.parse(this._dist(d5K, d10K, d21K, d42K))
        let type;
        const runners = [];
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
            time: time, capacity: capacity, price: price, dist: dist, type: type,
            poster: poster, tshirt: tshirt, map: map, enrolled: 0, runners: runners
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
        let e = 1;
        try {
            this.events = JSON.parse(localStorage.getItem('events'));
            for (let index = 0; index < this.events.length; index++) {
                if (this.events[index].name === name && this.events[index].edition >= e) {
                    e = parseInt(this.events[index].edition) + 1;
                }
            }
        } catch (error) {}
        
        return e;
    }

    search(name, country, city, selected, d5K, d10K, d21K, d42K, race, walk, area) {
        var send = [];
        for (let index = 0; index < this.events.length; index++) {
            let flag = false;
            if (name !== "") {
                flag = name === this.events[index].name;
            } else { flag = true; }
            if (!flag) { continue; }
            if (country !== "") {
                flag = country === this.events[index].country;
            } else { flag = true; }
            if (!flag) { continue; }
            if (city !== "") {
                flag = city === this.events[index].city;
            } else { flag = true; }
            if (!flag) { continue; }
            if (!((!d5K && !d10K && !d21K && !d42K) || (d5K && d10K && d21K && d42K))) {
                for (let c = 0; c <= 1; c++) {
                    if (d5K) {
                        flag = JSON.stringify(this.events[index].dist).includes("5K");
                        if (flag) { break; }
                    }
                    if (d10K) {
                        flag = JSON.stringify(this.events[index].dist).includes("10K");
                        if (flag) { break; }
                    }
                    if (d21K) {
                        flag = JSON.stringify(this.events[index].dist).includes("21K");
                        if (flag) { break; }
                    }
                    if (d42K) {
                        flag = JSON.stringify(this.events[index].dist).includes("42K");
                        if (flag) { break; }
                    }
                }
            } else { flag = true; }
            if (!flag) { continue; }
            if (!((!race && !walk) || (race && walk))) {
                if (race) {
                    flag = this.events[index].type === "race";
                } else {
                    flag = this.events[index].type === "walk";
                }
            } else { flag = true; }
            if (!flag) { continue; }
            if (flag) {
                const ph = {
                    id: send.length > 0 ? send[send.length - 1].id + 1 : 1,
                    url: this.events[index].poster,
                    date: this.events[index].date,
                    enrolled: this.events[index].enrolled
                }
                send.push(ph);
            }
        }
        this.show(area, send, selected);
    }

    show(area, array, selected) {
        //try {
            var sortedActivities = [];
            if (selected === 0) {
                sortedActivities = array.slice().sort((a, b) => -(new Date(b.date) - new Date(a.date)));                
            } else {
                sortedActivities = array.slice().sort((a, b) => -(parseInt(b.enrolled) - parseInt(a.enrolled)));
            }
            area.innerHTML = ``;
            for (let index = 0; index < sortedActivities.length; index++) {
                let url = sortedActivities[index].url;
                area.innerHTML += 
                `<div><a href="#"><img src="${url}" class="img-fluid" alt="Poster" id="${index}"></a></div>`
            }
        //} catch (error) {}
    }
}