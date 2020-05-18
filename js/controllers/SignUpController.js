import UserModel from '../models/UserModel.js'

export default class SignUpController {
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
}
