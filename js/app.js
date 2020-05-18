import SignInView from './views/SignInView.js'
import SignUpView from './views/SignUpView.js'
import SignStatusView from './views/SignStatusView.js'


class App {
    constructor() {
        switch (window.location.pathname) {
            case "/html/sign-in.html":
                this.signInView = new SignInView();
                break;

            case "/html/sign-up.html":
                this.signUpView = new SignUpView();
                break;
        
            default:
                this.SignStatusView = new SignStatusView();
                break;
        }
    }
}

new App();