import utilities from '../utils/utilities';
import { User, Guild, GuildMember, Channel, Message, Interaction, APIApplicationCommand, Role, 
GuildEmoji, Collection, NonThreadGuildBasedChannel, Invite,Snowflake,GuildEmoji, MessageReaction, GuildMemberEditOptions, Emoji, CommandInteraction, BaseGuildTextChannel, BaseInteraction, GuildResolvable, UserResolvable, ContextMenuCommandInteraction,  } from 'discord.js';

import DisTube from 'distube';
import { APIApplicationCommand, Collection, Utils, GuildEmoji, Channel, Snowflake } from 'discord.js';
import { ExpHandler } from '../utils/ExpHandler';
import { SimpleDatabase } from '../utils/SimpleDatabase'; 
import  AngelBunny  from '../guardianAngel/AngelBunny';
import { LockBox } from '../utils/LockBox';
import { PonyExp } from '../utils/exp';
import { fsError, fsSnowflakeType, Errors, fsMemberQuote} from '../structures/types';
import { shy,Flutterbot} from '../client/Flutterbot';


export type fsUserIDResolvable = UserResolvable;
export type fsGuildIDResolvable = GuildResolvable;
export type fsIDResolvable = fsUserIDResolvable | fsGuildIDResolvable | CommandInteraction | ContextMenuCommandInteraction
export class Shy extends Client {

       
      
    Log: Function;
   
    collectors: Map<any, any>;
  
    GuildCooldowns: Map<Snowflake, fsCoolDowns>;
    
    SlashCommands: fsCommands;
   
    PrefixCommands:fsCommands;

    LastFm: any;
  
    DB: SimpleDatabase;
    
    LockBox: LockBox;
    
    AngelBunny: AngelBunny;
    
    DisTube: DisTube;
    
    ExpHandler: ExpHandler;
    
    constructor();
    getDefaultCoolDown(serverId: fsGuildIDResolvable): number;
    /**
     * The bot client's main loop
     * @return {Promise<void>}
     * @memberof Shy
     */
    updateEvents(): Promise<void>;
    /**
     * You know she's not a tree right?
     * @memberof Shy
     */
    start(): Promise<void>;
}
export type ReactionData =
{
sent:number; 
recieved:number;
}
export class Flutterbot extends Shy{
    DisTube: DisTube; 
    Log:Function; 
    imageFinder: Function;
    resolveId:Function;
    getsnowflakeType:Function;
    getextension:Function;
    isSnowflake: Function; 
    getArrayType: Function; 
    format:Function;
    formatSeconds:Function; 
    toTimezone:Function; 
    hasVoicePerms:Function; 
    isNsfwChannel:Function;
    langRand:Function; 
    removeEveryoneMentions:Function; 
    mediaSource:Function 
    formatytlink:Function 
    lockbox:Function 
    expHandler:class = ExpHandler;
    lastfm:Function
    AngelBunny:class = AngelBunny;
    log: Function 
    distube:class=DisTube;
    db:class=SimpleDatabase;
    slashcommands: fsCommands;
    prefixcommands: fsCommands;
   constructor(): Shy
    
   
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

export type fsGuildConfig = 
{
  
 newMemberMinumumAge: number; 
 embedColor: number; 
 defaultCoolDown: number; 
 privateRoles: Array<Snowflake>;

}
export type fsServerQuote =s
{
    quote:string; 
    date:string; 
    UserId: Snowflake;
    GuildId: Snowflake;
}
export type fsGuild =
{
    Id: Snowflake; 
    config: fsGuildConfig;

}
export type fsUser=
{
    Id:Snowflake; 
    quotes: fsServerQuote[];
    exp:PonyExp;
}

export type PonyExp =
{
    exp: number //current expeirence points 
    totalExp: number  //lifetime expeirence points
    required: number //expeirence points needed to reach next level
    level:number  //current level
    reactiondata: reacts //number of reactions given, received
    cmds:number //number of commands used (ChatInput and prefix)
    msg:number //number of messages sent.
    amongus:number //number of times the word "amongus" has been said 
}


declare class fsDatabaseError extends fsError
{
    
constructor(message:string,error?:Error)
   
}

interface fsUserArray implements fsSnowFlakeArray{

}

interface fsSnowflakeArray{[user:Snowflake]:User}


/**
 * container representing an array of Fluttershy's responses
 */
interface fsLangTemplate  {[key:string]: string;};
/**
 * Object representing the number of sent and recieved reactions a user has 
 */
interface ReactionData
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
 * Container representing a user's expeirence data
 */
interface PonyExpData  {
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
const NekoNokaUrl = "https://github.com/NekoNoka/";
const EllyPonyUrl ="https://github.com/blrbrb";
 

type fsCoolDowns= Collection<string, Collection<any, any>>
const enum Logcolors {
           
    "italic"="\x1B[3m" ,
    "reset"="\x1b[0m",
    "bright"= "\x1b[1m",
    "dim"= "\x1b[2m",
    "underscore"="\x1b[4m",
    "blink"="\x1b[5m",
    "reverse"="\x1b[7m",
    "hidden"="\x1b[8m",
  
    "black"="\x1b[30m",
    "red"="\x1b[31m",
    "green"="\x1b[32m",
    "yellow"="\x1b[33m",
    "blue"="\x1b[34m",
    "magenta"="\x1b[35m",
    "cyan"="\x1b[36m",
    "white"="\x1b[37m",
    "gray"="\x1b[90m",
    "grey"="\x1b[90m",
  
    "bgblack"="\x1b[40m",
    "bgred"="\x1b[41m",
    "bggreen"="\x1b[42m",
    "bgyellow"="\x1b[43m",
    "bgblue"="\x1b[44m",
    "bgmagenta"="\x1b[45m",
    "bgcyan"="\x1b[46m",
    "bgwhite"="\x1b[47m",
    "bggray"="\x1b[100m",
    "bggrey"="\x1b[100m"
}


type Logcolors = {         
    italic:"\x1B[3m" ;
    reset:"\x1b[0m";
    bright: "\x1b[1m";
    dim: "\x1b[2m";
    underscore:"\x1b[4m";
    blink:"\x1b[5m";
    reverse:"\x1b[7m";
    hidden:"\x1b[8m";
  
    black:"\x1b[30m";
    red:"\x1b[31m";
    green:"\x1b[32m";
    yellow:"\x1b[33m";
    blue:"\x1b[34m";
    magenta:"\x1b[35m";
    cyan:"\x1b[36m";
    white:"\x1b[37m";
    gray:"\x1b[90m";
    grey:"\x1b[90m";

    bgblack:"\x1b[40m";
    bgred:"\x1b[41m";
    bggreen:"\x1b[42m";
    bgyellow:"\x1b[43m";
    bgblue:"\x1b[44m";
    bgmagenta:"\x1b[45m";
    bgcyan:"\x1b[46m";
    bgwhite:"\x1b[47m";
    bggray:"\x1b[100m";
    bggrey:"\x1b[100m";
}
type fsMemberQuote = fsMemberQuote; 


interface fsMemberQuote 
{
    guild:Snowflake,
    tdate:string | Date;
    id:Snowflake;
    name:string;
    quote:string;
}
const enum fsDataTypes {
    Undefined=0,
    Number=1,
    String=2,
    Array=3,
    Boolean=4,
    Object=5,
    Function=6,
    Unknown=7
};    


declare interface PonyExpData  
{
msg:number; 
level:number;  
amongus:number;
d7oomyscore:number; 
cmds:number; 
required:number;
reacts: ReactionData
experience: number; 
total_exp:number;
}
type PonyExpData = {
    msg:number; 
    level:number;  
    amongus:number;
    d7oomyscore:number; 
    cmds:number; 
    required:number;
    reacts: ReactionData
    experience: number; 
    total_exp:number;
}  

interface fsMemberQuote
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



declare module "utils/SimpleDatabase" {
     class SimpleDatabase{
     constructor(filePath='',log:Function=Utilities.Log, debug_print:boolean) 
        debug_print: boolean;
         log: any;
         filePath: string;
         data: object;
        _printAcessInfo(Key: string | undefined, value: any, ID: any): void;
        /**
         * Private Class Method. Called by the database when modifying adding or removing propereties
         * in order to keep the database up to date and clean.
         * @name SimpleDatabase#_loadData
         * @returns {object} the loaded database
         */
        _loadData(): object | undefined 
        /**
         * Private Class Method. Called by the database each time a property is changed, added, or deleted
         * @name SimpleDatabase#_saveData
         * @returns {void}
         */
        _saveData(): void;
        /**
         * Modify a value in the database
         * @name SimpleDatabase#set
         * @param {string} key
         * @param {any} value
         * @returns {void}
         *
         */
        set(IDResolvable:fsIDResolvable, Key:string, value:any):void
        /**
         * @summary Set a key-value at the root of the database instead of attaching it to a discord API object.
         * Useful for things that aren't easily indexed by snowflakes.
         * @name SimpleDatabase#setAtRoot
         * @param {string} key
         * @param {any} value
         * @returns {void}
         */
        setAtRoot(key: string, value: any): void;
        /**
         * merge two class objects together, keeping and updating the contents of the old
         * @name SimpleDatabase#_updateObject
         * @param {object} New
         * @param {object} Old
         * @returns {object}
         */
        _updateObject(New:object, Old:object): object
        /**
         * Deletes a value from the database file.
         * @name SimpleDatabase#deleteEntry
         * @param {string} key
         * @returns {void}
         */
        deleteEntry(key:string):void 
        /**
         * sets the default cooldown time for a guild's configuration in the database file.
         * @name SimpleDatabase#setGuildCoolDown
         * @param {Discord.Snowflake} GuildResolvable
         * @param {number} cooldowntime
         * @returns {void}
         */
        setGuildCoolDown(GuildResolvable: Discord.Snowflake, cooldowntime: number): void;
        /**
         * updates, or creates a new value for a guild's configuration in the database file
         * @name SimpleDatabase#setGuildConfig
         * @param {Discord.GuildResolvable} GuildResolvable
         * @param {string} configKey
         * @param {any} value
         * @returns {void}
         */
        setGuildConfig(GuildResolvable:fsGuildIDResolvable, configKey:string, value:any): void
        /**
         * fetch the all of the configuration values from a guild's configuration in the database file.
         * @name SimpleDatabase#getGuildConfig
         * @param {Discord.GuildResolvable} GuildResolvable
         * @param {string} configKey
         * @returns {void | any}
         */
        getGuildConfig(GuildResolvable:fsGuildIDResolvable, configKey:string): void | any
        /**
         * Sets the embed color value for a guild's configuration in the database file.
         * @name SimpleDatabase#setGuildEmbedColor
         * @param {Discord.GuildResolvable} GuildResolvable
         * @param {number || string } color
         * @returns {void}
         */
        setGuildEmbedColor(GuildResolvable:fsGuildIDResolvable, color:number): void
        /**
         * get any value in the database
         * @name get
         * @param {string} key
         * @returns {any} value, or {@link false} upon failure to find an associated value.
         */
        get(key:string): any | false
        /**
         * @name has
         * Check to see if a guild already has data in the db file.
         * @summary important to make sure the app doesn't crash accessing data
         * that doesn't yet exist. IMPORTANT. Different from hasKey in the sense that
         * hasKey() will search the ENTIRE db tree for matches, not just the root of the json tree.
         * They aren't intercompatible because guild id's may appear elsewhere in the db file farther down
         * and conflate the results.
         * @param {GuildResolvable} GuildResolvable object that can be resolved into an {@link Discord.Snowflake}
         * see {@link GuildResolvable} and
         * @returns {true} if the object has been stored in the database before, false if not.
         */
        has(fsIDResolvable:fsIDResolvable): boolean
        /**
         * Check to see if a key has at any point on the json structure.
         * @name SimpleDatabase#hasKey
         * @param {string} key
         * @returns {boolean} true if found, false otherwise
         * @example
         *
         * //check the guild's data in the database for a key called "amongus"
         * if(client.db.hasKey(`${interaction.guild.id}.amongus`))
         *
         * //this will most likely return false. No promises.
         */
        hasKey(key:string): boolean | undefined
        /**
         * Grab the entire database as one object
         * @name SimpleDatabase#getAllData
         * @returns {object}
         *  @throws {Error} If data does not exist
         */
        getAllData(): object 
    }
}

declare module "utils/LockBox" {
    class LockBox{
    /** 
     * stationary cipher key, stored as an env variable.
     * @memberof LockBox
     */
    stationaryKey: string | undefined;
    /**
     * Creates an instance of the LockBox
     * @constructor
     * @memberof LockBox
     */
    constructor();
    /**
     * encrypt data
     *
     * @param {any} [data]
     * @memberof LockBox
     */
    encrypt(data: any): string;
    /**
     * Same as {@link encrypt}, but the key used for the encryption is immediately destroyed.
     * rendering whatever data it has encrypted permanent scrambled. (prob wont work, haven't tested)
     * @param {any} data
     * @memberof LockBox
     * @returns {any} permanentley encrypted data
     */
    encrypt_forgetKey(data: any): string;
    /**
     * decrypt data that has previously been {@link encrypt}ed
     * @memberof LockBox
     * @param {string} [data]
     * @return {any}
     */
    decrypt(data: string): any;
    _generateKey(): any;
    _initEnv(): void;
    _newTimestamp(): string;
    }
}

declare module "utils/utilities" {
        /**
         * erases all data in the log file
         * 
         */
    function clearLog():void 
    
        /**
         * A simple logger for Flutterbot. Written by [NekoNoka]({@link NekoNokaUrl})
         * @param {string[]} modifierList modifiers listed in {@link Logcolors} that can be used to change the color, weight, etc of log text
         * @param {string} message the message to log (optional)
         * @param {boolean} logAll (optional) default true tsc
         * @param {boolean} forced force a message (optional)
         * @param {boolean} tofile write to Flutterbot.log (optional)
         * @param {boolean} clear clear Flutterbot.log (optional)
         * @param {string} frame provide a frame to print with an error message (optional)
         * @return {void}
         * 
         */
         declare function Log(
            modifierList?:string ,
            message?:string,
            logAll:boolean=true,
            forced:boolean=true,
            tofile:boolean=true,
            clear:boolean=false,
            frame?:any
        
        ): string
            
        
    /**
     * fill placeholder templates in a string with a value
     * 
     * @summary templates are denoted by '{}', with a variable name within the square brackets
     * @example 
     *      //replace "location" with "the store"
     * const string = "I want to go to the {location}"
     *      format(string, {"location"="the store"}) 
     * @param {string} template
     * @param {fsLangTemplate} template
     * @return {string}
     */
     function format(string:string, template:fsLangTemplate):string 
      
    /**
     * Determine wether or not Fluttershy has permission to speak in a voice based channel
     * 
     * @param {Interaction} interaction a discord {@link Interaction} object 
     * @param {Client} Flutterbot
     * @return {boolean}
     */
     function hasVoiceChannelPermissions(interaction:Interaction, Flutterbot:Client):boolean 
    
    /**
     * Determine wether or not a voice based channel is nsfw
     * 
     * @param {Interaction} [interaction] a discord {@link Interaction} object 
     * @return {boolean}
     * @throws {Error} if the object used to check does not have a member with a valid voice state.
     */
   function nsfwChannel(interaction:Interaction):boolean 
       
    
    
    
    /**
     * return a random response from an array of default responses
     * 
     * @param {Array<string>} [langArray]
     * @return {string}
     */
   function langRand(langArray:Array<string>):string 
    /**
     * Remove Everyone mentions from a string 
     * @author NekoNoka
     * @param {string} [text]
     * @return {string}
     */
    function removeEveryoneMentions(text:string): string 
    /**
     * Formats a value in seconds into [hh]:[mm]:[ss] for the clean display of video and audio length
     * @param {number} seconds
     * @returns {string} the seconds, formatted into [hh]:[mm]:[ss]
     */
    function formatSeconds(seconds:number): string
    
    
    /**
     * Determine wether or not a string or bigint is a valid Discord Snowflake
     * 
     * @name IsSnowflake
     * @param {string |bigint} integer_id
     * @returns {(boolean | Snowflake)} Snowflake if provided args are valid snowflake, false if not
     */
   function IsSnowflake(integer_id:string | bigint): boolean
    /**
     * Fetch the unique Snowflake ID of a guild, accepts any discord api object that can be 
     * reduced into a "guild.id" property 
     * @param {fsGuildIDResolvable} [object] a discord api object that can be resovled into a unique {@link Guild} snowflake ID. see {@link fsGuildIDResolvable}
     * @return {Snowflake} the resolved snowflake ID as string.
     */
    function resolveGuildID(fsGuildIDResolvable:fsGuildIDResolvable): Snowflake 
    /**
     * Fetch the unique snowflake ID of a User
     * 
     * @name resolveUserID
     * @param {fsUserIDResolvable} [fsUserIDResolvable] a discord api object that can be resovled into a unique {@link User} snowflake ID. see {@link fsUserIDResolvable}
     * @returns {Snowflake} the resolved snowflake ID as string.
     */
    function resolveUserID(fsUserIDResolvable:fsUserIDResolvable): Snowflake 
    /**
     * @summary Fetch the Snowflake ID from any valid discord API object 
     *          Similar to {@link resolveGuildID} and {@link resolveUserID} expect 
     *          with the ability to resolve for both user and guild ids. 
    
     *          (note that objects with seperate instances of the id property will not work here. e.g. GuildMember with
     *          an id for both "Guild" and "User". In these cases it would be wise to call {@link resolveGuildID} or {@link resolveUserID} respectively)]
     * 
     * @param {fsIDResolvable} [IDResolvable] a discord api object that can be resovled into a unique snowflake ID. see {@link fsIDResolvable}
     * @returns {Snowflake} the resolved snowflake ID as string.
     */
   function resolveID(IDResolvable:fsIDResolvable): Snowflake
    
    
    
    
    /**
     * Determine wether or not an object has shared keys with another object.
     * 
     * @param {object} [obj1]
     * @param {object} [obj2]
     * @returns {string | string[]}
     */
   function sharedKeys(obj1:object, obj2:object): string[] | string 
    /**
    * get the dataype of an array
    
     * @param {Array<any>} [arr]
     * @return {{type: number, typeName:string}}
     */
   function getArrayType(arr:Array<any>): {type: number, typeName:string} 
    /**
     * Merge the contents of two arrays together
     * @param {Array<any>} [arr1]
     * @param {Array<any>} [arr2]
     * @return {Array<any>}
     */
    function mergeArrays(arr1:Array<any>, arr2:Array<any>): Array<any>
    /**
     * Returns true if "url" is a link to media on YouTube
     * 
     * @param {string} [url]
     * @returns {boolean}
     */
    function isYoutubeUrl(url:string):boolean 
    /**
     * Returns true if "url" is a link to media on Spotify
     * @param {string} [url]
     * @return {boolean}
     */
     function isSpotifyUrl(url:string): boolean 
    /**
     * Returns true if "url" is a link to media on SoundCloud
     * @param {string} url
     * @return {boolean}
     */
     function isSoundCloudUrl(url:string): boolean  
    
    /**
     * Determine the origin of a media url, returns a string representing the name of media's source
     * @example 
     *  //will return "yt"
     *  const sourceType = MusicMediaUrl(https://www.youtube.com/watch?v=mrFOdmzPwcg)
     * @param {string} [url]
     * @return {('yt' | 'soundcloud' | 'spotify' | '')}
     */
   function MusicMediaUrl(url:string): 'yt' | 'soundcloud' | 'spotify' | '' 
    
    /**
     * Convert a Date into a timezone specified by timezone str.
     * 
     * @param {Date} [date]
     * @param {string} [targetTimezone]
     * @return {Date}
     */
     function convertToTimezone(date:Date, targetTimezone:string): string 
    function printCurrentFrame() 
    
    
    /**
     * Find all files in a directory with a given extension 
     * Written by [NekoNoka]({@link NekoNokaUrl}) 
     * 
     * @param {string} [dirname]
     * @param {string} [relativePath]
     * @param {string} [endsWith='']
     * @return {any}
     */
    function findFiles(dirname:string, relativePath:string, endsWith: string = ''): string[] 
    /**
     * Format links to content on Youtube into their proper parseable format
     * 
     * @summary links in the domains 1.youtu.be 2.music.youtube 3.youtube.com/watch?v=shorts
     * will all need to be formatted.  
     * @param {string} [url] url to check / format
     * @return {string} 
     */
     function formatYtLink(url:string):string 
    
    /**
     * fetch the extension / type of a file 
     * @param {*} url path to the file 
     * @return {string} the file's extension 
     */
     function getExtension(url:any): string 
    
    
    /**
     * Determines what type of API object a {@link Snowflake} originated from 
     * 
     * @param {string} [snowflake]
     * @return {fsSnowflakeType}  
     */
     function getSnowflakeType(snowflake: string): fsSnowflakeType 
    /**
     * Fetch all of Flutterbot's commands neatly into a collection 
     * #### author [NekoNoka]({@link NekoNokaUrl})
     * @export
     * @return {{SlashCommands: fsCommands, PrefixCommands:fsCommands}}
     */
    function findAllCommands(): {SlashCommands: fsCommands, PrefixCommands:fsCommands}
    
    
    
}
declare module "./utils/types"{
export type server_quotes = Array<fsMemberQuote>;
export type fsSnowflakeArray = Array<Snowflake>;
export type fsCommands = Collection<string,APIApplicationCommand>;
/**
 *  contains all of the data created by Flutterbot 
 *  associated with a {@link Guild} 
 */
export class fsGuild implements object
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
 * @implements {object}
 */
export class fsUser implements object 
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

export type fsUser = 
{
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
}
/**
 * Object representing the number of sent and recieved reactions a user has. Component on 
 * 
 * @class ReactionData
 * @implements {ReactionData}
 */
 class ReactionData implements ReactionData
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
const enum fsSnowflakeType
{
    User=0,
    Bot=1, 
    "Server-Member"=2, 
    Channel=3,
    Role=4,
    Emoji=5,
    Message=6,
    Guild=7,
}
/**
 * Object representing a quote from a server member
 * 
 * @class fsMemberQuote
 * @implements {fsMemberQuote}
 */
class fsMemberQuote implements fsMemberQuote
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
type fsSnowFlakes=
{
    0:User,
    1:"Bot", 
    2:Guild | GuildMember,
    3:Channel,
    4:Role,
    5:Emoji, 
    6:Message, 
    7:Guild
}





 class fsPermissionsError extends fsError
{
    constructor(message:string,error?:Error)
    
}
 class fsClientError extends fsError
{
    constructor(message:string,error?:Error)
    
}
 class fsAPIError extends fsError
{
    constructor(message:string,error?:Error)
   
}
 class fsTypeError extends fsError
{
    constructor(message:string,error?:Error)
   
}
 class fsLockBoxError extends fsError
{
    constructor(message:string,error?:Error)
   
}

}

declare module "utils/exp"{
/**
 * expeirence points for an individual user
 * @classdesc Object attached to each user in a guild that automatically calculates, and scribes 
 * expeirence points from server interactions. All PonyExp objects are updated at once by the {@link expHandler}
 * within Flutterbot's main event loop
 * 
 * @see {expHandler}{PonyExpData}
 *
 * @export
 * 
 * @implements {PonyExpData}
 * @class
 */
 class PonyExp implements PonyExpData
{
/**
 * Creates an experience object for an individual user.
 * @param {PonyExpData} 
 * 
 */
msg:number; 
level:number;  
amongus:number;
d7oomyscore:number; 
cmds:number; 
required:number;
reacts: ReactionData
experience: number; 
total_exp:number;
constructor(Data?:PonExpData)


addExp(pts:number)
  
 /** called from the handler, updates values in the experience object.
 * @see expHandler
 * @name update
 * @param {...{}} args
 * @returns {{\}\}
 */
update(...args:any[]): string[]
  

_calculateRequired()
 
_onMessageCreate(message:any):string[]
  
_onInteractionCreate(interaction:BaseInteraction)
  
 
_onMessageReaction(reaction:MessageReaction, user:User)
  
  /**
 * pipe all of this instances' PonyExpvalues into an object. 
 * @date 10/13/2023 - 5:05:26 AM
 * @name toJSON
 * @returns {object}
 */
toJSON(): object
  
 }
}
declare module "guardianAngel/AngelBunny"
{
     class AngelBunny {
        urlRegex: RegExp;
        intel: string[];
        db: SimpleDatabase;
        shy: shy;
        constructor(Database: SimpleDatabase, shy: shy);
        validateAge(member: GuildMember): boolean;
        quaratine(member: GuildMember): Promise<void>;
        createQuaratineRole(member: GuildMember): Promise<void>;
        onMessage(message: Message): Promise<void>;
        updateIntelligence(): Promise<void>;
        loadIntel(): any;
        positiveURL(message: Message): Promise<{
            match: boolean;
            urls: Array<string> | undefined;
        }>;
    }
}


    /**
* #### Shy
*
* Flutterbot's {@link Client} instance.
* All {@link Events}, commands, and update functions are handled within this class.
* @class {Shy}
* @extends {Client}
*/

declare const flutterbot = new Flutterbot; 
export const Flutterbot = Flutterbot; 




declare module "commands/slash/"
{  
    export async function execute(interaction:CommandInteraction, Flutterbot:shy)
}

module "events/messagecreate"
{
    export async function execute(Flutterbot:Flutterbot, message:Message);
}

declare module "events/ready"
{
 export async function execute(Flutterbot:Flutterbot);
}
declare module "events/roleupdate"
{
 export async function execute(Flutterbot:Flutterbot, role:Role);
}
declare module "events/guildmemberadd"
{
 export async function execute(Flutterbot:Flutterbot, Guildmember:GuildMember);
}



