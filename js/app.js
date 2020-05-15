import SignInView from './views/SignInView.js'
import SignUpView from './views/SignUpView.js'


class App {
    constructor() {
        if (window.location.pathname == "/html/sign%20in.html") {
            this.signInView = new SignInView();
        }
        if (window.location.pathname == "/html/sign%20up.html") {
            this.signUpView = new SignUpView();
        }
    }
}

new App();