import EventController from '../controllers/EventController.js'

export default class EventView {
    constructor() {
        this.eventController = new EventController();
        

        //Página
        this.Poster = document.getElementById('imgPoster');
        this.Info = document.getElementById('txtInfo');
        this.Buttons = document.getElementById('divBtn');
        this.Gauge = document.getElementById('divGauge');
        this.About = document.getElementById('txtAbout');
        this.Map = document.getElementById('imgMap');
        try {
            this.Dists = document.getElementById('frmDists');
        } catch (e) {}

        //Form Pop-up
        try {
            this.Form = document.getElementById('frmRegister');
            this.Runners = document.getElementById('frmRunners');
            this.Message = document.getElementById('mdlRegisterMessage');
        } catch (e) {}

        this.getContent();
    }

    getContent() {
        var id = window.location.search.replace('?id=', '');
        this.eventController.findContent(this.Poster, this.Info, this.Buttons, this.Gauge, this.About, this.Map, id, this.Dists);
    }
}