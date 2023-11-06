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
exports.PonyExp = exports.ExpHandler = exports.ReactionData = exports.ExpHandler  = void 0;
const discord_js_1 = require("discord.js");
const utilities_1 = require("./utilities")
const types_1 = require("../structures/types");



 /** @typedef {Map<Snowflake,PonyExp>} ExperienceMap */

/**
 * manages updating, and calculating expeirence points for all users. Updated in the main bot loop
 * - Author: [Ellypony]({@link "https://github.com/blrbrb"})
 * 
 * --- 
 * See: {@link PonyExp}
 */
class ExpHandler {
   /**
   * Creates an instance of ExpHandler.
   * @param {SimpleDatabase} db
   */
    constructor(db) {
        /** @type {SimpleDatabase} */ 
        this.db = db;
        /**@type {ExperienceMap} */
        this.all = new Map();
        this.load();
       
    }
    /**
    * add a new user to the Experience Map
    * @param {Snowflake} UserId 
    * @return {void}
    */
    addUser(UserId) {
        this.all.set(UserId, new PonyExp());
        return;
    }
    /**
    * write all of the data inside of the {@link ExperienceMap} to the {@link SimpleDatabase}
    * @return {void}
    */
    writeAll() {
        this.all.forEach((value, key, map) => {
            this.db.set(key, `PonyExp`, value);
        });
        return;
    }
   /**
   * update the all of the experience objects for users upon a {@link Discord.Events}
   * 
   * @summary Can be used as a callback function, or directly supplied with the API objects created by any of the events
   * described with {@link Discord.Events}. As of current, only onMessageCreate onInteractionCreate, and onMessageReaction add
   * are actually tracked. Appending additionally logic for any of Discord's other events is as simple as modifying the switch statement in {@link PonyExp}
   * and adding a function to the PonyExpclass to handle said event.
   * 
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
            let accessorId;

            //if the event is a message reaction, fetch the ID of the original author of the reaction 
            //via the User argument. bc it's not a property on MessageReaction
            
            if(args[0] instanceof discord_js_1.MessageReaction){
               
                accessorId = utilities_1.resolveUserID(args[1]); 
                
            }
            else
            {
                accessorId = utilities_1.resolveUserID(args[0]); 
            }
            
            let current = this.all.get(accessorId); 
            if (!current) {
                console.log(`adding user ${accessorId} to exp map`);
                this.addUser(accessorId);
                return;
            }
            
            const ids = current.update(...args);
            if(!Array.isArray(ids))
                return;
            ids.forEach(id => {
                const test = this.all.has(id);
                if (!test) {
                    this.all.set(id, new PonyExp());
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
    * load previously exported {@link ExperienceMap} data from the database file 
    * @return {void}
    */
    load() {
        for (const id in this.db.data) { 
          
            if (this.db.data[id].hasOwnProperty('PonyExp')) { //&& this.db.data[id].PonyExpinstanceof PonyExp<- finish typescript shit
                const expData = this.db.data[id].PonyExp;
                this.all.set(id, new PonyExp(expData));
            }
        }
    }
}
exports.ExpHandler = ExpHandler;


/**
 * @typedef {object} reactiondata
 * @property {number} sent Number of sent reactions 
 * @property {number} received Number of sent reactions 
 * @see ReactionData
 * @see PonyExp
 */

/**
 * Object representing the number of sent and received reactions a user has. Component on {@link PonyExp}
 * 
 * ---
 *  See: *type {@link reactiondata}*
 * 
 * ---
 * @type {reactiondata}
 */
class ReactionData {
    /**
     * Creates an instance of ReactionData.
     *
     * @param {number} [sent]
     * @param {number} [received]
     */
    constructor(sent, received) {
        if(sent && typeof(sent) ==='number' && sent > 0)
         this.sent = sent;
        else 
         this.sent = 0; 
        if(received && typeof(received) ==='number' && received >0)
         this.received = received;
        else 
        this.received = 0; 
    }
}

exports.ReactionData = ReactionData;

/**
 * @typedef {object} ponyexp
 * @property {number} exp current expeirence points 
 * @property {number} totalExp lifetime expeirence points
 * @property {number} required expeirence points needed to reach next level
 * @property {number} level current level
 * @property {reactiondata} reacts number of reactions given, received
 * @property {number} cmds number of commands used (ChatInput and prefix)
 * @property {number} msg number of messages sent.
 * @property {number} amongus number of times the word "amongus" has been said 
 * 
 */

/**class representing a user's experience data. 
 * 
 * --- 
 * 
 * See *type {@link ponyexp}, {@link ExperienceMap}*
 * 
 * ---
 */
class PonyExp {

    /**
     * creates an instance of PonyExp
     * 
     * @param {ponyexp} Data 
     */
    constructor(Data) {
       
        if (Data) {
            this.msg = Data.msg;
            this.reacts = Data.reacts;
            this.cmds = Data.cmds;
            this.required = Data.required;
            this.d7oomyscore = Data.d7oomyscore;
            this.amongus = Data.amongus;
            this.total_exp = Data.totalExp
            this.experience = Data.experience;
            this.level = Data.level;
        }
        else {
            this.msg = 0;
            this.reacts = new ReactionData(0, 0);
            this.cmds = 0;
            this.required = 0;
            this.d7oomyscore = 0;
            this.amongus = 0;
            this.experience = 0;
            this.total_exp = 0;
            this.level = 0;
        }
        this.required = 0 + this._calculateRequired();
    }
    /**
     * add expeirence points
     * @param {number} pts 
     * @returns 
     */
    addExp(pts) {
        this.experience += pts;
        this.total_exp += pts;
        return;
    }
    /** called from the [ExpHandler]({@link ExpHandler}), updates values in the experience object.
    * 
    * 
    * @name update
    * @param {...{}} args
    * @returns {{\}\}
    */
    update(...args) {
        //this will execute first always, outside / after the switch To make sure leveling is updated properly.
        if (this.experience >= this.required) {
            this.level += 1;
            this.experience = 0;
            this.required = this._calculateRequired();
        }

            if(args.length = 1){
    
                if (args[0] instanceof discord_js_1.Message) {
                    //will exec for msg create, delete, or inter. create.
                    return this._onMessageCreate(args[0]);
                   
                }
                else if (args[0] instanceof discord_js_1.CommandInteraction) { 
                    return this._onInteractionCreate(args[0]);
                } 
                else if(args[0] instanceof discord_js_1.Client)
                {
                    //return empty array if the first arg is a client.
                    //this means the event is bot startup.
                    return [];
                }
            }
            //continue to append more else if when adding more PonyExpchecks and updates in different events 
            //bro was yanderedev. 
            //break;
            else if(args.length = 2){
                //for now, te only event that sends two arguments is onMessageReactionAdd
            
                return this._onMessageReaction(args[0], args[1]);
            }
            else return [];
                //throw new Error(`Invalid arguments ${args[0].constructor.name}, and ${args[1].constructor.name}`);
        
       
    }
    _calculateRequired() {
        const baseExperience = 100;
        const experienceMultiplier = 1.4;
        const experienceRequired = Math.round(baseExperience * Math.pow(experienceMultiplier, this.level - 1));
        return experienceRequired;
    }
    _onMessageCreate(message) {
        let experience = 10;
        this.msg += 1;
        const messageLength = message.content.length;
        experience += Math.min(messageLength, 100); // Limit extra points for long messages
        if (/\bhttps?:\/\/\S+\b/.test(message.content)) {
            experience += 20;
        }
        if (/https?:\/\/(?:media\.)?giphy\.com\/(?:media|embed)\/\w+\/\w+/.test(message.content)) {
            experience += 15;
        }
        if (message.content.includes('among us')) {
            this.amongus += 1;
        }
        if (message.content.includes('\n')) {
            experience += 30 * (message.content.split('\n').length - 1);
        }
        this.addExp(experience);
        return [message.author.id];
    }
    _onInteractionCreate(interaction) {
        this.addExp(25);
        this.cmds += 1;
       
        return [interaction.user.id];
    }
    _onMessageReaction(reaction, user) {
        let anim_multiplier = reaction.emoji.animated ? 55 : 1;
        let skull_multiplier = 0;
        let recieverId;
        //this is entierly non-objective. Extra points if the emoji's name has "fluttershy" in it. 
        if (reaction.emoji.name)
            skull_multiplier = reaction.emoji.name.includes('fluttershy') ? 15 : 1;
        //if the emoji has a snowflake ID, it's a guild ID 
        let guildemoji_multiplier = reaction.emoji.id ? 20 : 1;
        //all emojis get a rand base point value from 1 to 5 
        let base = 1 + Math.random() * 3;
        const seed = (Math.random() * 10) + 100;
        const multiplier = Math.floor(base * (anim_multiplier + skull_multiplier + guildemoji_multiplier));
        //increment the reactions given counter
        this.reacts.sent += 1;
        //Set the new values, and save the object 
        this.experience += multiplier;
        this.total_exp += multiplier;
        if (reaction.message.author)
            recieverId = reaction.message.author.id; //fetch the user who has been reacted to
        if (recieverId === user.id || recieverId === undefined) {
            return [user.id];
        }
        else {
            return [user.id, recieverId];
        }
    }
   /**
   * pipe all of this instances' PonyExpvalues into an object.
   * @date 10/13/2023 - 5:05:26 AM
   * @name toJSON
   * @returns {object}
   */
    toJSON() {
        return Object(this);
    }
}
exports.PonyExp = PonyExp;

exports.default = PonyExp;
