export default class TeamModel {
    constructor() {
        this.teams = localStorage.teams ? JSON.parse(localStorage.teams) : [];
    }

    getAll() {
        return this.teams;
    }

    _persist() {
        localStorage.setItem('teams', JSON.stringify(this.teams));
    }

    create(name, country, city, shirt) {
        const team = {
            id: this.teams.length, name: name, country: country, city: city, shirt: shirt,
            leader: 0, members: [], requests: [],
            medals: { copper: [], bronze: [], silver: [], gold: [], plat: [], diamond: [], master: [], swift: [] },
            stats: { 
                race: { 
                    d5k  : {sumDist: 0, sumTime: 0, pace: 0, bestTime: "X", bestTimeMember:"X", bestPos: "X", bestPosMember: "X"},
                    d10k : {sumDist: 0, sumTime: 0, pace: 0, bestTime: "X", bestTimeMember:"X", bestPos: "X", bestPosMember: "X"},
                    d21k : {sumDist: 0, sumTime: 0, pace: 0, bestTime: "X", bestTimeMember:"X", bestPos: "X", bestPosMember: "X"},
                    d42k : {sumDist: 0, sumTime: 0, pace: 0, bestTime: "X", bestTimeMember:"X", bestPos: "X", bestPosMember: "X"}
                },
                walk: { 
                    d5k  : {sumDist: 0, sumTime: 0, pace: 0, bestTime: "X", bestTimeMember:"X", bestPos: "X", bestPosMember: "X"},
                    d10k : {sumDist: 0, sumTime: 0, pace: 0, bestTime: "X", bestTimeMember:"X", bestPos: "X", bestPosMember: "X"},
                    d21k : {sumDist: 0, sumTime: 0, pace: 0, bestTime: "X", bestTimeMember:"X", bestPos: "X", bestPosMember: "X"},
                    d42k : {sumDist: 0, sumTime: 0, pace: 0, bestTime: "X", bestTimeMember:"X", bestPos: "X", bestPosMember: "X"}
                }
            }
        }
        this.teams.push(team);
        this._persist();

        
        const leaderName = localStorage.loggedUser ? localStorage.getItem('loggedUser') : sessionStorage.getItem('loggedUser');
        const leaderID = function() {
            for (let id = 0; id < localStorage.users.length; id++) {
                if (leaderName == localStorage.users[id].username) {
                    return id;
                }
            }
        } 
        this.enroll(leaderName, leaderID(), team.id)
    }

    addRequest(userName, userId, reason, teamId) {
        const request = {requestId: teams[teamId].requests.length, name: userName, userId: userId, reason: reason }
        this.teams[teamId].requests.push(request);
        this._persist();
    }

    enroll(userName, userId, teamId) {
        const member = { memberId: teams[teamId].members.length, name: userName, userId: userId }
        this.teams[teamId].members.push(member);
        this._persist();
    }
}