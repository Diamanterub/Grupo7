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

    create(name, edition, country, city, date, time, capacity, price, d5K, d10K, d21K, d42K, race, walk, poster, map, about) {
        const dist = JSON.parse(this._dist(d5K, d10K, d21K, d42K))
        let type;
        const runners = [];
        if (race) {
            type = "Race";
        } else if (walk) {
            type = "Walk";
        } else {
            throw Error(`Invalid create! (type)`);
        }
        const event = {
            id: this.events.length,
            name: name, edition: edition, country: country, city: city, date: date,
            time: time, capacity: capacity, price: price, dist: dist, type: type,
            poster: poster, map: map, enrolled: 0, runners: runners,
            about: about, status: "open"
        }
        this.events.push(event);
        this._persist();
    }

    _dist(d5K, d10K, d21K, d42K) {
        let quant = '{', i = 0, e = 0;

        if (d5K)  { quant += '"d5K":{"Leaderboard": []}'; i++;} else { e++; }
        if (d10K) { if (i > 0) {quant += ', ';} quant += '"d10K":{"Leaderboard": []}'; i++;} else { e++; }
        if (d21K) { if (i > 0) {quant += ', ';} quant += '"d21K":{"Leaderboard": []}'; i++;} else { e++; }
        if (d42K) { if (i > 0) {quant += ', ';} quant += '"d42K":{"Leaderboard": []}'; i++;} else { e++; }

        quant += '}';

        if (e == 4) {
            throw Error(`Invalid create! (dist)`);
        }

        return quant;
    }

    searchEdition(name, country, city, time, capacity, price, d5K, d10K, d21K, d42K, race, walk, poster, map, about) {
        var e = 1;
        var id = null;
        try {
            this.events = JSON.parse(localStorage.getItem('events'));
            for (let index = 0; index < this.events.length; index++) {
                if (this.events[index].name == name && this.events[index].edition >= e) {
                    e = parseInt(this.events[index].edition) + 1;
                    id = index;
                }
            }
        } catch (error) {}

        if (id != null) {
            country.value  = this.events[id].country;
            city.value     = this.events[id].city;
            time.value     = this.events[id].time;
            capacity.value = this.events[id].capacity;
            poster.value   = this.events[id].poster;
            map.value      = this.events[id].map;
            about.value    = this.events[id].about;
            price.value    = this.events[id].price;
            JSON.stringify(this.events[id].dist).includes("5K")  ? d5K.checked  = true : [] ;
            JSON.stringify(this.events[id].dist).includes("10K") ? d10K.checked = true : [] ;
            JSON.stringify(this.events[id].dist).includes("21K") ? d21K.checked = true : [] ;
            JSON.stringify(this.events[id].dist).includes("42K") ? d42K.checked = true : [] ;
            this.events[id].type == "race" ? race.checked = true : walk.checked = true;
        } else {
            country.value   = ""; city.value      = ""; time.value      = "";
            capacity.value  = ""; poster.value    = ""; map.value       = "";
            about.value     = ""; price.value     = ""; d5K.checked  = false;
            d10K.checked = false; d21K.checked = false; d42K.checked = false;
            race.checked = false; walk.checked = false;
        }
        
        return e;
    }

    search(name, country, city, selected, d5K, d10K, d21K, d42K, race, walk, area) {
        var send = [];
        for (let index = 0; index < this.events.length; index++) {
            let flag = false;
            if (name !== "") {
                flag = name == this.events[index].name;
            } else { flag = true; }
            if (!flag) { continue; }
            if (country !== "") {
                flag = country == this.events[index].country;
            } else { flag = true; }
            if (!flag) { continue; }
            if (city !== "") {
                flag = city == this.events[index].city;
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
                    flag = this.events[index].type == "Race";
                } else {
                    flag = this.events[index].type == "Walk";
                }
            } else { flag = true; }
            if (!flag) { continue; }
            if (flag) {
                const ph = {
                    id: this.events[index].id,
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
            if (selected == "recent") {
                sortedActivities = array.slice().sort((a, b) => -(new Date(b.date) - new Date(a.date)));                
            } else {
                sortedActivities = array.slice().sort((a, b) => (parseInt(b.enrolled) - parseInt(a.enrolled)));
            }
            area.innerHTML = ``;
            for (let index = 0; index < sortedActivities.length; index++) {
                area.innerHTML += 
                `<a href="event.html?id=${sortedActivities[index].id}"><div class="card"><img src="${sortedActivities[index].url}" class="img-fluid" alt="Poster"></div></a>`
            }
        } catch (error) {}
    }

    displayContent(poster, info, buttons, gauge, about, map, id, dists) {
        try {
            poster.innerHTML = `<img src="${this.events[id].poster}" class="img-fluid" alt="Poster">`
            info.innerHTML =
            `<h1>${this.events[id].name}</h1>
            <h2>(${this._getNth(this.events[id].edition)} Edition)</h2>
            <p>Location: ${this.events[id].city} (${this.events[id].country})</p>
            <p>Date: ${this.events[id].date}</p>
            <p>Time: ${this.events[id].time}</p>
            <p>Type: ${this.events[id].type}</p>
            <p>Distance(s): ${this._getDist(id, dists)}</p>
            <p>Accomodation: ${this.events[id].capacity}</p>
            <p>Price: ${this.events[id].price}€</p>`
            if (this.events[id].status == "open") {                
                buttons.innerHTML = `<input type="button" value="Register" id="btnReg" data-toggle="modal" data-target="#mdlRegister">`
                const loggedUser = localStorage.loggedUser ? localStorage.getItem('loggedUser') : sessionStorage.getItem('loggedUser');
                if (this.events[id].capacity == this.events[id].enrolled || JSON.stringify(this.events[id].runners).includes(loggedUser)) {
                    document.getElementById("btnReg").disabled = true;
                }
            } else if (this.events[id].status == "Closed") {
                buttons.innerHTML = `<input type="button" value="LEADERBOARDS" id="btnLeadB">`
            } else {
                buttons.innerHTML = ``
            }
            about.innerHTML = 
            `<h1>About this event:</h1>
            <p>${this.events[id].about}</p>`
            map.innerHTML = `<img src="${this.events[id].map}" class="img-fluid" alt="Map">`
            gauge.innerHTML =
            `<canvas id="foo"></canvas>
            <label id="preview-textfield" for="foo"></label>`
            this._getGauge(this.events[id].capacity, this.events[id].enrolled)
        } catch (error) {}
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
        if (edition.length == 1) {
            return edition + this._lastDigit(edition);
        } else {
            if (edition[edition.length - 2] == 1) {
                return edition + "nt";
            } else {
                return edition + this._lastDigit(edition[edition.length - 1]);
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
        const user = localStorage.loggedUser ? localStorage.getItem('loggedUser') : sessionStorage.getItem('loggedUser');
        const enroll = {
            id: this.events[id].runners.length,
            data: {
                runner: user, dist: dist, run: run
            }
        }
        this.events[id].runners.push(enroll);
        this.events[id].enrolled++;
        this._persist();
        document.getElementById("frmSubmit").disabled = true;
        document.getElementById("btnReg").disabled = true;
        var perc = Math.round((this.events[id].enrolled / this.events[id].capacity) * 100);
        document.getElementById("preview-textfield").innerHTML = perc + "% - " + this.events[id].enrolled;
    }

    isToday() {
        var now = new Date();
        var year = '' + now.getUTCFullYear();
        var month = '' + (now.getUTCMonth() + 1);
        if (month.length < 2) { month = '0' + month; }
        var day = '' + now.getUTCDate();
        if (day.length < 2) { day = '0' + day; }
        var today = [year, month, day].join('-');
        for (let i = 0; i < this.events.length; i++) {
            if (this.events[i].status == "open" && this.events[i].date == today) {
                this.events[i].status = "ongoing";
            }
        }
        this._persist();
    }

    isOver(id) {
        this.events[id].status = "closed";
        this._setScores(id);
        this._persist();
    }

    _setScores(eventId) {
        if (JSON.stringify(this.events[eventId].dist).includes("5K")) {
            this.events[eventId].dist.d5K .Leaderboard.sort((a, b) => -(this._getSeconds(b.time) - this._getSeconds(a.time)));
            this.events[eventId].dist.d5K .Leaderboard.length > 0 ?
            this._giveMedalAndRank(this.events[eventId].dist.d5K .Leaderboard, JSON.parse(localStorage.users), "5K" , this.events[eventId].type, eventId) : {} ;
        }

        if (JSON.stringify(this.events[eventId].dist).includes("10K")) {
            this.events[eventId].dist.d10K.Leaderboard.sort((a, b) => -(this._getSeconds(b.time) - this._getSeconds(a.time)));
            this.events[eventId].dist.d10K.Leaderboard.length > 0 ?
            this._giveMedalAndRank(this.events[eventId].dist.d10K.Leaderboard, JSON.parse(localStorage.users), "10K", this.events[eventId].type, eventId) : {} ;
        }

        if (JSON.stringify(this.events[eventId].dist).includes("21K")) {
            this.events[eventId].dist.d21K.Leaderboard.sort((a, b) => -(this._getSeconds(b.time) - this._getSeconds(a.time)));
            this.events[eventId].dist.d21K.Leaderboard.length > 0 ?
            this._giveMedalAndRank(this.events[eventId].dist.d21K.Leaderboard, JSON.parse(localStorage.users), "21K", this.events[eventId].type, eventId) : {} ;
        }

        if (JSON.stringify(this.events[eventId].dist).includes("42K")) {
            this.events[eventId].dist.d42K.Leaderboard.sort((a, b) => -(this._getSeconds(b.time) - this._getSeconds(a.time)));
            this.events[eventId].dist.d42K.Leaderboard.length > 0 ?
            this._giveMedalAndRank(this.events[eventId].dist.d42K.Leaderboard, JSON.parse(localStorage.users), "42K", this.events[eventId].type, eventId) : {} ;
        }
    }

    _giveMedalAndRank(arrayLB, users, dist, type, eventId) {
        for (let pos = 0; pos < arrayLB.length; pos++) {
            var userId = this._getUserId(arrayLB[pos].runner);
            var medal = this._calculateMedal(arrayLB.length, pos+1);
            var data = { event: this.events[eventId].name, edition: this.events[eventId].edition, dist: dist, type: type, pos: pos + 1, time: arrayLB[pos].time }
            users[userId].stats = this._updateUserStats(data, users[userId].stats);
            switch (medal) {
                case "Swift":    users[userId].medals.swift  .push(data); break;
                case "Master":   users[userId].medals.master .push(data); break;
                case "Diamond":  users[userId].medals.diamond.push(data); break;
                case "Platinum": users[userId].medals.plat   .push(data); break;
                case "Gold":     users[userId].medals.gold   .push(data); break;
                case "Silver":   users[userId].medals.silver .push(data); break;
                case "Bronze":   users[userId].medals.bronze .push(data); break;
                case "Copper":   users[userId].medals.copper .push(data); break;
            }
            users[userId].rank = this._RankFormula(users[userId].rank, medal);
        }
        localStorage.setItem('users', JSON.stringify(users));
    }

    _updateUserStats(data, user) {
        var stats = [];
        data.type == "Race" ? stats = user.race : stats = user.walk;
        switch (data.dist) {
            case "5K":  stats = stats.d5k;  break; case "10K": stats = stats.d10k; break;
            case "21K": stats = stats.d21k; break; case "42K": stats = stats.d42k; break;
        }

        stats.sumDist += parseInt(data.dist.replace('K', ''));
        stats.sumTime += this._getSeconds(data.time);
        stats.pace = Math.round(((stats.sumDist * 1000) / stats.sumTime) * 3.6 * 100) / 100;
        stats.bestTime = this._getSeconds(data.time) < this._getSeconds(stats.bestTime) ? data.time : stats.bestTime;
        stats.bestPos = stats.bestPos == "X" ? data.pos : data.pos < stats.bestPos ? data.pos : stats.bestPos;

        if (data.type == "Race") {
            switch (data.dist) {
                case "5K":  user.race.d5k  = stats; break; case "10K": user.race.d10k = stats; break;
                case "21K": user.race.d21k = stats; break; case "42K": user.race.d42k = stats; break;
            }
        } else {
            switch (data.dist) {
                case "5K":  user.walk.d5k  = stats; break; case "10K": user.walk.d10k = stats; break;
                case "21K": user.walk.d21k = stats; break; case "42K": user.walk.d42k = stats; break;
            }
        }
        return user;
    }

    _calculateMedal(runners, pos) {
        const Diam = Math.round((runners - 3) * 0.01);
        const Plat = Math.round((runners - 3) * 0.03) + Diam;
        const Gold = Math.round((runners - 3) * 0.16) + Plat;
        const Silv = Math.round((runners - 3) * 0.20) + Gold;
        const Bron = Math.round((runners - 3) * 0.25) + Silv;
        const Copp = Math.round((runners - 3) * 0.35) + Bron;

        if (pos == 1) { return "Swift" }
        else if (pos == 2 || pos == 3) { return "Master" }
        else if (pos - 3 < Diam) { return "Diamond" }
        else if (pos - 3 < Plat) { return "Platinum" }
        else if (pos - 3 < Gold) { return "Gold" }
        else if (pos - 3 < Silv) { return "Silver" }
        else if (pos - 3 < Bron) { return "Bronze" }
        else if (pos - 3 < Copp) { return "Copper" }
    }

    _RankFormula(rank, medal) {
        // Fórmula de Cálculo de Atribuição de Pontos Relativa ao Rank, Posição (Medalha),
        // Multiplicador (Ranked Sliders) e Penalização (Posição baixa relativa ao Rank).
        //
        // A fórmula foi feita por nós. Não se compara com o sistema de Elo Ranking, na qual
        // a mesma compara o Rank entre os utilizadores participantes. Aqui apenas tem-se em
        // conta a relação do Rank - Posição - Multiplicador - Penalização.
        //
        // xx  Primeira Versão (descartada): 
        // xx
        // xx  rank = rank + (rsm * ((((2000 - (500 * (3 - mm)))/1000)*pg*(mm^2)) - (pg*(1-mm)) - ((rank/90)*(2 - mm))));
        // xx
        // xx  A primeira versão apresentava várias falhas, como por exemplo apenas ser possível descer de rank
        // xx  caso o mesmo fosse acima de 3900. Desta forma decidimos investir mais tempo na sua complexidade
        // xx  e fizemos uma versão melhorada que estabilizava melhor a distribuição dos utilizadores. Dependendo
        // xx  do número de utilizadores e participantes por prova, sendo um utilizador ativo é expectável que a
        // xx  maioria se situe entre Bronze e Ouro.
        //
        // Segunda Versão (aprovada - final): 
        //
        // rank = rank + ((rsm*(((3-mm)*pg)*(mm*mm))) - (lmhrp*((((240/pg)*(pg*(1-mm)))*(3-mm))*(170/(pg+50)))) - ((rank/90)*(2-mm)));
        //
        // Tal como já foi escrito antes, esta versão permite uma melhor distribuição dos utilizadores, como também:
        // - O Multiplicador passa a fazer mais sentido e permite facilitar ou dificultar a evolução do jogador *;
        // - Nova variável dependente "lmhrp" (Low Medal High Rank Punishment), que aumenta a perda de pontos **;
        //
        // * exemplo: se (rsm*200) - 100 - 50, logo pontos ganhos serão -150 (rsm = 0); +50 (rsm = 1); +250 (rsm = 2).
        // ** ocorre apenas se rank(medal): Platinum(Copper), Diamond (Copper), Master (Copper e Bronze) e Swift (Copper a Silver). 
        //
        // A fórmula foi dividida em vários partes de modo a que o processo seja corretamente feito e que os números decimais
        // não sejam arredondados nas partes mais importantes do cálculo (usando a propriedade .toFixed - esta é usada em
        // praticamente todas as variáveis, pois caso sejam alterados os valores de mm e pg no código, não ocorrerá problemas futuros.

        var rsm = this._getRankSliderMultiplier(rank); // Obtém-se o Multiplicador relativo ao seu Rank
        var mm = this._getMedalMultiplier(medal); // Variável dependente relativa a medalha obtida
        var pg = this._getPointsGivenByRankTier(rank); // Variável dependente relativa ao rank atual (com o qual participou no evento)
        var lmhrp = this._getLowMedalHighRankPunishment(mm, pg); // Variável dependente da relação entre rank e medalha (1 é o valor neutro)

        // Significado das variáveis abaixo, exemplo: c1f1 = cálculo 1 fase 1 ; pf = primeira fase
        // Primeira Fase: (rsm*(((3-mm)*pg)*(mm*mm)))

        var c1f1 = 3-mm; 
        var c1f1 = c1f1.toFixed(3);
        var c2f1 = c1f1*pg;
        var c2f1 = c2f1.toFixed(3);
        var c3f1 = mm*mm;
        var c3f1 = c3f1.toFixed(3);
        var c4f1 = c2f1*c3f1;
        var c4f1 = c4f1.toFixed(3);
        var pf = rsm*c4f1;
        var pf = pf.toFixed(3);

        // Segunda Fase: (lmhrp*((((240/pg)*(pg*(1-mm)))*(3-mm))*(170/(pg+50))))
        
        var c1f2 = 240/pg;
        var c1f2 = c1f2.toFixed(3);
        var c2f2 = 1-mm;
        var c2f2 = c2f2.toFixed(3);
        var c3f2 = pg*c2f2;
        var c3f2 = c3f2.toFixed(3);
        var c4f2 = c1f2*c3f2;
        var c4f2 = c4f2.toFixed(3);
        var c5f2 = 3-mm;
        var c5f2 = c5f2.toFixed(3);
        var c6f2 = c4f2*c5f2;
        var c6f2 = c6f2.toFixed(3);
        var c7f2 = pg+50;
        var c7f2 = c7f2.toFixed(3);
        var c8f2 = 170/c7f2;
        var c8f2 = c8f2.toFixed(3);
        var c9f2 = c6f2*c8f2;
        var c9f2 = c9f2.toFixed(3);
        var sf = lmhrp*c9f2;
        var sf = sf.toFixed(3);
        
        // Terceira Fase: ((rank/90)*(2-mm))
        
        var c1f3 = rank/90;
        var c1f3 = c1f3.toFixed(3);
        var c2f3 = 2-mm;
        var c2f3 = c2f3.toFixed(3);
        var tf = c1f3*c2f3;
        var tf = tf.toFixed(3)

        // Fase Final - agrupa todas as fases (simplificando a fórmula)
        
        var points = pf-sf-tf;
        var points = points.toFixed(0);
        var pta = parseInt(points); // pta (Points to Award)
        rank = rank + pta; // Atribuição do pontos e mudança do rank

        // Condições barreira que não permitem descer o rank abaixo de 0 ou subir acima de 5000

        rank < 0 ? rank = 0 : {} ;
        rank > 5000 ? rank = 5000 : {} ;
        return Math.round(rank);
    }

    _calculateRank(rank) {
        if (rank < 1000) { return "Copper" }
        else if (rank < 1500) { return "Bronze" }
        else if (rank < 2000) { return "Silver" }
        else if (rank < 2500) { return "Gold" }
        else if (rank < 3000) { return "Platinum" }
        else if (rank < 3500) { return "Diamond" }
        else if (rank < 4000) { return "Master" }
        else { return "Swift" }
    }

    _getRankSliderMultiplier(rank) {
        const slider = this.getRankedSliders();
        switch (this._calculateRank(rank)) {
            case "Copper"  :  return slider.copper;
            case "Bronze"  :  return slider.bronze;
            case "Silver"  :  return slider.silver;
            case "Gold"    :  return slider.gold;
            case "Platinum":  return slider.platinum;
            case "Diamond" :  return slider.diamond;
            case "Master"  :  return slider.master;
            case "Swift"   :  return slider.swift;
        }
    }

    _getPointsGivenByRankTier(rank) {
        switch (this._calculateRank(rank)) {
            case "Copper"  : return 120;
            case "Bronze"  : return 110;
            case "Silver"  : return 100;
            case "Gold"    : return 90;
            case "Platinum": return 80;
            case "Diamond" : return 60;
            case "Master"  : return 40;
            case "Swift"   : return 20;
        }
    }

    _getMedalMultiplier(medal) {
        switch (medal) {
            case "Copper"  : return 0.8;
            case "Bronze"  : return 0.86;
            case "Silver"  : return 0.93;
            case "Gold"    : return 1;
            case "Platinum": return 1.2;
            case "Diamond" : return 1.4;
            case "Master"  : return 1.6;
            case "Swift"   : return 2;
        }
    }

    _getLowMedalHighRankPunishment(mm, pg){
        if (pg == 80 && mm == 0.8) { return 1.5; }
        else if (pg == 60 && mm == 0.8){ return 1.75; }
        else if (pg == 40 && mm == 0.8){ return 2.5; }
        else if (pg == 40 && mm == 0.86){ return 2; }
        else if (pg == 20 && mm == 0.8){ return 3.25; }
        else if (pg == 20 && mm == 0.86){ return 2.75; }
        else if (pg == 20 && mm == 0.93){ return 2.25; }
        else { return 1; }
    }

    updateRankedSliders(copper, bronze, silver, gold, plat, diamond, master, swift) {
        const rankedSlider = {
                copper: copper, bronze: bronze, silver: silver, gold: gold,
                platinum: plat, diamond: diamond, master: master, swift: swift 
            }
        localStorage.setItem('rankedSliders', JSON.stringify(rankedSlider))
    }

    getRankedSliders() {
        if (!localStorage.rankedSliders) {
            const rankedSlider = {
                copper: 1, bronze: 1, silver: 1, gold: 1,
                platinum: 1, diamond: 1, master: 1, swift: 1 
            }
            localStorage.setItem('rankedSliders', JSON.stringify(rankedSlider))
        }
        return JSON.parse(localStorage.rankedSliders);
    }

    getEvents(opsEvent, status) {
        for (let i = 0; i < this.events.length; i++) {
            if (this.events[i].status == status) {
                var option   = document.createElement("option");
                option.text  = this.events[i].name + ", " + this.events[i].edition;
                option.value = this.events[i].id;
                opsEvent.add(option);
            }
        }
    }

    getRunners(opsRunner, eventId) {
        for (let i = 0; i < this.events[eventId].runners.length; i++) {
            if (!JSON.stringify(this.events[eventId].dist).includes(this.events[eventId].runners[i].data.runner)) {
                var option   = document.createElement("option");
                option.text  = this.events[eventId].runners[i].data.runner;
                option.value = this.events[eventId].runners[i].id;
                opsRunner.add(option);
            }
        }
    }

    getDistances(lbDist, eventId) {
        if (JSON.stringify(this.events[eventId].dist).includes("5K")) {
            var option   = document.createElement("option");
            option.text  = "5K";  option.value = "5K";  lbDist.add(option);
        }
        if (JSON.stringify(this.events[eventId].dist).includes("10K")) {
            var option   = document.createElement("option");
            option.text  = "10K"; option.value = "10K"; lbDist.add(option);
        }
        if (JSON.stringify(this.events[eventId].dist).includes("21K")) {
            var option   = document.createElement("option");
            option.text  = "21K"; option.value = "21K"; lbDist.add(option);
        }
        if (JSON.stringify(this.events[eventId].dist).includes("42K")) {
            var option   = document.createElement("option");
            option.text  = "42K"; option.value = "42K"; lbDist.add(option);
        }
    }

    addToLeaderboard(eventId, runnerId, time) {
        const data = { runner: this.events[eventId].runners[runnerId].data.runner, time:time }
        switch (this.events[eventId].runners[runnerId].data.dist) {
            case "5K" : this.events[eventId].dist.d5K.Leaderboard.push(data);  break;
            case "10K": this.events[eventId].dist.d10K.Leaderboard.push(data); break;
            case "21K": this.events[eventId].dist.d21K.Leaderboard.push(data); break;
            case "42K": this.events[eventId].dist.d42K.Leaderboard.push(data); break;
        }
        this._persist();
    }

    getFromLeaderboard(eventId, dists, tBody) {
        var arrayLB = [], km;
        switch (dists) {
            case "5K":  arrayLB = this.events[eventId].dist.d5K .Leaderboard.slice(); km = 5000;  break;
            case "10K": arrayLB = this.events[eventId].dist.d10K.Leaderboard.slice(); km = 10000; break;
            case "21K": arrayLB = this.events[eventId].dist.d21K.Leaderboard.slice(); km = 21000; break;
            case "42K": arrayLB = this.events[eventId].dist.d42K.Leaderboard.slice(); km = 42000; break;
        }
        for (let i = 0; i < arrayLB.length; i++) {
            tBody.innerHTML +=
            `<tr>
                <th scope="row">${i+1}</th>
                <td>${arrayLB[i].time}</td>
                <td>${Math.round((km / this._getSeconds(arrayLB[i].time)) * 3.6 * 100) / 100 + " km/h"}</td>
                <td>${arrayLB[i].runner}</td>
                <td>${this._getRunnerData(arrayLB[i].runner, "team")}</td>
                <td>${this._getRunnerData(arrayLB[i].runner, "rank")}</td>
            </tr>`
        }
    }

    _getSeconds(time) {
        const h  = parseInt(time[0] + time[1]);
        const m  = parseInt(time[3] + time[4]);
        const s  = parseInt(time[6] + time[7]);
        const ms = parseInt(time[9] + time[10] + time[11]);

        return (h * 60 * 60 + m * 60 + s + ms / 100) 
    }

    _getRunnerData(runner, option) {
        const users = JSON.parse(localStorage.users);
        var data = [];
        data = users[this._getUserId(runner)];
        switch (option) {
            case "team": return data.team;
            
            case "rank": return data.rank;
        }
    }

    _getUserId(runner) {
        const users = JSON.parse(localStorage.users);
        for (let i = 0; i < users.length; i++) {
            if (runner == users[i].username) {
                return i;
            }
        }
    }
}