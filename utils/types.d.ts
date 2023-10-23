import { Guild, GuildEmoji, GuildMember,Snowflake, Collection, Invite, Message, NonThreadGuildBasedChannel, Role, User, APIApplicationCommand, MessageReaction } from "discord.js";
import  {Utilities}  from "./utilities";
import PonyExp from "./exp";

/**
 * property map/json representing a core database object. can contain any datatype, indexed by string
 */
 export interface fsObject{[key: string]: any;}



/**
 * container representing an array of Fluttershy's responses
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


export type server_quotes = Array<fsMemberQuote>;
export type fsSnowflakeArray = Array<Snowflake>;
export type fsCommands = Collection<string,APIApplicationCommand>;

/**
 *  contains all of the data created by Flutterbot 
 *  associated with a {@link Guild} 
 */
 export class fsGuild implements fsObject
{
    /**
     * The minimum required age in days that new users must have existed for in a guild 
     * in order to not be marked with a quarantine role 
     * @memberof fsGuild
     */
    newMemberMinimumAge: number;
    /**
     * The default color for all embeds in a guild 
     * @memberof fsGuild
     */
    embedColor: number; 
    /**
     * The default number of seconds that must pass before a command or interaction can be used again
     * @memberof fsGuild
     */
    defaultCoolDown: number;
    /**
     * Roles that have been set to private in the guild. 
     * (won't appear with /roles, or /getrole)
     * @memberof fsGuild
     */
    privateRoles: fsSnowflakeArray;
     /**
     * The Guild's unique discord Snowflake ID
     * @memberof fsGuild
     */
    id:Snowflake;

    constructor(id:Snowflake, args:{newMemberMinimumAge:number,embedColor:number,defaultCoolDown:number, privateRoles:fsSnowflakeArray}=
                {newMemberMinimumAge:0, embedColor:0, defaultCoolDown:2, privateRoles:[]})
   

    /**
     * Add a role to a guild's list of {@link privateRoles}
     * @param {Snowflake} [roleID] the role's unique discord Snowflake ID
     */
    addPrivateRole(roleID:Snowflake): void
    
}

/**
 * contains all of the data created by Flutterbot associated with a {@link User}
 *  @export
 * @class fsUser
 * @implements {fsObject}
 */
 export class fsUser implements fsObject 
{
    /**
     * The user's unique discord {@link Snowflake} ID
     *  @memberof fsUser
     */
    id:Snowflake; 
    /**
     * an array of the user's [quotes]({@link fsMemberQuote}) in a guild 
     *  @memberof fsUser
     */
    server_quotes: server_quotes;
    /**
    * The user's [expeirence points]({@link PonyExp})
    *  @memberof fsUser
    */
    PonyExp: PonyExp;
    /**
     * Creates an instance of fsUser.
     * 
     * @param {fsUserIDResolvable} id
     * @param {{PonyExp:PonyExp, server_quotes:server_quotes}} [args={PonyExp:new PonyExp(), server_quotes:[]}]
     * @memberof fsUser
     */
    constructor(id:fsUserIDResolvable, args:{PonyExp:PonyExp, server_quotes:server_quotes}={PonyExp:new PonyExp(), server_quotes:[]})
   

    /**
     * Add a new quote to the user
     * 
     * @memberof fsUser
     * @param {fsMemberQuote} quote 
     */
    addQuote(quote:fsMemberQuote): void
    

}

 export type fsUserIDResolvable = User | string | GuildMember| Message | MessageReaction;
 export type fsGuildIDResolvable = Guild | GuildMember | string | Role | GuildEmoji | NonThreadGuildBasedChannel | Invite;
 export type fsIDResolvable = fsUserIDResolvable | fsGuildIDResolvable; 



/**
 * Object representing the number of sent and recieved reactions a user has 
 */
 export interface ReactionData
{
    /**
     * the total number of reactions a user has sent 
     */
    sent:number, 
    /**
     * the total number of reactions a user has recieved
     */
    recieved:number
}
/**
 * Object representing the number of sent and recieved reactions a user has. Component on 
 * 
 * @class ReactionData
 * @implements {ReactionData}
 */
 export class ReactionData implements ReactionData
{
     /**
     * the total number of reactions a user has recieved
     * @memberof ReactionData
     */
    sent:number; 
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
    constructor(sent:number, recieved:number)
    
}

export type cooldowns= Collection<string, Collection<any, any>>


/**
 * Container representing a user's expeirence data
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
 * @class fsMemberQuote
 * @implements {fsMemberQuote}
 */
 export class fsMemberQuote implements fsMemberQuote
{ /**
   * username
   * @memberof fsMemberQuote
  */
   name: string; 
/**
 * YY/MM/DD
 * @memberof fsMemberQuote
 */
date:string; 
/**
 * the {@link Snowflake} Guild id of the guild the user is being quoted from
 * @memberof fsMemberQuote
 */
guild:string; 
/**
 * the quote
 * @memberof fsMemberQuote
 */
quote:string;

/**
 * Creates an instance of fsMemberQuote.

 * @param {string} [name] username
 * @param {string} [date] YY/MM/DD
 * @param {string} [id] the User's Discord id; 
 * @param {string} [guild] the current guild id 
 * @param {string} [quote] the quote
 * @memberof fsMemberQuote
 */
constructor(name:string, date:string, id:string, guild:string, quote:string)
    {
        this.guild = guild; 
        this.date = date; 
        this.id = id; 
        this.name=name; 
        this.quote = quote;
    }
}
export class fsError extends Error {
    original: Error;
    constructor(message:string,error?:Error) 
    /**
     * summary of what caused the error
     * @return {string} 
     * @memberof fsError
     */
    what(): string
    
    /**
     * string containing the method name, filename, and line an error originated from
     * @return {(number | null)}
     * @memberof fsError
     */
    where():string | null 
    /**
     * Fetch the original Error class / instance that this 
     * error originated from 
     * 
     * @return  {Error}
     * @memberof fsError
     */
    origin(): Error
    
} 
export enum fsSnowflakeType
{
    User=0,
    Bot=1, 
    "Server-Member"=2, 
    Channel=3, 
    Role=4,
    Emoji=5, 
    Message=6,
    Guild=7

}
export namespace Errors{
export enum type 
{
    Permissions=0,
}

export class fsDatabaseError extends fsError
{
    
constructor(message:string,error?:Error)
   
}
export class fsPermissionsError extends fsError
{
    constructor(message:string,error?:Error)
    
}
export class fsClientError extends fsError
{
    constructor(message:string,error?:Error)
    
}
export class fsAPIError extends fsError
{
    constructor(message:string,error?:Error)
   
}
export class fsTypeError extends fsError
{
    constructor(message:string,error?:Error)
   
}
export class fsLockBoxError extends fsError
{
    constructor(message:string,error?:Error)
   
}

}




