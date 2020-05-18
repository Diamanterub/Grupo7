import SignInController from '../controllers/SignInController.js'

export default class SignInView {
    constructor() {
        this.signInController = new SignInController();

        this.signInController.logoutUser();

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
                this.signInController.loginUser(this.loginUsername.value, this.loginPassword.value, this.loginStaySigned.checked);
                window.location.href = "/html/home.html";
                //this.displayLoginMessage();
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
