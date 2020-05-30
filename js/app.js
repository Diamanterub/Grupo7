import SignInView        from './views/SignInView.js'
import SignUpView        from './views/SignUpView.js'
import SignStatusView    from './views/SignStatusView.js'
import CreateEventView   from './views/CreateEventView.js'
import SearchEventView   from './views/SearchEventView.js'
import ShowEventView     from './views/ShowEventView.js'
import CompleteEventView from './views/CompleteEventView.js'
import LeaderboardView   from './views/LeaderboardView.js';
import ProfileView       from './views/ProfileView.js';


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

            case "/html/admin/events/create.html":
                this.createEventView = new CreateEventView();
                break;

            case "/html/admin/events/complete.html":
                this.completeEventView = new CompleteEventView();
                break;

            case "/html/events.html":
                this.searchEventView = new SearchEventView();
                break;

            case "/html/event.html":
                this.showEventView = new ShowEventView();
                break;

            case "/html/leaderboard.html":
                this.leaderboardView = new LeaderboardView();
                break;

            case "/html/profile.html":
                this.profileView = new ProfileView();
                break;
        
            default:                
                break;
        }
    }
}

new App();