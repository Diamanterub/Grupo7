import UserController from '../controllers/UserController.js'

export default class SignInView {
    constructor() {
        this.userController = new UserController();

        this.userController.logoutUser();

        // login DOM
        this.loginForm = document.getElementById('frmLogin');
        this.loginUsername = document.getElementById('txtUsername');
        this.loginPassword = document.getElementById('txtPassword');
        this.loginStaySigned = document.getElementById('checkStaySigned');
        this.loginMessage = document.getElementById('LoginMessage');

        this.bindAddLoginForm();
    }

    bindAddLoginForm() {
        this.loginForm.addEventListener('submit', event => {
            event.preventDefault(); 

            try {
                if (!this.userController.loginUser(this.loginUsername.value, this.loginPassword.value, this.loginStaySigned.checked)) {
                    window.location.href = "/html/home.html";
                } else {
                    window.location.href = "/html/admin/home.html";
                }
            } catch(e) {
                this.displayLoginMessage(e, 'danger');
            }
        });
    }

    displayLoginMessage(message, type) {
        this.loginMessage.innerHTML =
            `<div class="alert alert-${type}" role="alert">${message}</div>`;
    }
}
