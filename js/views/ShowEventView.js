import EventController from '../controllers/EventController.js'

export default class EventView {
    constructor() {
        this.eventController = new EventController();
        
        this.Poster = document.getElementById('imgPoster');
        this.Info = document.getElementById('txtInfo');
        this.Buttons = document.getElementById('divBtn');
        this.Gauge = document.getElementById('divGauge');
        this.About = document.getElementById('txtAbout');
        this.Map = document.getElementById('imgMap');

        this.getContent();
    }

    getContent() {
        var id = window.location.search.replace('?id=', '');
        this.eventController.findContent(this.Poster, this.Info, this.Buttons, this.Gauge, this.About, this.Map, id);
    }
}