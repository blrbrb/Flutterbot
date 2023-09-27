import '../main.js'
import {Discord,
    Collection, Message, Interaction, Guild, Snowflake, User, GuildResolvable, UserResolvable, Embed, EmbedBuilder,
    ActionRow, ButtonInteraction, ActionRowBuilder, ButtonBuilder, ButtonComponent, VoiceChannel, Channel, TextChannel, Events, ApplicationCommandOptionType,
    PermissionFlagsBits, Client, Partials, GatewayIntentBits, SnowflakeUtil, EmbedBuilder, GuildScheduledEventManage
} from 'discord.js';
import 'distube'

import { Log } from '../utils/utilities.js'
import '../utils/SimpleDatabase.js'
import { SimpleDatabase } from '../utils/SimpleDatabase.js';
import { LockBox } from '../utils/LockBox.js'
import { GuildIdResolvable } from 'distube';

class Flutterbot {
    constructor()
    client: Client;
    log: Log;
    DisTube: DisTube;
    collectors: Collection;
    slashcommands: Collection;
    prefixcommands: Collection;
    db: SimpleDatabase;
    LockBox: LockBox;
    GuildCoolDowns: Map;
};


class LockBox {



}

class SimpleDatabase {
    constructor(public filePath: string)
    data: Object;
    filePath: string;
    /**
   * Access a value in the database
   * @param {String} Key 
   * @param {GuildResolvable | UserResolvable} IDResolveable any object that can be resolved to a unique {@link Snowflake}
   * @param {any} value 
   * @returns {any} Data associated with key.
   * @returns {undefined} if key does not exist. (will also auto-initalize the key that isn't found)
   */
    set(IDResolveable: GuildResolvable | UserResolvable, Key: String, value: any): any

    /**
    * Private Class Method. Called by the database when modifying adding or removing propereties 
    * in order to keep the database up to date and clean.
    * @returns {any}
    */
    loadData(): Object

    /**
    * Private Class Method. Called by the database each time a property is changed, added, or deleted
    * @returns {void}
    */
    saveData(): void



    /**
     * replace old keys on an object with new values. Both Objects Must 
     * be identical, sharing the same number of properties, and property names 
     * 
     * @param {Object} Old{@link Object} with old values
     * @param {Object} New {@link Object} with new values
     * @returns {Object} new {@link Object} with merged properties 
     */
    updateObject(Old: Object, New: Object): Object


    /**
    * Get the datatype (string) of an array in the database
    * @param {Array} arr
    * @returns {String} a string for the {@link typeof} data in the Array 
    */
    getArrayType(arr: Array): string


    /**
   * Delete a property from the database
   * @param {String} key {@link String} Property to remove, e.g. "DiscordID.score"
   * @returns {void} nothing upon the successful removal of a key/pair 
   * @example 
   * 
   * client.db.deleteEntry("poopoo.peepee.balls") 
   * //removes the "balls" property from "peepee", rooted at "poopoo" 
   */
    deleteEntry(key: string): void


    /** 
    * Set a key in the guild's .config object. 
    * @summary Sets a value in a guild object's .config branch. (All guild resolveable objects are created with a .config property by default) 
    * If the property does not already exist, the function will initalize the property and append it to the .config branch. Otherwise, if the value already exists 
    * the old value will be replaced by the one supplied. Saves the database after every execution.
    * @param {GuildIdResolvable | UserResolvable} guildResolveable - Object that can be resolved into a discord {@link Snowflake} 
    * @return {void} Nothing on success. 
    */
    setGuildConfig(guildResolveable: GuildIdResolvable | UserResolvable, configKey: string, value: any): void


    /**
     * Merge the contents of two arrays (note both arrays must be of the same datatype)
     * @param {Array} arr1:{@link Array}
     * @param {Array} arr2:{@link Array}
     * @returns {Array} a new Array with values from both input arrays combined
     * @example 
     *          movies = ['Termarenator', 'Foals of the Corn', 'Piderman']; 
     *          unwatched_movies = ['IT', '2001: A Space Odyssey'] 
     *          const new = mergeArrays(movies, unwatched_movies); 
     *          console.log(newlyWatchedMovies); //OutPut: ['Termarenator', 'Foals of the Corn', 'Piderman','IT', '2001: A Space Odyssey' ]``
     */
    mergeArrays(arr1: Array, arr2: Array): Array


    /** 
* Fetch a property from a guild's .config 
* @summary Fetches a value in a guild object's .config branch. (All guild resolveable objects are created with a .config property by default) 
    * If the property does not already exist, the function will initalize the property and append it to the .config branch. Otherwise, if the value already exists 
    * the old value will be replaced by the one supplied. Saves the database after every execution.
* @param {GuildIdResolvable | UserResolvable} guildResolveable object that can be resolved to a {@link Discord}.{@link Snowflake}
* @return {ReturnValueDataTypeHere} Brief description of the returning value here.
*/
    getGuildConfig(guildResolveable: GuildIdResolvable | UserResolvable, configKey: String): any
    
    
   
    /**
     * Fetch any value in the database with a key
     * @summary If the key is a nested property, it can be accsessed by using a string of keys delineated by '.'
     * @param {String | Array } key a  {@link String} or {@link Array} of Strings for nested values 
     * @returns {any} 
     * @example 
     *  //fetch a value stored in "guildData" called "members" on property of guild "2212310233"
     * let members = db.getValue("guildData.2212310233.members") //let members will = false if the data is not found 
     * if(members){
     *  //logic 
     * } 
     */
    getValue(key:String | Array): any | False
       
          
          
          
      /**
     * Check to see if an object already has data in the db file. 
     * important to make sure the app doesn't crash accessing data 
     * that doesn't yet exist. IMPORTANT. Different from keyExists in the sense that 
     * keyExists() will search the ENTIRE db tree for matches, not just the root of the json tree.
     * They aren't intercompatible because guild id's may appear elsewhere in the db file farther down 
     * and conflate the results.
     * @param {GuildResolvable | UserResolvable} IDResolveable an object that can be resolved to {@link GuildIdResolvable} or {@link UserResolvable}
     * @returns {true} if the object has been stored in the database before, false if not.
     */
      Exists(guildResolveable: GuildResolvable | UserResolvable): boolean
      
        
        
      



}