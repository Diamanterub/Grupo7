import UserModel from '../models/UserModel.js'

export default class UserController {
    constructor() {
        this.userModel = new UserModel();
    }

    createUser(username, password, email) {
        if (!this.userModel.getAll().some(user => user.username === username)) {
            this.userModel.create(username, password, email);
        } else {
            throw Error(`User com username "${username}" já existe!`);
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
        return this.userModel.getAll()[this._getId()];
    }

    editInfo(username, email, password, passconf, pfp) {
        if (password != passconf) { alert('Password and Confirm Password are not equal!'); return false; }
        const id = this._getId();
        if (username != this.userModel.getAll()[id].username && username != "") {
            if (!this.userModel.getAll().some(user => user.username === username)) {
                this.userModel.applyEdit("username", username, id);
            } else {
                alert('Username already in use');
            }
        }
        email != this.userModel.getAll()[id].email && email != "" ? this.userModel.applyEdit("email", email, id) : {} ;
        password != this.userModel.getAll()[id].password && password != "" ? this.userModel.applyEdit("password", password, id) : {} ;
        pfp != this.userModel.getAll()[id].pfp && pfp != "" ? this.userModel.applyEdit("pfp", pfp, id) : {} ;
        return true;
    }

    _getId() {
        for (let i = 0; i < this.userModel.getAll().length; i++) {
            if (localStorage.getItem('loggedUser') == this.userModel.getAll()[i].username) {
                return i;
            }
        }
    }
}
