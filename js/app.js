import SignInView from './views/SignInView.js'
import SignUpView from './views/SignUpView.js'
import SignStatusView from './views/SignStatusView.js'
import EventView from './views/EventView.js'
import SearchEventView from './views/SearchEventView.js'
import ShowEventView from './views/ShowEventView.js'


class App {
    constructor() {
        if (window.location.pathname !== "/html/sign-in.html" && window.location.pathname !== "/html/sign-up.html") {
            this.SignStatusView = new SignStatusView();
        }
        switch (window.location.pathname) {
            case "/html/sign-in.html":
                this.signInView = new SignInView();
                break;

            case "/html/sign-up.html":
                this.signUpView = new SignUpView();
                break;

            case "/html/admin/events.html":
                this.eventView = new EventView();
                break;

            case "/html/events.html":
                this.searchEventView = new SearchEventView();
                break;

            case "/html/event.html":
                this.showEventView = new ShowEventView();
                break;
        
            default:                
                break;
        }
    }
}

new App();