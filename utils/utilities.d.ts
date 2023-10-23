import { BaseInteraction, Client, APIApplicationCommand, Guild, GuildEmoji, GuildMember, GuildMemberResolvable, Interaction, Invite, InviteGuild, Message, PermissionFlagsBits, Role, Snowflake, SnowflakeUtil, ThreadMember, User, UserResolvable, VoiceChannel, VoiceChannelResolvable, NonThreadGuildBasedChannel, TextChannel, StageChannel, NewsChannel, ForumChannel, GuildChannel, BaseGuildTextChannel, BaseGuildVoiceChannel, Collection, MessageReaction, Utils } from 'discord.js';
import * as fs from "fs";
import { DataTypes, NekoNokaUrl, fsCommands,fsError,Errors, fsGuildIDResolvable, fsIDResolvable, fsLangTemplate, fsObject, fsUserIDResolvable, fsSnowflakeType } from './types';
import * as path from "path";
import { GuildResolvable } from "discord.js";
import { Logcolors } from './utilities';

export module utilities{
/**
     * erases all data in the log file
     * 
     */
export function clearLog():void 

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
export function format(string:string, template:fsLangTemplate):string 
  
/**
 * Determine wether or not Fluttershy has permission to speak in a voice based channel
 * 
 * @param {Interaction} interaction a discord {@link Interaction} object 
 * @param {Client} Flutterbot
 * @return {boolean}
 */
export function hasVoiceChannelPermissions(interaction:Interaction, Flutterbot:Client):boolean 

/**
 * Determine wether or not a voice based channel is nsfw
 * 
 * @param {Interaction} [interaction] a discord {@link Interaction} object 
 * @return {boolean}
 * @throws {Error} if the object used to check does not have a member with a valid voice state.
 */
export function nsfwChannel(interaction:Interaction):boolean 
   



/**
 * return a random response from an array of default responses
 * 
 * @param {Array<string>} [langArray]
 * @return {string}
 */
export function langRand(langArray:Array<string>):string 
/**
 * Remove Everyone mentions from a string 
 * @author NekoNoka
 * @param {string} [text]
 * @return {string}
 */
export function removeEveryoneMentions(text:string): string 
/**
 * Formats a value in seconds into [hh]:[mm]:[ss] for the clean display of video and audio length
 * @param {number} seconds
 * @returns {string} the seconds, formatted into [hh]:[mm]:[ss]
 */
export function formatSeconds(seconds:number): string


/**
 * Determine wether or not a string or bigint is a valid Discord Snowflake
 * 
 * @name IsSnowflake
 * @param {string |bigint} integer_id
 * @returns {(boolean | Snowflake)} Snowflake if provided args are valid snowflake, false if not
 */
export function IsSnowflake(integer_id:string | bigint): boolean
/**
 * Fetch the unique Snowflake ID of a guild, accepts any discord api object that can be 
 * reduced into a "guild.id" property 
 * @param {fsGuildIDResolvable} [object] a discord api object that can be resovled into a unique {@link Guild} snowflake ID. see {@link fsGuildIDResolvable}
 * @return {Snowflake} the resolved snowflake ID as string.
 */
export function resolveGuildID(fsGuildIDResolvable:fsGuildIDResolvable): Snowflake 
/**
 * Fetch the unique snowflake ID of a User
 * 
 * @name resolveUserID
 * @param {fsUserIDResolvable} [fsUserIDResolvable] a discord api object that can be resovled into a unique {@link User} snowflake ID. see {@link fsUserIDResolvable}
 * @returns {Snowflake} the resolved snowflake ID as string.
 */
export function resolveUserID(fsUserIDResolvable:fsUserIDResolvable): Snowflake 
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
export function resolveID(IDResolvable:fsIDResolvable): Snowflake




/**
 * Determine wether or not an object has shared keys with another object.
 * 
 * @param {object} [obj1]
 * @param {object} [obj2]
 * @returns {string | string[]}
 */
export function sharedKeys(obj1:object, obj2:object): string[] | string 
/**
* get the dataype of an array

 * @param {Array<any>} [arr]
 * @return {{type: number, typeName:string}}
 */
export function getArrayType(arr:Array<any>): {type: number, typeName:string} 
/**
 * Merge the contents of two arrays together
 * @param {Array<any>} [arr1]
 * @param {Array<any>} [arr2]
 * @return {Array<any>}
 */
export function mergeArrays(arr1:Array<any>, arr2:Array<any>): Array<any>
/**
 * Returns true if "url" is a link to media on YouTube
 * 
 * @param {string} [url]
 * @returns {boolean}
 */
export function isYoutubeUrl(url:string):boolean 
/**
 * Returns true if "url" is a link to media on Spotify
 * @param {string} [url]
 * @return {boolean}
 */
export function isSpotifyUrl(url:string): boolean 
/**
 * Returns true if "url" is a link to media on SoundCloud
 * @param {string} url
 * @return {boolean}
 */
export function isSoundCloudUrl(url:string): boolean  

/**
 * Determine the origin of a media url, returns a string representing the name of media's source
 * @example 
 *  //will return "yt"
 *  const sourceType = MusicMediaUrl(https://www.youtube.com/watch?v=mrFOdmzPwcg)
 * @param {string} [url]
 * @return {('yt' | 'soundcloud' | 'spotify' | '')}
 */
export function MusicMediaUrl(url:string): 'yt' | 'soundcloud' | 'spotify' | '' 

/**
 * Convert a Date into a timezone specified by timezone str.
 * 
 * @param {Date} [date]
 * @param {string} [targetTimezone]
 * @return {Date}
 */
export function convertToTimezone(date:Date, targetTimezone:string): string 
export function printCurrentFrame() 


/**
 * Find all files in a directory with a given extension 
 * Written by [NekoNoka]({@link NekoNokaUrl}) 
 * 
 * @param {string} [dirname]
 * @param {string} [relativePath]
 * @param {string} [endsWith='']
 * @return {any}
 */
export function findFiles(dirname:string, relativePath:string, endsWith: string = ''): string[] 
/**
 * Format links to content on Youtube into their proper parseable format
 * 
 * @summary links in the domains 1.youtu.be 2.music.youtube 3.youtube.com/watch?v=shorts
 * will all need to be formatted.  
 * @param {string} [url] url to check / format
 * @return {string} 
 */
export function formatYtLink(url:string):string 

/**
 * fetch the extension / type of a file 
 * @param {*} url path to the file 
 * @return {string} the file's extension 
 */
export function getExtension(url:any): string 


/**
 * Determines what type of API object a {@link Snowflake} originated from 
 * 
 * @param {string} [snowflake]
 * @return {fsSnowflakeType}  
 */
export function getSnowflakeType(snowflake: string): fsSnowflakeType 
/**
 * Fetch all of Flutterbot's commands neatly into a collection 
 * #### author [NekoNoka]({@link NekoNokaUrl})
 * @export
 * @return {{SlashCommands: fsCommands, PrefixCommands:fsCommands}}
 */
export function findAllCommands(): {SlashCommands: fsCommands, PrefixCommands:fsCommands}

export const enum Logcolors {
       
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

}

export default utilities;