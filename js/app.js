import SignInView from './views/SignInView.js'
import SignUpView from './views/SignUpView.js'


class App {
    constructor() {
        this.signInView = new SignInView();
        this.signUpView = new SignUpView();
    }
}

new App();