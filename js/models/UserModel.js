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
            id: this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 0, username: username,
            password: password, email: email, admin: admin, pfp: "", team: "", rank: 500,
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

    delete(deleteId) {
        if (this.users[deleteId].team != "") {
            const teams = localStorage.teams ? JSON.parse(localStorage.teams) : [];
            for (let teamId = 0; teamId < teams.length; teamId++) {
                if (this.users[deleteId].team == teams[teamId].name) {
                    for (let memberId = 0; memberId < teams[teamId].members.length; memberId++) {
                        if (deleteId == teams[teamId].members[memberId].userId) {
                            teams[teamId].members.splice(memberId, 1);
                            localStorage.setItem('teams', JSON.stringify(teams));
                            break;
                        }
                    }
                    break;
                }
            }
        }
        this.users.splice(deleteId, 1);

        if (this.users.length > 0) {
            if (deleteId < this.users[this.users.length - 1].id) {
                for (let userId = deleteId; userId < this.users.length; userId++) {
                    const teams = localStorage.teams ? JSON.parse(localStorage.teams) : [];
                    for (let teamId = 0; teamId < teams.length; teamId++) {
                        if (this.users[userId].team != "") {
                            if (this.users[userId].team == teams[teamId].name) {
                                for (let memberId = 0; memberId < teams[teamId].members.length; memberId++) {
                                    if (this.users[userId].id == teams[teamId].members[memberId].userId) {
                                        teams[teamId].members[memberId].userId = userId;
                                        break;
                                    }
                                }
                                break;
                            }
                        } else {
                            for (let requestId = 0; requestId < teams[teamId].requests.length; requestId++) {
                                if (this.users[userId].id == teams[teamId].requests[requestId].userId) {
                                    teams[teamId].requests[requestId].userId = userId;
                                    break;
                                }
                            }
                        }
                    }
                    localStorage.setItem('teams', JSON.stringify(teams));
                    this.users[userId].id = userId;
                }
            }
        }
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
                this._editTeams(info, this.users[id].username);
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
        for (let teamId = 0; teamId < teams.length; teamId++) {
            for (let memberId = 0; memberId < teams[teamId].length; memberId++) {
                if (teams[teamId].members[memberId].name == currUser) {
                    teams[teamId].members[memberId].name = newUser;
                    break;
                }
            }
            for (let i = 0; i < teams[teamId].medals.copper .length; i++)
                { teams[teamId].medals.copper [i].member == currUser ? teams[teamId].medals.copper [i].member = newUser : {} }
            for (let i = 0; i < teams[teamId].medals.bronze .length; i++)
                { teams[teamId].medals.bronze [i].member == currUser ? teams[teamId].medals.bronze [i].member = newUser : {} }
            for (let i = 0; i < teams[teamId].medals.silver .length; i++)
                { teams[teamId].medals.silver [i].member == currUser ? teams[teamId].medals.silver [i].member = newUser : {} }
            for (let i = 0; i < teams[teamId].medals.gold   .length; i++)
                { teams[teamId].medals.gold   [i].member == currUser ? teams[teamId].medals.gold   [i].member = newUser : {} }
            for (let i = 0; i < teams[teamId].medals.plat   .length; i++)
                { teams[teamId].medals.plat   [i].member == currUser ? teams[teamId].medals.plat   [i].member = newUser : {} }
            for (let i = 0; i < teams[teamId].medals.diamond.length; i++)
                { teams[teamId].medals.diamond[i].member == currUser ? teams[teamId].medals.diamond[i].member = newUser : {} }
            for (let i = 0; i < teams[teamId].medals.master .length; i++)
                { teams[teamId].medals.master [i].member == currUser ? teams[teamId].medals.master [i].member = newUser : {} }
            for (let i = 0; i < teams[teamId].medals.swift  .length; i++)
                { teams[teamId].medals.swift  [i].member == currUser ? teams[teamId].medals.swift  [i].member = newUser : {} }
            teams[teamId].stats.race.d5k .bestTimeMember == currUser ? teams[teamId].stats.race.d5k .bestTimeMember = newUser : {};
            teams[teamId].stats.race.d5k .bestPosMember  == currUser ? teams[teamId].stats.race.d5k .bestPosMember  = newUser : {};
            teams[teamId].stats.race.d10k.bestTimeMember == currUser ? teams[teamId].stats.race.d10k.bestTimeMember = newUser : {};
            teams[teamId].stats.race.d10k.bestPosMember  == currUser ? teams[teamId].stats.race.d10k.bestPosMember  = newUser : {};
            teams[teamId].stats.race.d21k.bestTimeMember == currUser ? teams[teamId].stats.race.d21k.bestTimeMember = newUser : {};
            teams[teamId].stats.race.d21k.bestPosMember  == currUser ? teams[teamId].stats.race.d21k.bestPosMember  = newUser : {};
            teams[teamId].stats.race.d42k.bestTimeMember == currUser ? teams[teamId].stats.race.d42k.bestTimeMember = newUser : {};
            teams[teamId].stats.race.d42k.bestPosMember  == currUser ? teams[teamId].stats.race.d42k.bestPosMember  = newUser : {};
            teams[teamId].stats.walk.d5k .bestTimeMember == currUser ? teams[teamId].stats.walk.d5k .bestTimeMember = newUser : {};
            teams[teamId].stats.walk.d5k .bestPosMember  == currUser ? teams[teamId].stats.walk.d5k .bestPosMember  = newUser : {};
            teams[teamId].stats.walk.d10k.bestTimeMember == currUser ? teams[teamId].stats.walk.d10k.bestTimeMember = newUser : {};
            teams[teamId].stats.walk.d10k.bestPosMember  == currUser ? teams[teamId].stats.walk.d10k.bestPosMember  = newUser : {};
            teams[teamId].stats.walk.d21k.bestTimeMember == currUser ? teams[teamId].stats.walk.d21k.bestTimeMember = newUser : {};
            teams[teamId].stats.walk.d21k.bestPosMember  == currUser ? teams[teamId].stats.walk.d21k.bestPosMember  = newUser : {};
            teams[teamId].stats.walk.d42k.bestTimeMember == currUser ? teams[teamId].stats.walk.d42k.bestTimeMember = newUser : {};
            teams[teamId].stats.walk.d42k.bestPosMember  == currUser ? teams[teamId].stats.walk.d42k.bestPosMember  = newUser : {};
        }
        localStorage.setItem('teams', JSON.stringify(teams));
    }
}
