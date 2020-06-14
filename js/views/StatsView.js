import UserController from '../controllers/UserController.js'

export default class SignInView {
    constructor() {
        this.userController = new UserController();

        this.slcType     = document.getElementById('slcType');
        this.slcDist     = document.getElementById('slcDist');

        this.divSumDist  = document.getElementById('divSumDist');
        this.divSumTime  = document.getElementById('divSumTime');
        this.divPace     = document.getElementById('divPace');
        this.divBestTime = document.getElementById('divBestTime');
        this.divBestPos  = document.getElementById('divBestPos');
        this.divRank     = document.getElementById('divRank');

        this.mdlCopper   = document.getElementById('mdlCopper');
        this.mdlBronze   = document.getElementById('mdlBronze');
        this.mdlSilver   = document.getElementById('mdlSilver');
        this.mdlGold     = document.getElementById('mdlGold');
        this.mdlPlat     = document.getElementById('mdlPlat');
        this.mdlDiamond  = document.getElementById('mdlDiamond');
        this.mdlMaster   = document.getElementById('mdlMaster');
        this.mdlSwift    = document.getElementById('mdlSwift');

        this.loadStats();
        this.loadMedals();

        this.slcType.addEventListener('change', (event) => { this.loadStats();});
        this.slcDist.addEventListener('change', (event) => { this.loadStats();});
    }

    loadStats() {
        const userStats = this.userController.getStats(this.slcType.value, this.slcDist.value);
        this.divSumDist.innerHTML  = `<p>Total Distance: ${userStats.sumDist} km</p>`;
        this.divSumTime.innerHTML  = `<p>Total Time: ${Math.round((userStats.sumTime / 3600) * 100) / 100} hours</p>`;
        this.divBestTime.innerHTML = `<p>Best Time: ${userStats.bestTime}</p>`;
        this.divBestPos.innerHTML  = `<p>Best Position: ${this._getNth(userStats.bestPos)}</p>`;
        this.divPace.innerHTML     = `<p>Average Pace: ${userStats.pace} km/h</p>`;
        this.divRank.innerHTML     = `<p>Medals (Rank: ${this.userController.userModel.getAll()[this.userController.getId()].rank})</p>`;
    }

    loadMedals() {
        const userMedals = this.userController.userModel.getAll()[this.userController.getId()].medals;

        for (let i = 0; i < userMedals.copper.length; i++) {
            this.mdlCopper.innerHTML +=
            `<tr>
                <th scope="row">${userMedals.copper[i].event}</th>
                <td>${this._getNth(userMedals.copper[i].edition)}</td>
                <td>${userMedals.copper[i].dist}</td>
                <td>${userMedals.copper[i].type}</td>
                <td>${this._getNth(userMedals.copper[i].pos)}</td>
                <td>${userMedals.copper[i].time}</td>
            </tr>`
        }
        
        for (let i = 0; i < userMedals.bronze.length; i++) {
            this.mdlBronze.innerHTML +=
            `<tr>
                <th scope="row">${userMedals.bronze[i].event}</th>
                <td>${this._getNth(userMedals.bronze[i].edition)}</td>
                <td>${userMedals.bronze[i].dist}</td>
                <td>${userMedals.bronze[i].type}</td>
                <td>${this._getNth(userMedals.bronze[i].pos)}</td>
                <td>${userMedals.bronze[i].time}</td>
            </tr>`
        }
        
        for (let i = 0; i < userMedals.silver.length; i++) {
            this.mdlSilver.innerHTML +=
            `<tr>
                <th scope="row">${userMedals.silver[i].event}</th>
                <td>${this._getNth(userMedals.silver[i].edition)}</td>
                <td>${userMedals.silver[i].dist}</td>
                <td>${userMedals.silver[i].type}</td>
                <td>${this._getNth(userMedals.silver[i].pos)}</td>
                <td>${userMedals.silver[i].time}</td>
            </tr>`
        }
        
        for (let i = 0; i < userMedals.gold.length; i++) {
            this.mdlGold.innerHTML +=
            `<tr>
                <th scope="row">${userMedals.gold[i].event}</th>
                <td>${this._getNth(userMedals.gold[i].edition)}</td>
                <td>${userMedals.gold[i].dist}</td>
                <td>${userMedals.gold[i].type}</td>
                <td>${this._getNth(userMedals.gold[i].pos)}</td>
                <td>${userMedals.gold[i].time}</td>
            </tr>`
        }
        
        for (let i = 0; i < userMedals.plat.length; i++) {
            this.mdlPlat.innerHTML +=
            `<tr>
                <th scope="row">${userMedals.plat[i].event}</th>
                <td>${this._getNth(userMedals.plat[i].edition)}</td>
                <td>${userMedals.plat[i].dist}</td>
                <td>${userMedals.plat[i].type}</td>
                <td>${this._getNth(userMedals.plat[i].pos)}</td>
                <td>${userMedals.plat[i].time}</td>
            </tr>`
        }
        
        for (let i = 0; i < userMedals.diamond.length; i++) {
            this.mdlDiamond.innerHTML +=
            `<tr>
                <th scope="row">${userMedals.diamond[i].event}</th>
                <td>${this._getNth(userMedals.diamond[i].edition)}</td>
                <td>${userMedals.diamond[i].dist}</td>
                <td>${userMedals.diamond[i].type}</td>
                <td>${this._getNth(userMedals.diamond[i].pos)}</td>
                <td>${userMedals.diamond[i].time}</td>
            </tr>`
        }
        
        for (let i = 0; i < userMedals.master.length; i++) {
            this.mdlMaster.innerHTML +=
            `<tr>
                <th scope="row">${userMedals.master[i].event}</th>
                <td>${this._getNth(userMedals.master[i].edition)}</td>
                <td>${userMedals.master[i].dist}</td>
                <td>${userMedals.master[i].type}</td>
                <td>${this._getNth(userMedals.master[i].pos)}</td>
                <td>${userMedals.master[i].time}</td>
            </tr>`
        }
        
        for (let i = 0; i < userMedals.swift.length; i++) {
            this.mdlSwift.innerHTML +=
            `<tr>
                <th scope="row">${userMedals.swift[i].event}</th>
                <td>${this._getNth(userMedals.swift[i].edition)}</td>
                <td>${userMedals.swift[i].dist}</td>
                <td>${userMedals.swift[i].type}</td>
                <td>${this._getNth(userMedals.swift[i].pos)}</td>
                <td>${userMedals.swift[i].time}</td>
            </tr>`
        }
    }

    _getNth(number) {
        number = number.toString();
        if (number.length == 1) {
            return number == "X" ? number : number + this._lastDigit(number);
        } else {
            if (number[number.length - 2] == 1) {
                return number + "nt";
            } else {
                return number + this._lastDigit(number[number.length - 1]);
            }
        }
    }

    _lastDigit(num) {
        switch (num) {
            case "1": return "st"; break;
            case "2": return "nd"; break;
            case "3": return "rd"; break;
            default: return "th"; break;
        }
    }
}