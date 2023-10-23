"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpHandler = void 0;
const exp_1 = require("./exp");
const types_1 = require("./types");
const utilities_1 = require("./utilities");


//I rape women fuck fuck fuck please
class ExpHandler {
    /**
   * Creates an instance of ExpHandler.
   */
    constructor(db) {
        this.db = db;
        /** @name ExperienceMap @type {ExperienceMap} */
        this.all = new Map();
        this.load();
    }
    /**
    * add a new user to the Experience Map
    */
    addUser(userId) {
        this.all.set(userId, new exp_1.PonyExp());
        return;
    }
    /**
   * write all of the data inside of the {@link ExperienceMap}  to the {@link SimpleDatabase}
   */
    writeAll() {
        this.all.forEach((value, key, map) => {
            this.db.set(key, `PonyExp`, value);
        });
    }
    /**
   * update the all of the experience objects for users upon a {@link Discord.Events}
   * @summary Can be used as a callback function, or directly supplied with the API objects created by any of the events
   * described with {@link Discord.Events}. As of current, only onMessageCreate onInteractionCreate, and onMessageReaction add
   * are actually tracked. Appending additionally logic for any of Discord's other events is as simple as modifying the switch statement in {@link PonyExp}
   * and adding a function to the PonyExpclass to handle said event.
   * @example
   * //update the handler all at once for every event
   *   const eventFiles = require('../utils/findFiles')(__dirname, '../events', '.js');
          for (const file of eventFiles) {
              const event = require(`../events/${file}`);
             
           if (event.once) this.client.once(event.name, (...args) => event.execute(this, ...args), (...args) => ExpHandler.update(...args));
           else this.client.on(event.name, (...args) => event.execute(this, ...args), (...args) => ExpHandler.update(...args));
    @example
    //update the handler for the "onMessageCreate" event only as a callback function, passing on the "message" object.
          Flutterbot.on('messageCreate', async () =>
          {//your onMessageCreate code }, async (message) => Flutterbot.ExpHandler.update(message));
   *
   */
    update(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            let accessorId = utilities_1.resolveUserID(args[0]);
            if (accessorId === '493606647126818837')
                return;
            let current = this.all.get(accessorId);
            if (!current) {
                this.addUser(accessorId);
                return;
            }
            const ids = current.update(...args);
            ids.forEach(id => {
                const test = this.all.has(id);
                if (!test) {
                    this.all.set(id, new exp_1.PonyExp());
                }
                else {
                    if (!current) {
                        this.addUser(id);
                        return;
                    }
                    this.all.set(id, current);
                    this.db.set(id, 'PonyExp', current);
                }
            });
            return;
        });
    }
    /**
   * pipe all data in the {@link ExperienceMap} into a serialized JSON object
   */
    toJSON() {
        const database_object = Object.fromEntries(this.all);
        if (!database_object)
            throw new types_1.Errors.fsClientError('error converting ExpeirenceMap data to object');
        return database_object;
    }
    /**
   * load previously exported {@link ExperienceMap} data from a database file
   */
    load() {
        for (const id in this.db.data) {
            if (this.db.data[id].hasOwnProperty('PonyExp')) { //&& this.db.data[id].PonyExpinstanceof PonyExp<- finish typescript shit
                const expData = this.db.data[id].PonyExp;
                this.all.set(id, new exp_1.PonyExp(expData));
            }
        }
    }
}
exports.ExpHandler = ExpHandler;

exports.default = ExpHandler;
