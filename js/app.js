import SignInView        from './views/SignInView.js';
import SignUpView        from './views/SignUpView.js';
import SignStatusView    from './views/SignStatusView.js';
import CreateEventView   from './views/CreateEventView.js';
import SearchEventView   from './views/SearchEventView.js';
import ShowEventView     from './views/ShowEventView.js';
import CompleteEventView from './views/CompleteEventView.js';
import LeaderboardView   from './views/LeaderboardView.js';
import ProfileView       from './views/ProfileView.js';
import RankedSlidersView from './views/RankedSlidersView.js';
import StatsView         from './views/StatsView.js';
import SearchTeamView    from './views/SearchTeamView.js';
import CreateTeamView    from './views/CreateTeamView.js';
import ShowTeamView      from './views/ShowTeamView.js';
import ManageRunnersView from './views/ManageRunnersView.js';
import ExamineUsersView  from './views/ExamineUsersView.js';
import InspectTeamView   from './views/InspectTeamView.js';

class App {
    constructor() {
        if (window.location.pathname !== "/html/sign-in.html" && window.location.pathname !== "/html/sign-up.html") {
            this.SignStatusView = new SignStatusView();
        }
        switch (window.location.pathname) {
            case "/html/sign-in.html": this.signInView = new SignInView(); break;

            case "/html/sign-up.html": this.signUpView = new SignUpView(); break;

            case "/html/admin/events/create.html": this.createEventView = new CreateEventView(); break;

            case "/html/admin/events/iet.html": this.completeEventView = new CompleteEventView(); break;

            case "/html/admin/events/manage_runners.html": this.manageRunnersView = new ManageRunnersView(); break;

            case "/html/admin/examine_users.html": this.examineUsersView = new ExamineUsersView(); break;

            case "/html/admin/inspect_teams.html": this.inspectTeamView = new InspectTeamView(); break;

            case "/html/events.html": this.searchEventView = new SearchEventView(); break;

            case "/html/event.html": this.showEventView = new ShowEventView(); break;

            case "/html/leaderboard.html": this.leaderboardView = new LeaderboardView(); break;

            case "/html/profile.html": this.profileView = new ProfileView(); break;

            case "/html/admin/ranked_sliders.html": this.rankedSlidersView = new RankedSlidersView(); break;

            case "/html/stats.html": this.statsView = new StatsView(); break;

            case "/html/teams.html": this.searchTeamView = new SearchTeamView(); break;

            case "/html/team-c.html": this.createTeamView = new CreateTeamView(); break;

            case "/html/Team.html": this.showTeamView = new ShowTeamView(); break;
        }
    }
}

new App();