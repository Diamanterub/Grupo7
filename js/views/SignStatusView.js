import UserController from '../controllers/UserController.js'

export default class SignStatusView {
    constructor()
    {
        this.userController = new UserController();

        this.checkLoginStatus();
    }
    
    checkLoginStatus() {
        if (!this.userController.checkSignStatus()) {
            window.location.replace("/html/sign-in.html");
        }
    }
}