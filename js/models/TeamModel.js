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

    create(name, country, city, shirt, chat) {
        const team = {
            id: this.teams.length, name: name, country: country, city: city, shirt: shirt, chat: chat,
            leader: 0, members: [], requests: [],
            medals: { copper: [], bronze: [], silver: [], gold: [], plat: [], diamond: [], master: [], swift: [] },
            stats: { 
                race: { 
                    d5k  : {sumDist: 0, sumTime: 0, pace: 0, bestTime: "N/A", bestTimeMember:"N/A", bestPos: "N/A", bestPosMember: "N/A"},
                    d10k : {sumDist: 0, sumTime: 0, pace: 0, bestTime: "N/A", bestTimeMember:"N/A", bestPos: "N/A", bestPosMember: "N/A"},
                    d21k : {sumDist: 0, sumTime: 0, pace: 0, bestTime: "N/A", bestTimeMember:"N/A", bestPos: "N/A", bestPosMember: "N/A"},
                    d42k : {sumDist: 0, sumTime: 0, pace: 0, bestTime: "N/A", bestTimeMember:"N/A", bestPos: "N/A", bestPosMember: "N/A"}
                },
                walk: { 
                    d5k  : {sumDist: 0, sumTime: 0, pace: 0, bestTime: "N/A", bestTimeMember:"N/A", bestPos: "N/A", bestPosMember: "N/A"},
                    d10k : {sumDist: 0, sumTime: 0, pace: 0, bestTime: "N/A", bestTimeMember:"N/A", bestPos: "N/A", bestPosMember: "N/A"},
                    d21k : {sumDist: 0, sumTime: 0, pace: 0, bestTime: "N/A", bestTimeMember:"N/A", bestPos: "N/A", bestPosMember: "N/A"},
                    d42k : {sumDist: 0, sumTime: 0, pace: 0, bestTime: "N/A", bestTimeMember:"N/A", bestPos: "N/A", bestPosMember: "N/A"}
                }
            }
        }
        this.teams.push(team);
        this._persist();

        const leaderName = localStorage.loggedUser ? localStorage.getItem('loggedUser') : sessionStorage.getItem('loggedUser');
        const leaderID = function(ldnm) {
            for (let id = 0; id < JSON.parse(localStorage.users).length; id++) {
                if (ldnm == JSON.parse(localStorage.users)[id].username) {
                    return id;
                }
            }
        }
        this.enroll(true, false, leaderName, leaderID(leaderName), team.id)
    }

    addRequest(userName, userId, reason, teamId) {
        const request = {requestId: this.teams[teamId].requests.length, name: userName, userId: userId, reason: reason }
        this.teams[teamId].requests.push(request);
        this._persist();
    }

    enroll(result, requestId, userName, userId, teamId) {
        if (result) {
            const member = { memberId: this.teams[teamId].members.length, name: userName, userId: userId }
            this.teams[teamId].members.push(member);
            const users = JSON.parse(localStorage.users)
            users[userId].team = this.teams[teamId].name;
            localStorage.setItem('users', JSON.stringify(users));
        }
        if (requestId !== false) {
            this.teams[teamId].requests.splice(requestId, 1);
        }
        this._persist();
    }
}