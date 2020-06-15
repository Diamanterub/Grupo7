export default class UserModel {
    constructor() {
        this.users = localStorage.users ? JSON.parse(localStorage.users) : [];
    }

    getAll() {
        return this.users;
    }

    _persist() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    create(username, password, email) {
        const admin = username == "adminP" || username == "adminY" || username == "adminR" ? true : false;
        const user = {
            id: this.users.length, username: username, password: password,
            email: email, admin: admin, pfp: "", team: "", rank: 500,
            medals: { copper: [], bronze: [], silver: [], gold: [], plat: [], diamond: [], master: [], swift: [] },
            stats: { 
                race: { 
                    d5k  : {sumDist: 0, sumTime: 0, pace: 0, bestTime: "N/A", bestPos: "N/A"},
                    d10k : {sumDist: 0, sumTime: 0, pace: 0, bestTime: "N/A", bestPos: "N/A"},
                    d21k : {sumDist: 0, sumTime: 0, pace: 0, bestTime: "N/A", bestPos: "N/A"},
                    d42k : {sumDist: 0, sumTime: 0, pace: 0, bestTime: "N/A", bestPos: "N/A"}
                },
                walk: { 
                    d5k  : {sumDist: 0, sumTime: 0, pace: 0, bestTime: "N/A", bestPos: "N/A"},
                    d10k : {sumDist: 0, sumTime: 0, pace: 0, bestTime: "N/A", bestPos: "N/A"},
                    d21k : {sumDist: 0, sumTime: 0, pace: 0, bestTime: "N/A", bestPos: "N/A"},
                    d42k : {sumDist: 0, sumTime: 0, pace: 0, bestTime: "N/A", bestPos: "N/A"}
                }
            }
        }
        this.users.push(user);
        this._persist();
    }

    login(username, staysigned) {
        this.logout();
        if (staysigned) {
            localStorage.setItem('loggedUser', username);
            const ttl = Date.now() + (72 * 60 * 60 * 1000);
            localStorage.setItem('timeToLive', ttl);
        } else {
            sessionStorage.setItem('loggedUser', username);
        }
        return this.isAdmin(username);
    }

    logout() {
        try {
            localStorage.removeItem('loggedUser');
            localStorage.removeItem('timeToLive');
        } catch (error) { }
        try {
            sessionStorage.removeItem('loggedUser');
        } catch (error) { }
    }

    isSigned() {
        try {
            if (localStorage.getItem('loggedUser') !== null && parseInt(localStorage.getItem('timeToLive')) > Date.now()) {
                const ttl = Date.now() + (72 * 60 * 60 * 1000);
                localStorage.setItem('timeToLive', ttl);
                return this.isAdmin(localStorage.getItem('loggedUser'));
            } else if (sessionStorage.getItem('loggedUser') !== null) {
                return true;
            } else {
                return false;
            }         
        } catch (error) {
            return false;
        }
    }

    isAdmin(username) {
        if (window.location.pathname.includes("admin") || window.location.pathname == "/html/sign-in.html") {
            try {
                return this.getAll().some(user => { return user.username === username && user.admin});
            } catch (error) {
                return false;
            }
        } else {
            return true;
        }
    }

    applyEdit(option, info, id) {
        switch (option) {
            case "username":
                this._editEvents(info, this.users[id].username);
                this._editTeams(info, this.users[id].username)
                localStorage.loggedUser ? localStorage.setItem('loggedUser', info) : {} ;
                this.users[id].username = info;
                break;

            case "email":
                this.users[id].email = info;
                break;

            case "password":
                this.users[id].password = info;
                break;

            case "pfp":
                this.users[id].pfp = info;
                break;
        }
        this._persist();
    }

    _editEvents(newUser, currUser) {
        const events = localStorage.events ? JSON.parse(localStorage.events) : [];
        for (let eventId = 0; eventId < events.length; eventId++) {
            for (let runnerId = 0; runnerId < events[eventId].length; runnerId++) {
                if (events[eventId].runners[runnerId].data.runner == currUser) {
                    events[eventId].runners[runnerId].data.runner = newUser;
                    switch (events.runners[runnerId].data.dist) {
                        case "5K":
                            for (let pos = 0; pos < events[eventId].dist.d5k.Leaderboard.length; pos++) {
                                if (events[eventId].dist.d5k.Leaderboard[pos].runner == currUser) {
                                    events[eventId].dist.d5k.Leaderboard[pos].runner = newUser;
                                    break;
                                }
                            }
                        break;
                        case "10K":
                            for (let pos = 0; pos < events[eventId].dist.d10k.Leaderboard.length; pos++) {
                                if (events[eventId].dist.d10k.Leaderboard[pos].runner == currUser) {
                                    events[eventId].dist.d10k.Leaderboard[pos].runner = newUser;
                                    break;
                                }
                            }
                        break;
                        case "21K":
                            for (let pos = 0; pos < events[eventId].dist.d21k.Leaderboard.length; pos++) {
                                if (events[eventId].dist.d21k.Leaderboard[pos].runner == currUser) {
                                    events[eventId].dist.d21k.Leaderboard[pos].runner = newUser;
                                    break;
                                }
                            }
                        break;
                        case "42K":
                            for (let pos = 0; pos < events[eventId].dist.d42k.Leaderboard.length; pos++) {
                                if (events[eventId].dist.d42k.Leaderboard[pos].runner == currUser) {
                                    events[eventId].dist.d42k.Leaderboard[pos].runner = newUser;
                                    break;
                                }
                            }
                        break;
                    }
                    break;
                }
            }
        }
        localStorage.setItem('events', JSON.stringify(events));
    }

    _editTeams(newUser, currUser) {
        const teams = localStorage.teams ? JSON.parse(localStorage.teams) : [];
        var found = false;
        for (let teamId = 0; teamId < teams.length; teamId++) {
            for (let memberId = 0; memberId < teams[teamId].length; memberId++) {
                if (teams[teamId].members[memberId].name == currUser) {
                    teams[teamId].members[memberId].name = newUser;
                    
                    found = true;
                    break;
                }
            }
            if (found) { break; }
        }
        localStorage.setItem('events', JSON.stringify(teams));
    }
}
