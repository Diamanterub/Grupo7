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

    loginUser(username, password) {
        if (this.userModel.getAll().some(user => { return user.username === username && user.password === password })) {
            this.userModel.login(username);
            return true;
        } else {
            throw Error('Invalid login!');
        }    
    }

    logoutUser() {
        this.userModel.logout();
    }

    checkLoginStatus() {
        return this.userModel.isLogged();
    }
}
