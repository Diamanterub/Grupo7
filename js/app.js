import SignInView from './views/SignInView.js'
import SignUpView from './views/SignUpView.js'


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
                break;
        }
        // if (window.location.pathname == "/html/sign-in.html") {
        //     this.signInView = new SignInView();
        // }
        // if (window.location.pathname == "/html/sign-up.html") {
        //     this.signUpView = new SignUpView();
        // }
    }
}

new App();