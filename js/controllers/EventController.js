import EventModel from "../models/EventModel.js"

export default class EventController {
    constructor() {
        this.eventModel = new EventModel();
        this.eventModel.isToday();
    }

    createEvent(name, edition, country, city, date, time, capacity, price, d5K, d10K, d21K, d42K, race, walk, poster, map, about) {
        this.eventModel.create(name, edition, country, city, date, time, capacity, price, d5K, d10K, d21K, d42K, race, walk, poster, map, about);
    }

    checkEdition(name, country, city, time, capacity, price, d5K, d10K, d21K, d42K, race, walk, poster, map, about) {
        return this.eventModel.searchEdition(name, country, city, time, capacity, price, d5K, d10K, d21K, d42K, race, walk, poster, map, about);
    }

    searchEvent(name, country, city, selected, d5K, d10K, d21K, d42K, race, walk, area) {
        this.eventModel.search(name, country, city, selected, d5K, d10K, d21K, d42K, race, walk, area);
    }

    findContent(poster, info, buttons, gauge, about, map, id, dists) {
        this.eventModel.displayContent(poster, info, buttons, gauge, about, map, id, dists);
    }

    enroll(dist, run, id) {
        this.eventModel.addRunner(dist, run, id);
    }

    importEvents(opsEvent, status) { //Importar eventos
        this.eventModel.getEvents(opsEvent, status)
    }

    importRunners(opsRunner, eventId) {
        this.eventModel.getRunners(opsRunner, eventId)
    }

    importDistances(lbDist, eventId) { // Importar distâncias
        this.eventModel.getDistances(lbDist, eventId)
    }

    exportToLeaderBoard(eventId, runnerId, time) {
        this.eventModel.addToLeaderboard(eventId, runnerId, time)
    }

    importFromLeaderboard(eventId, dists, tBody) { //Importar Leaderboard
        this.eventModel.getFromLeaderboard(eventId, dists, tBody)
    }

    closeEvent(id) {
        this.eventModel.isOver(id);
    }

    sendRankedSliders(copper, bronze, silver, gold, plat, diamond, master, swift) {
        this.eventModel.updateRankedSliders(
            parseFloat(copper), parseFloat(bronze), parseFloat(silver), parseFloat(gold),
            parseFloat(plat), parseFloat(diamond), parseFloat(master), parseFloat(swift))
    }

    recieveRankedSliders() {
        return this.eventModel.getRankedSliders();
    }

    getRunners(eventId) {
        return this.eventModel.getAll()[eventId].runners;
    }
}