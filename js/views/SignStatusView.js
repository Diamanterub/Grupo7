import SignController from '../controllers/SignController.js'

export default class SignStatusView {
    constructor()
    {
        this.signController = new SignController();

        this.checkLoginStatus();
    }
    
    checkLoginStatus() {
        if (!this.signController.checkSignStatus()) {
            window.location.replace("/html/sign-in.html");
        }
    }
}