import UserModel from '../models/UserModel.js'

export default class SignInController {
    constructor() {
        this.userModel = new UserModel();
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
}
