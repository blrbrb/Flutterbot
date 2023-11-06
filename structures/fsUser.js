"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

exports.default = exports.ReactionData = exports.fsServerQuote = void 0;
const utilities_1 = require("../utils/utilities");
const {SimpleDatabase} = require('../utils/SimpleDatabase');
const {Snowflake} = require('discord.js');
//import { PonyExp } from "../types/index";

/**
 * Object representing a quote saved to a guild 
 * 
 * @type {fsServerQuote} */
class fsServerQuote 
{
    /**
     * Create a new server quote 
     * @param {string} quote 
     * @param {string} date 
     * @param {Snowflake} UserId 
     * @param {Snowflake} GuildId 
     */
    constructor(quote, date, UserId, GuildId)
    {
        if (typeof quote === 'undefined' ||
        typeof UserId === 'undefined' || 
        typeof GuildId === 'undefined' ) {
            throw new Error('Both User Id, guild Id, and quote are required');
        }
        this.quote = quote; 
        this.date = date; 
        this.UserId = UserId; 
        this.GuildId = GuildId; 
    }
}

exports.fsServerQuote = fsServerQuote;

/**
 * Object representing the number of sent and recieved reactions a user has. Component on
 * @class ReactionData
 * 
 */
class ReactionData {
    /**
     * the total number of reactions a user has sent
     * @memberof ReactionData
     */
    /**
     * Creates an instance of ReactionData.
     *
     * @param {number} [sent]
     * @param {number} [recieved]
     * @memberof ReactionData
     */
    constructor(sent, recieved) {
        /**@type {number} */
        this.sent = sent || 0;
         /**@type {number} */
        this.recieved = recieved || 0;
    }
}
exports.ReactionData = ReactionData;


/**
 * contains all of the data created by Flutterbot associated with a [User]({@link https://old.discordjs.dev/#/docs/discord.js/main/class/User}) 
 * 
 */
class fsUser {
    /**
     * Creates an instance of fsUser.
     *
     * @param {import("../types/index").fsUserIDResolvable} UserId or Discord API object that can be resovled down into a User
     * @param {PonyExp} [exp] 
     * @param {fsServerQuote}
     * @memberof fsUser
     */
    constructor(UserId, exp=new PonyExp(), quotes=[]) {
        if(quotes && Array.isArray(quotes))
         this.server_quotes = quotes;
        else { console.log(quotes);
          this.server_quotes = []; }
        this.PonyExp = exp
        if (!UserId)
            throw new Error('cannot instantize fsUser with a valid User id!');
        else
            this.UserId = utilities_1.resolveUserID(UserId);
    }
    /**
     * Add a new quote to the user
     *
     * @param {fsMemberQuote} quote
     * @return {void} 
     */
    addQuote(quote) {
        this.server_quotes.push(quote);
        return;
    }
}
exports.fsUser = fsUser; 


exports.default = fsUser; 