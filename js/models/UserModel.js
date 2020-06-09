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
                    d5k  : {sumDist: 0, sumTime: 0, pace: 0, bestTime: "X", bestPos: "X"},
                    d10k : {sumDist: 0, sumTime: 0, pace: 0, bestTime: "X", bestPos: "X"},
                    d21k : {sumDist: 0, sumTime: 0, pace: 0, bestTime: "X", bestPos: "X"},
                    d42k : {sumDist: 0, sumTime: 0, pace: 0, bestTime: "X", bestPos: "X"}
                },
                walk: { 
                    d5k  : {sumDist: 0, sumTime: 0, pace: 0, bestTime: "X", bestPos: "X"},
                    d10k : {sumDist: 0, sumTime: 0, pace: 0, bestTime: "X", bestPos: "X"},
                    d21k : {sumDist: 0, sumTime: 0, pace: 0, bestTime: "X", bestPos: "X"},
                    d42k : {sumDist: 0, sumTime: 0, pace: 0, bestTime: "X", bestPos: "X"}
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
                localStorage.events ? JSON.stringify(localStorage.events).includes(this.users[id].username) ? localStorage.setItem('events', localStorage.events.replace(this.users[id].username, info)) : {} : {} ;
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
}
