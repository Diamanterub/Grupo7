import UserController from '../controllers/UserController.js'

export default class SignStatusView {
    constructor()
    {
        this.userController = new UserController();
        this.checkLoginStatus();
        if (!window.location.pathname.includes("admin")) {
            this.userProfilePicture();
        }
    }
    
    checkLoginStatus() {
        if (!this.userController.checkSignStatus()) {
            window.location.replace("/html/sign-in.html");
        }
    }

    userProfilePicture() {
        document.getElementById('user-photo').src = this.userController.userModel.getAll()[this.userController.getId()].pfp;
    }
}