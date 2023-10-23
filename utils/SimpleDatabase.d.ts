import { fsObject } from "./types";
import { Utilities} from './utilities';

export default SimpleDatabase;
/**
 * simplistic, probably good enough crackhead database
 * author: [EllyPony]({@link EllyPonyUrl})
 * @class
 */
export class SimpleDatabase {
    constructor(filePath='',log:Function=Utilities.Log, debug_print:boolean) 
    debug_print: boolean;
    log: any;
    filePath: string;
    data: fsObject;
    _printAcessInfo(Key: string | undefined, value: any, ID: any): void;
    /**
     * Private Class Method. Called by the database when modifying adding or removing propereties
     * in order to keep the database up to date and clean.
     * @name SimpleDatabase#_loadData
     * @returns {fsObject} the loaded database
     */
    _loadData(): fsObject | undefined 
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
     * @param {fsObject} New
     * @param {fsObject} Old
     * @returns {object}
     */
    _updateObject(New:fsObject, Old:fsObject): fsObject
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
    getAllData(): fsObject 
}
