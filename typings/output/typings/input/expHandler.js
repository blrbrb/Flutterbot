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
exports.expHandler = void 0;
const exp_1 = require("./exp");
const utilities_1 = require("./utilities");
class expHandler {
    /**
   * Creates an instance of expHandler.
   *
   * @constructor
   * @param {SimpleDatabase} db
   */
    constructor(db) {
        this.db = db || undefined;
        /** @name all @type {ExperienceMap} */
        this.all = new Map();
        this.load();
    }
    /**
   * add a new user to the Experience Map
   * @name addUser
   * @param {SnowfKale} userId
   */
    addUser(userId) {
        this.all.set(userId, new exp_1.PonyExp());
        return;
    }
    /**
   * write all of the data inside of the Expeirence Map to the database
   * @returns {void}
   * @name writeAll
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
             
           if (event.once) this.client.once(event.name, (...args) => event.execute(this, ...args), (...args) => expHandler.update(...args));
           else this.client.on(event.name, (...args) => event.execute(this, ...args), (...args) => expHandler.update(...args));
    @example
    //update the handler for the "onMessageCreate" event only as a callback function, passing on the "message" object.
          Flutterbot.on('messageCreate', async () =>
          {//your onMessageCreate code }, async (message) => Flutterbot.expHandler.update(message));
   *
   * @name update
   * @returns {void}
   * @param {...{}\} args
   */
    update(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            let accessorId = (0, utilities_1.resolveUserID)(args[0]);
            if (accessorId === '493606647126818837')
                return;
            let current = this.all.get(accessorId);
            if (!current) {
                this.addUser(accessorId);
                return;
            }
            const ids = current.update(...args);
            //loop through all of the PonyExpobjects in the handler,save, new obj if undefined
            ids.forEach(id => {
                const test = this.all.has(id);
                if (!test) {
                    this.all.set(id, new exp_1.PonyExp());
                }
                else {
                    console.log('id found');
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
   * pipe all data in the Expeirence Map into a serialized JSON object
   * @name toJSON
   * @returns {object}
   */
    toJSON() {
        const database_object = Object.fromEntries(this.all);
        //console.log(); 
        return database_object;
    }
    /**
   * load previously exported Expierence Map data from a database file
   * @name load
   * @returns {void}
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
exports.expHandler = expHandler;
;
exports.default = expHandler;
