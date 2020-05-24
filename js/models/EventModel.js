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

    create(name, edition, country, city, date, time, capacity, price, d5K, d10K, d21K, d42K, race, walk, poster, tshirt, map, about) {
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
            poster: poster, tshirt: tshirt, map: map, enrolled: 0, runners: runners,
            about: about, status: "open"
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
        try {
            var sortedActivities = [];
            if (selected === 0) {
                sortedActivities = array.slice().sort((a, b) => -(new Date(b.date) - new Date(a.date)));                
            } else {
                sortedActivities = array.slice().sort((a, b) => -(parseInt(b.enrolled) - parseInt(a.enrolled)));
            }
            area.innerHTML = ``;
            for (let index = 0; index < sortedActivities.length; index++) {
                area.innerHTML += 
                `<a href="event.html?id=${sortedActivities[index].id - 1}"><img src="${sortedActivities[index].url}" class="img-fluid" alt="Poster" width="25%"></a>`
            }
        } catch (error) {}
    }

    displayContent(poster, info, buttons, gauge, about, map, id, dists) {
        //try {
            poster.innerHTML = `<img src="${this.events[id].poster}" class="img-fluid" alt="Poster">`
            info.innerHTML =
            `<h1>${this.events[id].name}</h1><br>
            <p>(${this.events[id].edition}${this._getNth(this.events[id].edition)} Edition)</p><br>
            <p>Location: ${this.events[id].country}, ${this.events[id].city}</p><br>
            <p>Date: ${this.events[id].date}</p><br>
            <p>Time: ${this.events[id].time}</p><br>
            <p>Type: ${this.events[id].type}</p><br>
            <p>Distance(s): ${this._getDist(id, dists)}</p><br>
            <p>Capacity: ${this.events[id].capacity} participants</p><br>
            <p>Price: ${this.events[id].price}€</p>`
            if (this.events[id].status === "open") {                
                buttons.innerHTML = `<input type="button" value="REGISTER" id="btnReg" data-toggle="modal"
                data-target="#mdlRegister">`
            } else {
                buttons.innerHTML = `<input type="button" value="LEADERBOARDS" id="btnLeadB">`
            }
            about.innerHTML = 
            `<h1>About this event:</h1><br>
            <p>${this.events[id].about}</p>`
            map.innerHTML = `<img src="${this.events[id].map}" class="img-fluid" alt="Map">`
            gauge.innerHTML =
            `<canvas id="foo"></canvas>
            <label id="preview-textfield" for="foo"></label>`
            this._getGauge(this.events[id].capacity, this.events[id].enrolled)
        //} catch (error) {}
    }

    _getDist(id, dists) {
        var vals = "";
        if (JSON.stringify(this.events[id].dist).includes("5K")) {
            vals += "5K";
            dists.innerHTML +=
            `<label class="form-check-label">
            <input class="form-check-input" name="dist" type="radio" id="frm5K"> 5K
            </label><br>`
        }
        if (JSON.stringify(this.events[id].dist).includes("10K")) {
            vals !== "" ? vals += " | " : {} ;
            vals += "10K";
            dists.innerHTML +=
            `<label class="form-check-label">
            <input class="form-check-input" name="dist" type="radio" id="frm10K"> 10K
            </label><br>`
        }
        if (JSON.stringify(this.events[id].dist).includes("21K")) {
            vals !== "" ? vals += " | " : {} ;
            vals += "21K";
            dists.innerHTML +=
            `<label class="form-check-label">
            <input class="form-check-input" name="dist" type="radio" id="frm21K"> 21K
            </label><br>`
        }
        if (JSON.stringify(this.events[id].dist).includes("42K")) {
            vals !== "" ? vals += " | " : {} ;
            vals += "42K";
            dists.innerHTML +=
            `<label class="form-check-label">
            <input class="form-check-input" name="dist" type="radio" id="frm42K"> 42K
            </label><br>`
        }
        return vals;
    }

    _getNth(edition) {
        if (edition.length === 1) {
            return this._lastDigit(edition);
        } else {
            if (edition[edition.length - 2] === 1) {
                return "nt";
            } else {
                return this._lastDigit(edition[edition.length - 1]);
            }
        }
    }

    _lastDigit(num) {
        switch (num) {
            case "1": return "st"; break;
            case "2": return "nd"; break;
            case "3": return "rd"; break;
            default: return "th"; break;
        }
    }

    _getGauge(max, num) {
        var opts = {
            angle: 0.48,
            lineWidth: 0.1,
            radiusScale: 1,
            pointer: {
              length: 0.6,
              strokeWidth: 0.035,
              color: '#000000'
            },
            limitMax: false,
            limitMin: false,
            colorStart: '#FFFFFF',
            colorStop: '#C7F942',
            strokeColor: '#1A1A1A',
            generateGradient: true,
            highDpiSupport: true,
          };
        var target = document.getElementById('foo');
        var gauge = new Donut(target).setOptions(opts);
        gauge.maxValue = max;
        gauge.setMinValue(0);
        gauge.animationSpeed = 23;
        gauge.set(num);

        var perc = Math.round((num / max) * 100);
        document.getElementById("preview-textfield").innerHTML = perc + "% - " + num;
    }

    addRunner(dist, run, id) {
        alert(JSON.stringify(this.events[id].dist))
        // if (!JSON.stringify(this.events[id].runners).includes(localStorage.getItem('loggedUser'))) {
            
        // }
    }
}