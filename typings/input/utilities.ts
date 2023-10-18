import { BaseInteraction, Client, CommandInteraction, Guild, GuildEmoji, GuildMember, GuildMemberResolvable, Interaction, Invite, InviteGuild, Message, PermissionFlagsBits, Role, Snowflake, SnowflakeUtil, ThreadMember, User, UserResolvable, VoiceChannel, VoiceChannelResolvable, NonThreadGuildBasedChannel, TextChannel, StageChannel, NewsChannel, ForumChannel, GuildChannel, BaseGuildTextChannel, BaseGuildVoiceChannel, Utils } from 'discord.js';
import * as fs from "fs";
import { NekoNokaUrl, fsLangTemplate } from './types';
import * as path from "path";
import { GuildResolvable } from "discord.js";
import { DataTypes, fsObject, fsUserIDResolvable, fsGuildIDResolvable, fsIDResolvable } from './types';

/**
 * Helper functions, and other misc items
 */




export const Logcolors:fsObject =
{
       
        "italic":"\x1B[3m" ,
        "reset": "\x1b[0m",
        "bright": "\x1b[1m",
        "dim": "\x1b[2m",
        "underscore": "\x1b[4m",
        "blink": "\x1b[5m",
        "reverse": "\x1b[7m",
        "hidden": "\x1b[8m",
      
        "black": "\x1b[30m",
        "red": "\x1b[31m",
        "green": "\x1b[32m",
        "yellow": "\x1b[33m",
        "blue": "\x1b[34m",
        "magenta": "\x1b[35m",
        "cyan": "\x1b[36m",
        "white": "\x1b[37m",
        "gray": "\x1b[90m",
        "grey": "\x1b[90m",
      
        "bgblack": "\x1b[40m",
        "bgred": "\x1b[41m",
        "bggreen": "\x1b[42m",
        "bgyellow": "\x1b[43m",
        "bgblue": "\x1b[44m",
        "bgmagenta": "\x1b[45m",
        "bgcyan": "\x1b[46m",
        "bgwhite": "\x1b[47m",
        "bggray": "\x1b[100m",
        "bggrey": "\x1b[100m"
}
/**
     * erases all data in the log file
     * @see {Log} 
     * @name clearLog
     * 
     */
function clearLog():void {
    fs.writeFile('Flutterbot.log', '', (err) => {
        if (err) {
            console.error('Error clearing the log file:', err);
        } else {
            console.log('Log file cleared successfully.');
        }
    });
    }

    /**
     * {@link Log}
     * A simple logger for Flutterbot. Written by [NekoNoka]({@link NekoNokaUrl})
     * @param {string[]} modifierList modifiers listed in {@link Logcolors} that can be used to change the color, weight, etc of log text
     * @param {string} message the message to log (optional)
     * @param {boolean} logAll (optional) default true tsc
     * @param {boolean} forced force a message (optional)
     * @param {boolean} tofile write to Flutterbot.log (optional)
     * @param {boolean} clear clear Flutterbot.log (optional)
     * @param {string} frame provide a frame to print with an error message (optional)
     * @see {Logcolors}
     * @returns {void}
     * 
     */
    export function Log(
        modifierList?:string ,
        message?:string,
        logAll:boolean=true,
        forced:boolean=true,
        tofile:boolean=true,
        clear:boolean=false,
        frame?:any
    
    ): void  {
        !logAll && console.log(`${Logcolors.bright}${Logcolors.red}TAKE CARE TO NOTE LOGALL IS DISABLED${Logcolors.reset}`);
      
      
            if (clear) clearLog();

            if (!logAll && !forced) return;

            if (Array.isArray(message)) {
                message = message.join(" ");
            }
            if (Array.isArray(modifierList)) {
                modifierList = modifierList.join(" ");
            }
          
            if (message === undefined && modifierList) {
            
                message =  modifierList;
                modifierList = "";
            }
            else if (modifierList === undefined && message) {
            
                modifierList =  message;
                message = "";
            }
            else if(!modifierList && !message)
            {
                throw new Error('missing arguments');
            }
            if (frame) {
                console.log(`${Logcolors.underscore}${frame}${Logcolors.reset}`);
            }
  
            
            let pirate = modifierList? modifierList.toLowerCase().split(" "): [];
            let combine = "";
            pirate.forEach(c => Logcolors[c] ? combine += Logcolors[`${c}`] : null);
            console.log(`${combine}${message}${Logcolors.reset}`);
            if (tofile) {
  
                fs.appendFile('Flutterbot.log', message + '\n', (err) => {
                    if (err) {
                        console.error('Error writing to log file:', err);
                    }
                });
            }
  
        }
    
/**
 * fill placeholder templates in a string with a value
 * @summary templates are denoted by '{}', with a variable name within the square brackets
 * @example 
 *      //replace "location" with "the store"
 * const string = "I want to go to the {location}"
 *      format(string, {"location"="the store"}) 
 *
 * @export
 * @param {string} template
 * @param {fsLangTemplate} template
 * @returns {*}
 */
export function format(string:string, template:fsLangTemplate):string {
        return string.replace(/\${(.*?)}/g, (match, key) => {
            // Check if the key exists in replacements, otherwise, return the original match
            return template.hasOwnProperty(key) ? template[key] : match;
        });
    }        
  
/**
 * Determine wether or not Fluttershy has permission to speak in a voice based channel
 * 
 * @name hasVoiceChannelPermissions
 * @param {Interaction} interaction
 * @param {Client} Flutterbot
 * @returns {boolean}
 */
export function hasVoiceChannelPermissions(interaction:Interaction, Flutterbot:Client):boolean {
    if(!Flutterbot.user)
     throw new Error('unable to find a refrence to myself!')
     if(!interaction.guild) 
        throw new Error('this interaction has not been sent in a valid guild');
     const self = interaction.guild.members.cache.get(Flutterbot.user.id);
    if(!self)
        throw new Error('unable to determine my own ID!');
    else{
    if (!self.permissions.has(PermissionFlagsBits.Connect) || !self.permissions.has(PermissionFlagsBits.Speak)) {
        return false;
    } else {
        return true;
    }
    }
}
/**
 * Determine wether or not a voice based channel is nsfw
 * 
 * @name nsfwChannel
 * @export
 * @param {CommandInteraction} interaction
 * @returns {boolean}
 * @throws {Error} if the object used to check does not have a member with a valid voice state.
 */
export function nsfwChannel(interaction:CommandInteraction):boolean {
    if(!interaction.member || !(interaction.member instanceof GuildMember)){
        throw new Error('this interaction has no member property')}
    
    if(!interaction.member.voice)
    {
        throw new Error('member is not conncected to voice state');
    }
   
    if (interaction.hasOwnProperty('member')) {
        if (interaction.member.hasOwnProperty('voice')) {
            if (interaction.member.voice.channel && interaction.member.voice.channel instanceof VoiceChannel
                &&interaction.member.voice.channel.nsfw) 
            {
                    return true; 
            }
            return false;
        }
        return false;
    } else {
        return false;
    }
}




    /**
 * return a random response from an array of default responses
 * @namespace MailMare
 * @name langRand
 * @param {Array<string>} langArray
 * @returns {string}
 */
export function langRand(langArray:Array<string>):string {
    const randomIndex = Math.floor(Math.random() * langArray.length);
    const randomElement = langArray[randomIndex];
    const rendered_message = module.exports.removeEveryoneMentions(randomElement);
    return randomElement;
}

/**
 * Remove Everyone mentions from a string 
 * @author NekoNoka
 * 
 * @name removeEveryoneMentions
 * @export
 * @param {string} text
 * @returns {string}
 */
export function removeEveryoneMentions(text:string): string {
    const pattern = /@everyone/g;
    const updatedText = text.replace(pattern, "");

    return updatedText;


}
/**
 * Formats a value in seconds into [hh]:[mm]:[ss] for the clean display of video and audio length
 * @export
 * 
 * @name formatTime
 * @param {number} seconds
 * @returns {string} the seconds, formatted into [hh]:[mm]:[ss]
 */
export function formatTime(seconds:number): string {
    
    if(seconds > 60**2) //if the supplied value in seconds is greater than one hour (60 squared?? right)
    {
        const hours = Math.floor(seconds / 60);
        const minutes = Math.floor(hours / 60);
        const remainingSeconds = seconds % 60; 
        const formattedHours = String(hours).padStart(3, '0');
        const formattedMinutes = String(minutes).padStart(3, '0');
        const formattedSeconds = String(remainingSeconds).padStart(3, '0');
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}


/**
 * Determine wether or not a string or bigint is a valid Discord Snowflake
 * 
 * @name IsSnowflake
 * @param {string |bigint} integer_id
 * @returns {(boolean | Snowflake)} Snowflake if provided args are valid snowflake, false if not
 */
export function IsSnowflake(integer_id:string | bigint): boolean{
    try {
        return SnowflakeUtil.deconstruct(integer_id).timestamp > SnowflakeUtil.epoch;
    } catch {
        return false;
    }
}
/**
 * Fetch the unique Snowflake ID of a guild, accepts any discord api object that can be 
 * reduced into a "guild.id" property 
 * 
 * @name resolveGuildID
 * @export
 * @param {fsGuildIDResolvable} object a discord api object that can be resovled into a unique {@link Guild} snowflake ID. see {@link fsGuildIDResolvable}
 * @returns {Snowflake} the resolved snowflake ID as string.
 */
export function resolveGuildID(object:fsGuildIDResolvable): Snowflake {
    if(typeof(object) === 'string' )
    {
        if(IsSnowflake(object))
         return object;
        else throw new TypeError(`unable to resolve Guild ID`);  
    }
    else{
    if (object instanceof Guild)
        return object.id;
    else if (object.guild && object.guild instanceof Guild)
        return object.guild.id;
    else throw new TypeError(`unable to resolve Guild ID`);
    }


}
/**
 * Fetch the unique snowflake ID of a User
 * 
 * @name resolveUserID
 * @export
 * @param {fsUserIDResolvable} fsUserIDResolvable a discord api object that can be resovled into a unique {@link User} snowflake ID. see {@link fsUserIDResolvable}
 * @returns {Snowflake} the resolved snowflake ID as string.
 */
export function resolveUserID(fsUserIDResolvable:fsUserIDResolvable): Snowflake {
    if(typeof(fsUserIDResolvable) === 'string' )
    {
        if(IsSnowflake(fsUserIDResolvable))
         return fsUserIDResolvable;
        else throw new TypeError(`unable to resolve Guild ID`);  
    }
    else{
    if(fsUserIDResolvable instanceof Message)
        return fsUserIDResolvable.author.id; 
    else if (fsUserIDResolvable instanceof User)
        return fsUserIDResolvable.id;
    else if (fsUserIDResolvable.user && fsUserIDResolvable.user instanceof User)
        return fsUserIDResolvable.user.id;

    else throw new TypeError(`unable to resolve Guild ID`);
    }


}
/**
 * resolveID
 * 
 * @summary Fetch the Snowflake ID from any valid discord API object 
 *          Similar to @see {resolveGuildID} and @see {resolveUserID} expect 
 *          with the ability to resolve for both user and guild ids. 

 *          (note that objects with seperate instances of the id property will not work here. e.g. GuildMember with
 *          an id for both "Guild" and "User". In these cases it would be wise to call @see {resolveGuildID} or @see {resolveUserID} respectively)
 * @export
 * @param {fsIDResolvable} IDResolvable a discord api object that can be resovled into a unique snowflake ID. see {@link fsIDResolvable}
 * @returns {Snowflake} the resolved snowflake ID as string.
 */
export function resolveID(IDResolvable:fsIDResolvable): Snowflake
{ ///string, guild, guildmember, role, guildemoji, nonthreadbased channel, invite

   
    if(IDResolvable instanceof Guild || IDResolvable instanceof User)
        return IDResolvable.id;

     ///FUCKIN LOL 
    else if(IDResolvable instanceof BaseGuildVoiceChannel || IDResolvable instanceof BaseGuildTextChannel ||
        IDResolvable instanceof Role || IDResolvable instanceof GuildEmoji ||
        IDResolvable instanceof ForumChannel || IDResolvable instanceof GuildChannel)
        {
            return IDResolvable.guild.id; 
        }

    else if (typeof(IDResolvable) === 'string' && IsSnowflake(IDResolvable))
    {
        return IDResolvable; 
    }
    else if (IDResolvable instanceof GuildMember)
    {
        throw new TypeError('cannot resolve ID on GuildMember object due to conflicting ID values for both Guild and User');
    }
    else throw new TypeError('unable to resolve ID');

    
     
}



/**
 * Determine wether or not an object has shared keys with another object.
 * @summary Returns an array of matched property names, if there are multiple matches they will be contained inside.
 * 
 * @name sharedKeys
 * @export
 * @param {object} obj1
 * @param {object} obj2
 * @returns {string[]}
 */
export function sharedKeys(obj1:object, obj2:object): string[] | string {
    let keys:string[] = [];
    for (const key in obj1) {
        if (obj2.hasOwnProperty(key)) {
            keys.push(key);
        }
    } 
    if(keys.length && keys.length > 1)
        return keys; //Multiple common keys found
    else if(keys.length == 1)
        return keys[0]; //One common key found
    else 
    return ""; // No common keys found
}
/**
* get the dataype of an array
  
* @name getArrayType
* @param {Array<any>} arr
* @returns {{ type: any; typeName: string; }}
*/
export function getArrayType(arr:Array<any>): {type: number, typeName:string} {
    if (Array.isArray(arr) && arr.length > 0) {
        const firstElementType = typeof arr[0];
       
        switch (firstElementType) {
            case "number":
                return {
                    type: DataTypes.Number, typeName: "Number"
                };
            case "string":
                return {
                    type: DataTypes.String, typeName: "String"
                };
            case "boolean":
                return {
                    type: DataTypes.Boolean, typeName: "Boolean"
                };
            case "object":
                if (Array.isArray(arr[0])) {
                    return {
                        type: DataTypes.Array,
                        typeName: "Array"
                    };
                } else if (arr[0] === null) {
                    return {
                        type: DataTypes.Object,
                        typeName: "Object"
                    };
                } else {
                    return {
                        type: DataTypes.Object,
                        typeName: "Object"
                    };
                }
            case "function":
                return {
                    type: DataTypes.Function, typeName: "Function"
                };
            default:
                return {
                    type: DataTypes.Unknown, typeName: "Unknown"
                };
        }
    } else {
        return {
            type: DataTypes.Unknown,
            typeName: "Unknown"
        };
    }
}
/**
 * Merge the contents of two arrays together
 * 
 * @name mergeArrays
 * @export
 * @param {Array<any>} arr1
 * @param {Array<any>} arr2
 * @returns {Array<any>}
 */
export function mergeArrays(arr1:Array<any>, arr2:Array<any>): Array<any> {
    // Check if both arrays have the same data type (numeric or string)
    if (
       (Array.isArray(arr1) && Array.isArray(arr2)) &&
       (arr1.length > 0 && typeof arr1[0] === typeof arr2[0])
    ) {
       // Merge the arrays
       return arr1.concat(arr2);
    } else {
       // Arrays are of different data types, handle the error or return an empty array
       throw new TypeError(`Incompatible array types received ${typeof arr1[0]} and ${typeof arr2[0]}`);
    
    }
    }
    



/**
 * Returns true if "url" is a link to media on YouTube
 * 
 * @name isYoutubeUrl
 * @param {string} url
 * @returns {boolean}
 */
export function isYoutubeUrl(url:string):boolean {

    // Regular expressions to match different YouTube link formats
    const youtubeShortRegex = /youtu.be\/([^?&]+)/;
    const youtubeRegularRegex = /youtube\.com\/(?:watch\?v=|shorts\/)([^?&]+)/;
    const youtubeMusicRegex = /music\.youtube\.com\/watch\?v=([^?&]+)/;
    return (
        youtubeShortRegex.test(url) ||
        youtubeRegularRegex.test(url) ||
        youtubeMusicRegex.test(url)
    );
}
/**
 * Returns true if "url" is a link to media on Spotify
 * 
 * @name isSpotifyUrl
 * @param {string} url
 * @returns {boolean}
 */
export function isSpotifyUrl(url:string): boolean {
    const SPexp = RegExp(/^https:\/\/open\.spotify\.com\/track\/[a-zA-Z0-9]+(\?[^\s]+)?$/);
    if (SPexp.test(url))
        return true;
    else
        return false;
}
/**
 * Returns true if "url" is a link to media on SoundCloud
 * 
 * @name isSoundCloudUrl
 * @param {string} url
 * @returns {boolean}
 */
export function isSoundCloudUrl(url:string): boolean  {
    const SCexp = RegExp(/^https:\/\/soundcloud\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+(\?[^\s]+)?$/);
    if (SCexp.test(url)) {
        return true;
    } else {
        return false;
    }
}

/**
 * Determine the origin of a media url, returns a string representing the name of media's source
 * 
 * @name MusicMediaUrl
 * @example 
 *  //will return "yt"
 *  const sourceType = MusicMediaUrl(https://www.youtube.com/watch?v=mrFOdmzPwcg)
 * @param {string} url
 * @returns {('yt' | 'soundcloud' | 'spotify' | '')}
 */
export function MusicMediaUrl(url:string): 'yt' | 'soundcloud' | 'spotify' | '' {
    if (module.exports.isYoutubeUrl(url)) {
        return "yt";
    }
    if (module.exports.isSpotifyUrl(url)) {
        return "spotify";
    }
    if (module.exports.isSoundCloudUrl(url)) {
        return "soundcloud";
    } else {
        return "";
    }

}



/**
 * Convert a Date into a timezone specified by timezone str.
 * 
 * @name convertToTimezone
 * @param {Date} date
 * @param {string} targetTimezone
 * @returns {Date}
 */
export function convertToTimezone(date:Date, targetTimezone:string): string {
   
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: targetTimezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // Use 24-hour format
    });
    return formatter.format(date);

}

export function printCurrentFrame() {
    const stack = new Error().stack;
    if(stack){
     const callerLine = stack.split("\n")[2].trim();
     return callerLine;}
    else 
    {
        throw new Error('unable to initalize callerLine from stack');
    }
}


/**
 * Find all files in a directory with a given extension 
 * Written by [NekoNoka]({@link NekoNokaUrl}) 
 * @name findFiles
 * @export
 * @param {string} dirname
 * @param {string} relativePath
 * @param {string} [endsWith='']
 * @returns {any}
 */
export function findFiles(dirname:string, relativePath:string, endsWith: string = ''): string[] {
    return fs.readdirSync(path.join(dirname, relativePath)).filter(folder => !folder.startsWith('_') && !folder.startsWith('.DS_STORE') && folder.endsWith(endsWith));
}


export function getExtension(url:any): string {
    return url.split(/[#?]/)[0].split('.').pop().trim();
}
/**
* Merge the contents of two arrays (must be of the same datatype)
* @name utilities#mergeArrays
* @param {Array<any>} arr1
* @param {Array<any>} arr2
* @returns {Array<any>}
* @throws {TypeError} TypeError upon attempting to concat two arrays of different datatypes. 
*/



