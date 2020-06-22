import TeamModel from '../models/TeamModel.js'

export default class TeamController {
    constructor() {
        this.teamModel = new TeamModel();
        this.teamId = this.getId();
    }

    getId(user = localStorage.loggedUser ? localStorage.getItem('loggedUser') : sessionStorage.getItem('loggedUser')) {
        const users = JSON.parse(localStorage.users);
        for (let userID = 0; userID < users.length; userID++) {
            if (user == users[userID].username) {
                for (let teamId = 0; teamId < this.teamModel.getAll().length; teamId++) {
                    if (users[userID].team == this.teamModel.getAll()[teamId].name) {
                        return teamId;
                    }
                }
            }
        }
        return false;
    }

    createTeam(name, country, city, shirt, chat) {
        if (!this.teamModel.getAll().some(team => team.name === name)) {
            this.teamModel.create(name, country, city, shirt, chat);
        } else {
            throw Error(`Team "${name}" already exists!`);
        }
    }

    deleteTeam(teamId) {
        this.teamModel.delete(teamId);
    }

    sendRequest(reason, teamId) {
        const user = localStorage.loggedUser ? localStorage.getItem('loggedUser') : sessionStorage.getItem('loggedUser');
        const userId = function(user) {
            const users = JSON.parse(localStorage.users);
            for (let userID = 0; userID < users.length; userID++) {
                if (user == users[userID].username) {
                    return userID;
                }
            }
        }
        for (let requestId = 0; requestId < this.teamModel.getAll()[teamId].requests.length; requestId++) {
            if (this.teamModel.getAll()[teamId].requests[requestId].userId == userId(user)) {
                alert("You've already sent an unanswered request to this team.");
                return;
            }            
        }
        this.teamModel.addRequest(user, userId(user), reason, teamId);
    }

    addMember(result, requestId, userName, userId, teamId) {
        if (this.getId(userName) !== false && result) {
            alert("Another team has already accepted this user first.")
            this.teamModel.enroll(false, requestId, "", "", teamId);
        } else {
            this.teamModel.enroll(result, requestId, userName, userId, teamId);
        }
    }

    removeMember(memberId, teamId) {
        this.teamModel.leave(memberId, teamId);
    }

    newLeader(memberId, teamId) {
        this.teamModel.reElect(memberId, teamId)
    }

    searchTeam(name, country, city, selected) {
        const teams = this.teamModel.getAll();
        var send = [];
        for (let index = 0; index < teams.length; index++) {
            let flag = false;
            if (name !== "") {
                flag = name == teams[index].name;
            } else { flag = true; }
            if (!flag) { continue; }
            if (country !== "") {
                flag = country == teams[index].country;
            } else { flag = true; }
            if (!flag) { continue; }
            if (city !== "") {
                flag = city == teams[index].city;
            } else { flag = true; }
            if (!flag) { continue; }
            if (flag) {
                const ph = {
                    id: teams[index].id,
                    url: teams[index].shirt,
                    enrolled: teams[index].members.length
                }
                send.push(ph);
            }
        }
        if (selected == "recent") {
            return teams.slice().sort((a, b) => -(b.id - a.id));                
        } else {
            return teams.slice().sort((a, b) => (b.enrolled - a.enrolled));
        }
    }

    getMain(teamInfo) {
        return {name: teamInfo.name, country: teamInfo.country, city: teamInfo.city,
                shirt: teamInfo.shirt, chat: teamInfo.chat}
    }

    getStats(type, dist, teamStats) {
        if (type == "Race") {
            switch (dist) {
                case "5K":  return teamStats.race.d5k;
                case "10K": return teamStats.race.d10k;
                case "21K": return teamStats.race.d21k;
                case "42K": return teamStats.race.d42k;
            }
        } else {
            switch (dist) {
                case "5K":  return teamStats.walk.d5k;
                case "10K": return teamStats.walk.d10k;
                case "21K": return teamStats.walk.d21k;
                case "42K": return teamStats.walk.d42k;
            }
        }
    }
}