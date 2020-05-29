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
        for (let i = 0; i < this.userModel.getAll().length; i++) {
            if (localStorage.getItem('loggedUser') == this.userModel.getAll()[i].username) {
                return this.userModel.getAll()[i];
            }
        }
    }
}
