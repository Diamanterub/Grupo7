export default class UserModel {
    constructor() {
        this.users = localStorage.users ? JSON.parse(localStorage.users) : [];
    }

    getAll() {
        return this.users;
    }

    create(username, password, email) {
        let admin;
        username == "adminP" || username == "adminY" || username == "adminR" ? admin = true : admin = false;
        const user = {
            id: this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1,
            username: username,
            password: password,
            email: email,
            admin: admin
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

    _persist() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }
}
