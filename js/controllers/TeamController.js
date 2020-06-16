import TeamModel from '../models/TeamModel.js'

export default class TeamController {
    constructor() {
        this.teamModel = new TeamModel();
        this.teamId = this.getId();
    }

    getId() {
        const user = localStorage.loggedUser ? localStorage.getItem('loggedUser') : sessionStorage.getItem('loggedUser');
        const users = JSON.parse(localStorage.users);
        for (let i = 0; i < users.length; i++) {
            if (user == users[i].username) {
                for (let i = 0; i < this.teamModel.getAll().length; i++) {
                    if (users[i].team == this.teamModel.getAll()[i].name) {
                        return i;
                    }
                }
            }
        }
    }

    createTeam(name, country, city, shirt) {
        if (!this.teamModel.getAll().some(team => team.name === name)) {
            this.teamModel.create(name, country, city, shirt);
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
        for (let index = 0; index < team.length; index++) {
            let flag = false;
            if (name !== "") {
                flag = name == team[index].name;
            } else { flag = true; }
            if (!flag) { continue; }
            if (country !== "") {
                flag = country == team[index].country;
            } else { flag = true; }
            if (!flag) { continue; }
            if (city !== "") {
                flag = city == team[index].city;
            } else { flag = true; }
            if (!flag) { continue; }
            if (flag) {
                const ph = {
                    id: team[index].id,
                    url: team[index].shirt,
                    enrolled: team[index].members.length
                }
                send.push(ph);
            }
        }
        if (selected == "recent") {
            return array.slice().sort((a, b) => -(b.id - a.id));                
        } else {
            return array.slice().sort((a, b) => (b.enrolled - a.enrolled));
        }
        // to be moved to the respective view
        for (let index = 0; index < sortedActivities.length; index++) {
            area.innerHTML += 
            `<a href="Team.html?id=${sortedActivities[index].id}"><div class="card"><img src="${sortedActivities[index].url}" class="img-fluid" alt="Tshirt"></div></a>`
        }
    }
}