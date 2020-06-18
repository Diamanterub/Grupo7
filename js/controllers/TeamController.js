import TeamModel from '../models/TeamModel.js'

export default class TeamController {
    constructor() {
        this.teamModel = new TeamModel();
        this.teamId = this.getId();
    }

    getId() {
        const user = localStorage.loggedUser ? localStorage.getItem('loggedUser') : sessionStorage.getItem('loggedUser');
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
            throw Error(`Team "${name}" alrealdy exists!`);
        }
    }

    sendRequest(userName, userId, reason, teamId) {
        this.teamModel.addRequest(userName, userId, reason, teamId);
    }

    addMember(userName, userId) {
        this.teamModel.enroll(userName, userId, this.teamId);
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
}