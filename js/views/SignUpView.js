import UserController from '../controllers/UserController.js'

export default class SignUpView {
    constructor() {
        this.userController = new UserController();

        this.userController.logoutUser();

        // register DOM
        this.registerForm = document.getElementById('frmRegister');
        this.registerUsername = document.getElementById('txtUsernameRegister');
        this.registerEmail = document.getElementById('txtEmailRegister');
        this.registerPassword = document.getElementById('txtPasswordRegister');
        this.registerPassword2 = document.getElementById('txtPasswordRegister2');
        this.registerMessage = document.getElementById('RegisterMessage');

        this.bindAddRegisterForm();
    }

    bindAddRegisterForm() {
        this.registerForm.addEventListener('submit', event => {
            event.preventDefault();

            try {
                if (this.registerPassword.value !==this.registerPassword2.value) {
                    throw Error('Password and Confirm Password are not equal!');   
                }
                this.userController.createUser(this.registerUsername.value, this.registerPassword.value, this.registerEmail.value);
                window.location.href = "/html/sign-in.html";
            } catch(e) {
                this.displayRegisterMessage(e, 'danger');
            }
        });
    }

    displayRegisterMessage(message, type) {
        this.registerMessage.innerHTML =
            `<div class="alert alert-${type}" role="alert">${message}</div>`;
    }
}
