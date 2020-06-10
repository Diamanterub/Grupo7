import EventController from '../controllers/EventController.js'

export default class EventView {
    constructor() {
        this.eventController = new EventController();

        this.lblCopper = document.getElementById('lblCopper');
        this.lblBronze = document.getElementById('lblBronze');
        this.lblSilver = document.getElementById('lblSilver');
        this.lblGold   = document.getElementById('lblGold');
        this.lblPlat   = document.getElementById('lblPlatinum');
        this.lblDiamo  = document.getElementById('lblDiamond');
        this.lblMaster = document.getElementById('lblMaster');
        this.lblSwift  = document.getElementById('lblSwift');

        this.slideCopper = document.getElementById('slideCopper');
        this.slideBronze = document.getElementById('slideBronze');
        this.slideSilver = document.getElementById('slideSilver');
        this.slideGold   = document.getElementById('slideGold');
        this.slidePlat   = document.getElementById('slidePlatinum');
        this.slideDiamo  = document.getElementById('slideDiamond');
        this.slideMaster = document.getElementById('slideMaster');
        this.slideSwift  = document.getElementById('slideSwift');

        this.Submit = document.getElementById('submit-rs');
        this.Reset  = document.getElementById('reset-rs');

        this.getValues();

        this.Submit.addEventListener('click', event => {
            this.eventController.sendRankedSliders(
                this.slideCopper.value, this.slideBronze.value,
                this.slideSilver.value, this.slideGold.value,
                this.slidePlat.value,   this.slideDiamo.value,
                this.slideMaster.value, this.slideSwift.value
            )
        });

        this.Reset.addEventListener('click', event => {
            this.eventController.sendRankedSliders(1, 1, 1, 1, 1, 1, 1, 1);
            this.getValues();
        });
    }

    getValues() {
        const slide = this.eventController.recieveRankedSliders();
        this.slideCopper.value = slide.copper; this.lblCopper.innerHTML = slide.copper;
        this.slideBronze.value = slide.bronze; this.lblBronze.innerHTML = slide.bronze;
        this.slideSilver.value = slide.silver; this.lblSilver.innerHTML = slide.silver;
        this.slideGold.value   = slide.gold;   this.lblGold.innerHTML   = slide.gold;
        this.slidePlat.value = slide.platinum; this.lblPlat.innerHTML = slide.platinum;
        this.slideDiamo.value = slide.diamond; this.lblDiamo.innerHTML = slide.diamond;
        this.slideMaster.value = slide.master; this.lblMaster.innerHTML = slide.master;
        this.slideSwift.value  = slide.swift;  this.lblSwift.innerHTML  = slide.swift;
    }
}