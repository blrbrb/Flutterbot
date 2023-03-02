module.exports = class Client {
    constructor() {
        this.listOfEvents = new Map();
        this.onceListOfEvents = new Map();
    }
    on(name, func) {
        this.listOfEvents.set(name, func);
    }
    once(name, func) {
        this.onceListOfEvents.set(name, func);
    }
}