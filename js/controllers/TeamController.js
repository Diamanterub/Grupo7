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

    addMember(userName, userId) {
        this.teamModel.enroll(userName, userId, this.teamId);
    }
}