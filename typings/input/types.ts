import { Guild, GuildEmoji, GuildMember,Snowflake, Collection, Invite, Message, NonThreadGuildBasedChannel, Role, User } from "discord.js";
import { removeEveryoneMentions, resolveGuildID } from "./utilities";
import * as Discord from 'discord.js'; 
import fs from "fs";

/**
 * property map/json representing a core database object. 
 * @export
 * @interface fsObject
 */
export interface fsObject{[key: string]: any;}

/**
 * container representing an array of Fluttershy's responses
 * @export
 * @interface fsLangTemplate 
 */
export interface fsLangTemplate  {[key:string]: string;};

export const NekoNokaUrl = "https://github.com/NekoNoka/";
export const EllyPonyUrl ="https://github.com/blrbrb";

export const DataTypes: fsObject = {
    Undefined:0,
    Number:1,
    String:2,
    Array:3,
    Boolean:4,
    Object:5,
    Function:6,
    Unknown:7
};    



export class fsGuildObject implements fsObject
{
    id: fsGuildIDResolvable; 
    
    constructor(id:fsGuildIDResolvable)
    {
        this.id = resolveGuildID(id);
    }

}

export type fsUserIDResolvable = User | string | GuildMember| Message;
export type fsGuildIDResolvable = Guild | GuildMember | string | Role | GuildEmoji | NonThreadGuildBasedChannel | Invite;
export type fsIDResolvable = fsUserIDResolvable | fsGuildIDResolvable; 

/**
 * Object representing the number of sent and recieved reactions a user has 
 *
 * @export
 * @interface ReactionData
 * @typedef {Object} ReactionData
 */
export interface ReactionData
{
    /**
     * the total number of reactions a user has sent 
     * @type {number}
     */
    sent:number, 
    /**
     * the total number of reactions a user has recieved
     * @type {number}
     */
    recieved:number
}
/**
 * Object representing the number of sent and recieved reactions a user has. Component on 
 * {@link PonyExp}
 * @export
 * @class ReactionData
 * @implements {ReactionData}
 */
export class ReactionData implements ReactionData
{
     /**
     * the total number of reactions a user has recieved
     * @type {number}
     */
    sent:number; 
    /**
     * the total number of reactions a user has sent 
     * @type {number}
     */
    recieved:number;
    constructor(sent:number, recieved:number)
    {
        this.sent = sent; 
        this.recieved = recieved;
    }
}

export type cooldowns= Collection<string, Collection<any, any>>


/**
 * Container representing a user's expeirence data
 * @export
 * @interface PonyExpData
 * @typedef {PonyExpData}
 */
export interface PonyExpData  {
    /**
    * @property {number} level the current level
     */
    level:number; 
    /**
    * @property {number} experience current experience points
    */
    experience: number; 
    /**
    * @property {number} amongus number of times the user has said "among us"
    */
    amongus: number; 
    /**
    * @property {number} msg total number of messages sent
    */
    msg:number; 
    /**
    * @property {number} d7oomyscore doomy
    */
    d7oomyscore:number; 
    /**
    * @property {ReactionData} reacts The number of times a user has reacted to, or has been given a reaction {@link ReactionData}
    */
    reacts: ReactionData;
    /**
    * @property {number} cmds number of times the user has called a chat input or application command
    */
    cmds:number;
    /**
    * @property {number} amongus lifetime exp accumulation
    */
    total_exp:number;
    /**
    * @property {number} required expeirence points required to reach the next level
    */
    required:number;  
}

export interface fsMemberQuote
{
    /**
     * The name of GuildMember
     * 
     *
     * @type {string}
     */
    name:string; 
    /**
     * the date the quote was recorded 
     * @type {string}
     */
    date:string; 
    /**
     * the quote
     *
     * @type {string}
     */
    quote:string
    /**
     * The Snowflake id of the GuildMember. See {@link fsUserIDResolvable} / {@link Snowflake}
     *
     * @type {string}
     */
    id:string; 
    /**
     * The Snowflake id of the Guild. See {@link fsGuildIDResolvable} / {@link Snowflake}
     *
     * @type {string}
     */
    guild:string;

}

/**
 * Object representing a quote from a server member
 *
 * @export
 * @class fsMemberQuote
 * @typedef {fsMemberQuote}
 * @implements {fsMemberQuote}
 */
export class fsMemberQuote implements fsMemberQuote
{
    constructor(name:string, date:string, id:string, guild:string, quote:string)
    {
        this.guild = guild; 
        this.date = date; 
        this.id = id; 
        this.name=name; 
        this.quote = quote;
    }
}
