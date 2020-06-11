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
        const leader = localStorage.loggedUser ? localStorage.getItem('loggedUser') : sessionStorage.getItem('loggedUser');
        const team = {
            id: this.teams.length, name: name, country: country, city: city, shirt: shirt,
            leader: leader, members: [], requests: [],
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
    }

    enroll(userName, userId, teamId) {
        const member = { memberId: teams[teamId].members.length, name: userName, userId: userId }
        this.teams[teamId].members.push(member);
        this._persist();
    }
}