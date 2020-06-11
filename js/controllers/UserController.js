import UserModel from '../models/UserModel.js'

export default class UserController {
    constructor() {
        this.userModel = new UserModel();
        this.userId = this.getId();
    }

    getId() {
        const user = localStorage.loggedUser ? localStorage.getItem('loggedUser') : sessionStorage.getItem('loggedUser');
        for (let i = 0; i < this.userModel.getAll().length; i++) {
            if (user == this.userModel.getAll()[i].username) {
                return i;
            }
        }
    }

    createUser(username, password, email) {
        if (!this.userModel.getAll().some(user => user.username === username)) {
            this.userModel.create(username, password, email);
        } else {
            throw Error(`Username "${username}" already taken!`);
        }
    }

    logoutUser() {
        this.userModel.logout();
    }

    checkSignStatus() {
        return this.userModel.isSigned();
    }

    loginUser(username, password, staysigned) {
        if (this.userModel.getAll().some(user => { return user.username === username && user.password === password })) {
            return this.userModel.login(username, staysigned);
        } else {
            throw Error('Invalid login!');
        }
    }

    logoutUser() {
        this.userModel.logout();
    }

    getInfo() {
        return this.userModel.getAll()[this.getId()];
    }

    editInfo(username, email, password, passconf, pfp) {
        if (password != passconf) { alert('Password and Confirm Password are not equal!'); return false; }
        if (username != this.userModel.getAll()[this.userId].username && username != "") {
            if (!this.userModel.getAll().some(user => user.username === username)) {
                this.userModel.applyEdit("username", username, this.userId);
            } else {
                alert('Username already in use');
            }
        }
        email != this.userModel.getAll()[this.userId].email && email != "" ? this.userModel.applyEdit("email", email, this.userId) : {} ;
        password != this.userModel.getAll()[this.userId].password && password != "" ? this.userModel.applyEdit("password", password, this.userId) : {} ;
        pfp != this.userModel.getAll()[this.userId].pfp && pfp != "" ? this.userModel.applyEdit("pfp", pfp, this.userId) : {} ;
        return true;
    }

    getStats(type, dist) {
        if (type == "Race") {
            switch (dist) {
                case "5K":  return this.userModel.getAll()[this.userId].stats.race.d5k;
                case "10K": return this.userModel.getAll()[this.userId].stats.race.d10k;
                case "21K": return this.userModel.getAll()[this.userId].stats.race.d21k;
                case "42K": return this.userModel.getAll()[this.userId].stats.race.d42k;
            }
        } else {
            switch (dist) {
                case "5K":  return this.userModel.getAll()[this.userId].stats.walk.d5k;
                case "10K": return this.userModel.getAll()[this.userId].stats.walk.d10k;
                case "21K": return this.userModel.getAll()[this.userId].stats.walk.d21k;
                case "42K": return this.userModel.getAll()[this.userId].stats.walk.d42k;
            }
        }
    }
}
