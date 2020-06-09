import UserController from '../controllers/UserController.js'

export default class SignInView {
    constructor() {
        this.userController = new UserController();

        this.slcType     = document.getElementById('');
        this.slcDist     = document.getElementById('');

        this.divSumDist  = document.getElementById('');
        this.divSumTime  = document.getElementById('');
        this.divPace     = document.getElementById('');
        this.divBestTime = document.getElementById('');
        this.divBestPos  = document.getElementById('');
        this.divRank     = document.getElementById('');

        this.mdlCopper   = document.getElementById('');
        this.mdlBronze   = document.getElementById('');
        this.mdlSilver   = document.getElementById('');
        this.mdlGold     = document.getElementById('');
        this.mdlPlat     = document.getElementById('');
        this.mdlDiamond  = document.getElementById('');
        this.mdlMaster   = document.getElementById('');
        this.mdlSwift    = document.getElementById('');

        this.loadStats();
        this.loadMedals();

        this.slcType.addEventListener('change', (event) => { this.loadStats(); });
        this.slcDist.addEventListener('change', (event) => { this.loadStats(); });
    }

    loadStats() {
        const userStats = this.userController.getStats(this.slcType.value, this.slcDist.value);
        this.divSumDist.innerHTML  = userStats.sumDist;  this.divSumTime.innerHTML = userStats.sumTime;
        this.divBestTime.innerHTML = userStats.bestTime; this.divBestPos.innerHTML = userStats.bestPos;
        this.divPace.innerHTML     = userStats.Pace;     this.divRank.innerHTML = this.userController.userModel.getAll(this.userController.getId()).rank;
    }

    loadMedals() {
        const userMedals = this.userController.getMedals();

        for (let i = 0; i < userMedals.copper.length; i++) {
            this.mdlCopper.innerHTML +=
            `<div>
                <p>${userMedals.copper.event} - ${this._getNth(userMedals.copper.edition)}</p><br>
                <p>${userMedals.copper.dist} ${userMedals.copper.type}</p><br>
                <p>${this._getNth(userMedals.copper.pos)} place: ${userMedals.copper.time}</p>
            <div>`
        }
        
        for (let i = 0; i < userMedals.bronze.length; i++) {
            this.mdlCopper.innerHTML +=
            `<div>
                <p>${userMedals.bronze.event} - ${this._getNth(userMedals.bronze.edition)}</p><br>
                <p>${userMedals.bronze.dist} ${userMedals.bronze.type}</p><br>
                <p>${this._getNth(userMedals.bronze.pos)} place: ${userMedals.bronze.time}</p>
            <div>`
        }
        
        for (let i = 0; i < userMedals.silver.length; i++) {
            this.mdlCopper.innerHTML +=
            `<div>
                <p>${userMedals.silver.event} - ${this._getNth(userMedals.silver.edition)}</p><br>
                <p>${userMedals.silver.dist} ${userMedals.silver.type}</p><br>
                <p>${this._getNth(userMedals.silver.pos)} place: ${userMedals.silver.time}</p>
            <div>`
        }
        
        for (let i = 0; i < userMedals.gold.length; i++) {
            this.mdlCopper.innerHTML +=
            `<div>
                <p>${userMedals.gold.event} - ${this._getNth(userMedals.gold.edition)}</p><br>
                <p>${userMedals.gold.dist} ${userMedals.gold.type}</p><br>
                <p>${this._getNth(userMedals.gold.pos)} place: ${userMedals.gold.time}</p>
            <div>`
        }
        
        for (let i = 0; i < userMedals.plat.length; i++) {
            this.mdlCopper.innerHTML +=
            `<div>
                <p>${userMedals.plat.event} - ${this._getNth(userMedals.plat.edition)}</p><br>
                <p>${userMedals.plat.dist} ${userMedals.plat.type}</p><br>
                <p>${this._getNth(userMedals.plat.pos)} place: ${userMedals.plat.time}</p>
            <div>`
        }
        
        for (let i = 0; i < userMedals.diamond.length; i++) {
            this.mdlCopper.innerHTML +=
            `<div>
                <p>${userMedals.diamond.event} - ${this._getNth(userMedals.diamond.edition)}</p><br>
                <p>${userMedals.diamond.dist} ${userMedals.diamond.type}</p><br>
                <p>${this._getNth(userMedals.diamond.pos)} place: ${userMedals.diamond.time}</p>
            <div>`
        }
        
        for (let i = 0; i < userMedals.master.length; i++) {
            this.mdlCopper.innerHTML +=
            `<div>
                <p>${userMedals.master.event} - ${this._getNth(userMedals.master.edition)}</p><br>
                <p>${userMedals.master.dist} ${userMedals.master.type}</p><br>
                <p>${this._getNth(userMedals.master.pos)} place: ${userMedals.master.time}</p>
            <div>`
        }
        
        for (let i = 0; i < userMedals.swift.length; i++) {
            this.mdlCopper.innerHTML +=
            `<div>
                <p>${userMedals.swift.event} - ${this._getNth(userMedals.swift.edition)}</p><br>
                <p>${userMedals.swift.dist} ${userMedals.swift.type}</p><br>
                <p>${this._getNth(userMedals.swift.pos)} place: ${userMedals.swift.time}</p>
            <div>`
        }
    }

    _getNth(number) {
        if (number.length == 1) {
            return number + this._lastDigit(number);
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