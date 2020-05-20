import SignStatusController from '../controllers/SignStatusController.js'

export default class SignStatusView {
    constructor()
    {
        this.signStatusController = new SignStatusController();

        this.checkLoginStatus();
    }
    
    checkLoginStatus() {
        if (!this.signStatusController.checkSignStatus()) {
            window.location.replace("/html/sign-in.html");
        }
    }
}