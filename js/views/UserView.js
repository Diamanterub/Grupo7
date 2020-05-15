import UserController from '../controllers/UserController.js'

export default class UserView {
    constructor() {
        this.userController = new UserController();

        // register DOM
        this.registerForm = document.getElementById('frmRegister');
        this.registerUsername = document.getElementById('txtUsernameRegister');
        this.registerEmail = document.getElementById('txtEmailRegister');
        this.registerPassword = document.getElementById('txtPasswordRegister');
        this.registerPassword2 = document.getElementById('txtPasswordRegister2');
        this.registerMessage = document.getElementById('RegisterMessage');

        this.bindAddRegisterForm();

        // login DOM
        this.loginForm = document.getElementById('frmLogin');
        this.loginUsername = document.getElementById('txtUsername');
        this.loginPassword = document.getElementById('txtPassword');
        // this.loginStaySigned = document.getElementById('checkStaySigned');
        this.loginMessage = document.getElementById('LoginMessage');

        this.bindAddLoginForm();

        // buttons DOM
        this.logoutButton = document.getElementById('btnLogout');

        this.bindAddLogoutEvent();

        // this.checkLoginStatus();
    }

    bindAddRegisterForm() {
        this.registerForm.addEventListener('submit', event => {
            event.preventDefault();

            try {
                if (this.registerPassword.value !==this.registerPassword2.value) {
                    throw Error('Password e Confirm Password não são iguais');   
                }
                this.userController.createUser(this.registerUsername.value, this.registerPassword.value, this.registerEmail.value);
                this.displayRegisterMessage('User registado com successo!', 'success');
            } catch(e) {
                this.displayRegisterMessage(e, 'danger');
            }
        });
    }

    bindAddLoginForm() {
        this.loginForm.addEventListener('submit', event => {
            event.preventDefault(); 

            try {
                this.userController.loginUser(this.loginUsername.value, this.loginPassword.value);
                this.displayLoginMessage('User logged in with success!', 'success');
            } catch(e) {
                this.displayLoginMessage(e, 'danger');
            }
        });
    }
    
    bindAddLogoutEvent() {
        this.logoutButton.addEventListener('click', event => {
            this.userController.logoutUser();
            this.updateButtons('logout');
        });
    }

    // checkLoginStatus() {
    //     if (this.userController.checkLoginStatus()) {
    //         this.updateButtons('login');
    //     } else {
    //         this.updateButtons('logout');
    //     }
    // }

    displayRegisterMessage(message, type) {
        this.registerMessage.innerHTML =
            `<div class="alert alert-${type}" role="alert">${message}</div>`;
    }

    displayLoginMessage(message, type) {
        this.loginMessage.innerHTML =
            `<div class="alert alert-${type}" role="alert">${message}</div>`;
    }
}
