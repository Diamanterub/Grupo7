export default class UserModel {
    constructor() {
        this.users = localStorage.users ? JSON.parse(localStorage.users) : [];
    }

    getAll() {
        return this.users;
    }

    create(username, password, email) {
        const user = {
            id: this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1,
            username: username,
            password: password,
            email: email         
        }
        this.users.push(user);
        this._persist();
    }

    login(username, staysigned) {
        this.logout();
        if (staysigned) {
            localStorage.setItem('loggedUser', username);
            const ttl = Date.now() + (72 * 60 * 60);
            localStorage.setItem('timeToLive', ttl);
        } else {
            sessionStorage.setItem('loggedUser', username);
        }
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

    isLogged() {
        return sessionStorage.getItem('loggedUser') !== null ? true : false;
    }

    _persist() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }
}
