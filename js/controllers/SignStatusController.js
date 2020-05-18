import UserModel from '../models/UserModel.js'

export default class SignStatusController {
    constructor() {
        this.userModel = new UserModel();
    }

    checkSignStatus() {
        return this.userModel.isSigned();
    }    
}