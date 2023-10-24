"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleDatabase = void 0;

const Discord = require('discord.js');
const fs_1 = __importDefault(require("fs"));
const types_1 = require("./types");
const utilities_1 = require("./utilities");
/**
 * simplistic, probably good enough crackhead database
 * author: [EllyPony]({@link EllyPonyUrl})
 * @class
 */
class SimpleDatabase {
    constructor(filePath = '', log, debug_print = false) {
        this.debug_print = false;
        /**
        * @param filePath @type {string} @param debug_print @type {boolean}  - Brief description of the parameter here. Note: For other notations of data types, please refer to JSDocs: DataTypes command.
        * @return {SimpleDatabase}
        */
        if (!log || !(typeof (log) === 'function'))
            throw Error('cannot instantize SimpleDatabase without a Log function!');
        this.log = log; //important for this to go first. log errors
        this.filePath = filePath;
        this.data = this._loadData();
        this.debug_print = debug_print;
    }
    _printAcessInfo(Key = '', value, ID) {
        this.log(`blue underscore`, `| Key:${Key} Value: ${value} ID: ${ID}`, true, true, false);
        this.log(``, "| type - ${typeof(value)}", true, true, false);
        this.log(``, "| value - ${value}", true, true, false);
        this.log(``, "| destination - ${ID}.${Key}", true, true, false);
        return;
    }
    /**
     * Private Class Method. Called by the database when modifying adding or removing propereties
     * in order to keep the database up to date and clean.
     * @name SimpleDatabase#_loadData
     * @returns {fsObject} the loaded database
     */
    _loadData() {
        try {
            const data = fs_1.default.readFileSync(this.filePath, 'utf-8');
            if (data)
                return JSON.parse(data);
            else
                throw new types_1.Errors.fsDatabaseError(`SimpleDatabase_loadData() unable to load file`);
        }
        catch (error) {
            throw new types_1.Errors.fsDatabaseError(`SimpleDatabase_loadData() ${error}`);
        }
    }
    /**
     * Private Class Method. Called by the database each time a property is changed, added, or deleted
     * @name _saveData
     * @memberof SimpleDatabase
     * @returns {void}
     */
    _saveData() {
        try {
            fs_1.default.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), 'utf-8');
        }
        catch (error) {
            throw new types_1.Errors.fsDatabaseError(`SimpleDatabase_saveData() ${error}`);
        }
    }
    /**
     * #### Add a value to the database
     * --- 
     * Accepts formatted property string e.g "12312131123.config.embed_color" (returns the embed color of the guild)
     * Or a discord API object that can be resolved down into a unique [Snowflake]({.Snowflake}) ID 
     * 
     * @param {import("./types").fsIDResolvable} [property] [fsIDResolvable]({@link types_1.fsIDResolvable}) 
     * @param {Key} [string] string 
     * @param {any} value The new property to set.
     * @return {void}
     *
     */
    set(IDResolvable, Key, value) {
        let ID, current, exists;
        if (!this.data)
            throw new types_1.Errors.fsDatabaseError('data is undefined. Check to make sure you are loading the database file properly');
        if (Key && IDResolvable === undefined) {
            if (!(typeof (Key) === 'string'))
                throw new TypeError(`Excpected string for "Key", got ${typeof (Key)} instead`);
            ID = Key;
        }
        else
            ID = utilities_1.resolveID(IDResolvable);
        exists = this.has(ID);
        console.log()
        if (this.debug_print)
            this.log('green', 'Acessing database...', true, true, false);
        current = this.data[ID];
        if (Key === ID) {
            this.log(`yellow`, `Warn: this object will be appended to the root of the json structure`, true, true, false);
            current = this.data;
        }
        if (!current) {
            this.log('yellow', `Warn: ${Key} is not a property on ${ID}. Creating a new property`, true, true, false);
            this.data[ID] = {};
            current = this.data[ID];
            if (typeof (value) === 'object') {
                current[Key] = this._updateObject({}, value);
            }
            else
                current[Key] = value;
        }
        if (this.debug_print)
            this._printAcessInfo(Key, value, ID);
        if (Array.isArray(current[Key])) // the existing property is an array. 
         {
            if (Array.isArray(value)) //the new value is also an array. Merge.
             {
                try {
                    const appended = utilities_1.mergeArrays(current[`${Key}`], value);
                    current[Key] = appended;
                }
                catch (error) {
                    throw new types_1.Errors.fsDatabaseError(error);
                }
            }
            else //the existing property is an array, but the new value is not.
             {
                const arrayType = utilities_1.getArrayType(current[`${Key}`]).type;
                switch (arrayType) //make sure it's the correct datatype before pushing.
                 {
                    case types_1.DataTypes.Boolean:
                        if (typeof value === 'boolean') {
                            current[Key].push(value);
                            break;
                        }
                        else
                            throw new TypeError(`incorrect data type, expected boolean for ${Key} but got ${typeof value} instead`);
                    case types_1.DataTypes.String:
                        if (typeof value === 'string') {
                            current[Key].push(value);
                            break;
                        }
                        else
                            throw new TypeError(`incorrect data type, expected string for ${Key} but got ${typeof value} instead`);
                    case types_1.DataTypes.Number:
                        if (typeof value === 'number') {
                            current[Key].push(value);
                            break;
                        }
                        else
                            throw new TypeError(`incorrect data type, expected num for ${Key} but got ${typeof value} instead`);
                    case types_1.DataTypes.Object:
                        if (typeof (value) === 'object') {
                            // Check if the newObj already exists in arrayOfObjects
                            const exists = current[Key].some((obj) => obj === value);
                            console.log(exists);
                            if (!exists) {
                                current[Key].push(value);
                                break;
                            }
                            else
                                console.log('identical object. Returning');
                            return; //don't throw an error here. it just means we tried to push an identical object. not that big of a deal.
                        }
                        else
                            throw new TypeError(`incorrect data type, expected obj for ${Key} but got ${typeof value} instead`);
                    case types_1.DataTypes.Function:
                        if (typeof value === 'function') {
                            current[Key].push(value);
                            break;
                        }
                        else
                            throw new TypeError(`incorrect data type, expected function for ${Key} but got ${typeof value} instead`);
                    case types_1.DataTypes.Undefined:
                        if (typeof value === 'undefined') {
                            throw new TypeError(`the value is undefined, cannot append`);
                        }
                        else
                            this.log('yellow', `Warn: pushing data to an array of undefined. This will permanetely change the array's datatype`);
                    default:
                        if (this.debug_print)
                            this.log('green', `Info: This array is empty, and safe to append any datatype to`);
                        current[Key].push(value);
                        return;
                }
            }
        }
        else if (typeof current[Key] === 'object') {
            if (typeof value === 'object') {
                let updateValue = this._updateObject(value, current[Key]);
                current[Key] = updateValue;
                //this.data[ID] = current; 
            }
            else {
                current[Key] = value;
            }
        }
        else //the property key is not an array, or object, safe it add it.
         {
            current[Key] = value;
        }
        this.data[ID] = current;
        this._saveData();
        if (this.debug_print)
            this.log('green', 'done');
        return;
    }
    /**
     * #### Add a value to the root of the database manually 
     * ---
     * Sets a key-value pair at the root of the database instead of attaching it to a discord API object's Snowflake ID.
     * Useful for things that aren't easily indexed by snowflakes.
     * 
     * @param {string} [key]
     * @param {any} [value]
     * @returns {void}
     */
    setAtRoot(key, value) {
        if (!this.data)
            throw new types_1.Errors.fsDatabaseError('data is undefined. Check to make sure you are loading the database file properly');
        this.data[key] = value;
        this._saveData();
    }
    /**
     * #### Merge two objects together, keeping and updating the contents of the old
     * ---
     * @param {import('../types').fsObject} New
     * @param {import('../types').fsObject} Old
     * @returns {import('../types').fsObject}
     */
    _updateObject(New, Old) {
        // Create a new object with props. of old obj to update
        const combined = Object.assign({}, Old);
        // Iterate through props. in the new object
        for (const prop in New) {
            if (New.hasOwnProperty(prop)) {
                // Assign the prop. from the new object to the combined object, if that prop has 
                combined[prop] = New[prop];
            }
        }
        //Voici your new updated object, with all previous values intact. 
        return combined;
    }
    /**
     * #### Delete a value from the database file.
     * ---
     * @param {string} key
     * @returns {void}
     */
    deleteEntry(key) {
        if (!this.data)
            throw new types_1.Errors.fsDatabaseError('data is undefined. Check to make sure you are loading the database file properly');
        let current = this.data;
        //We're accessing a nested value. Split at '.'
        if (key.includes('.')) {
            let keys = key.split('.');
            keys.forEach((key, index) => {
                if (current[key]) {
                    if (index === keys.length - 1) {
                        delete current[key];
                        this._saveData();
                    }
                }
                current = current[key];
            });
        }
        else
            //the key string is one key. There are no nested values, or we just want to delete a root property.
            delete this.data[key];
        this._saveData();
    }
    /**
     * #### Sets the default cooldown time for a guild's configuration in the database file.
     * ---
     * @param {fsGuildIDResolvable} GuildResolvable
     * @param {number} cooldowntime
     * @returns {void}
     */
    setGuildCoolDown(GuildResolvable, cooldowntime) {
        if (!this.data)
            throw new types_1.Errors.fsDatabaseError('data is undefined. Check to make sure you are loading the database file properly');
        let guildID = utilities_1.resolveGuildID(GuildResolvable);
        if (guildID && this.has(guildID)) {
            let current = this.data[guildID];
            if (current.hasOwnProperty('config')) {
                current.config.default_cooldown = cooldowntime;
                this.data[guildID] = current;
                this._saveData();
                // this.data[guildID]['config']['default_cooldown'] = cooldowntime;
            }
            else {
                current.config = {};
                current.config.default_cooldown = cooldowntime;
                this.data[guildID] = current;
                this._saveData();
            }
        }
        else {
            //initalize a new object for the guild that does not exist 
            this.data[guildID] = {};
            this.data[guildID]['config'] = {};
            this.data[guildID]['config']['default_cooldown'] = cooldowntime;
        }
        return;
    }
    /**
     * updates, or creates a new value for a guild's configuration in the database file
     * @name SimpleDatabase#setGuildConfig
     * @param {fsIDResolvable} GuildResolvable
     * @param {string} configKey
     * @param {any} value
     * @returns {void}
     */
    setGuildConfig(GuildResolvable, configKey, value) {
        if (!this.data)
            throw new types_1.Errors.fsDatabaseError('data is undefined. Check to make sure you are loading the database file properly');
        let guildID = utilities_1.resolveGuildID(GuildResolvable);
        if (guildID && this.has(guildID)) {
            var current = this.data[guildID]['config'][configKey];
            if (Array.isArray(current)) {
                if (Array.isArray(value)) //the new value is also an array. Merge.
                 {
                    if (this.debug_print)
                        try {
                            const appended = utilities_1.mergeArrays(current, value);
                            current = appended;
                        }
                        catch (error) {
                            throw new types_1.Errors.fsDatabaseError(error);
                        }
                }
                else {
                    const arrayType = utilities_1.getArrayType(current).type;
                    switch (arrayType) //make sure it's the correct datatype before pushing.
                     {
                        case types_1.DataTypes.Boolean:
                            if (typeof value === 'boolean') {
                                current.push(value);
                                break;
                            }
                            else
                                throw new TypeError(`This array accepts boolean values, but got ${typeof value} instead`);
                        case types_1.DataTypes.String:
                            if (typeof value === 'string') {
                                current.push(value);
                                break;
                            }
                            else
                                throw new TypeError(`this array accepts string values, but got ${typeof value} instead`);
                        case types_1.DataTypes.Number:
                            if (typeof value === 'number') {
                                current.push(value);
                                break;
                            }
                            else
                                throw new TypeError(`this array accepts number values, but got ${typeof value} instead`);
                        case types_1.DataTypes.Object:
                            if (typeof value === 'object') {
                                current.push(value);
                                break;
                            }
                            else
                                throw new TypeError(`This array accepts object values, but got ${typeof value} instead`);
                        case types_1.DataTypes.Function:
                            if (typeof value === 'function') {
                                current.push(value);
                                break;
                            }
                            else
                                this.log("red", `This array accepts function() values, but got ${typeof value} instead`);
                        case types_1.DataTypes.Undefined:
                            //if the array has an undefined datatype, it's safe to push anything.
                            //undefined = brand new array, no datatype yet. datatype will be automatically handled after creation
                            current.push(value);
                            break;
                        default:
                            throw new types_1.Errors.fsDatabaseError('something is very fucked lmao');
                    }
                }
            }
            else if (typeof current === 'object') {
                if (typeof value === 'object') {
                    let updateValue = this._updateObject(current, value);
                    current = updateValue;
                }
            }
        }
        else {
            this.data[guildID] = {};
            this.data[guildID]['config'] = {};
            this.data[guildID]['config'][`${configKey}`] = value;
            this._saveData();
            return;
        }
        this.data[guildID]['config'][configKey] = value;
        this._saveData();
        if (this.debug_print)
            this.log('green', 'done', true, true, false);
        return;
    }
    /**
     * fetch the all of the configuration values from a guild's configuration in the database file.
     * @name SimpleDatabase#getGuildConfig
     * @param {Discord.GuildResolvable} GuildResolvable
     * @param {string} configKey
     * @returns {void | any}
     */
    getGuildConfig(GuildResolvable, configKey) {
        if (!this.data)
            throw new types_1.Errors.fsDatabaseError('data is undefined. Check to make sure you are loading the database file properly');
        let guildID = utilities_1.resolveGuildID(GuildResolvable);
        if (guildID && this.has(guildID)) {
            let current = this.data[guildID];
            if (current.hasOwnProperty('config')) {
                if (current.config.hasOwnProperty(configKey)) {
                    return current.config[configKey];
                }
                else {
                    return;
                }
            }
            else
                return;
        }
        else
            return;
    }
    /**
     * Sets the embed color value for a guild's configuration in the database file.
     * @name SimpleDatabase#setGuildEmbedColor
     * @param {Discord.GuildResolvable} GuildResolvable
     * @param {number || string } color
     * @returns {void}
     */
    setGuildEmbedColor(GuildResolvable, color) {
        if (!this.data)
            throw new types_1.Errors.fsDatabaseError('data is undefined. Check to make sure you are loading the database file properly');
        let guildID = utilities_1.resolveGuildID(GuildResolvable);
        if (guildID && this.has(guildID)) {
            let current = this.data[guildID];
            if (current.hasOwnProperty('config')) {
            }
            //this.data[guildID]['config']['default_cooldown'] = cooldowntime; 
        }
        else {
            //initalize a new object for the guild that does not exist 
            this.data[guildID] = {};
            this.data[guildID]['config'] = {};
            this.data[guildID]['config']['default_cooldown'] = color;
        }
    }
    /**
     * get any value in the database
     * @name get
     * @param {string} key
     * @returns {any} value, or {@link false} upon failure to find an associated value.
     */
    get(key) {
        if (!this.data)
            throw new types_1.Errors.fsDatabaseError('data is undefined. Check to make sure you are loading the database file properly');
        let current = this.data;

        if((typeof(key) === 'string') && utilities_1.IsSnowflake(key) && this.has(key))
        { 
           
            let id = utilities_1.resolveID(key);
            if(id && this.has(id))
            {
                current = this.data[id];
                if(key && current.hasOwnProperty(key))
                {
                    return this.data[id][key];
                }
                else
                {
                    this.data[id];
                }
            }
            else
            {
                throw new fsDatabaseError(`There is no data for ${types_1.fsSnowflakeType[utilities_1.getSnowflakeType(id)]}, with Snowflake ID ${id}`);
            }
        }
        else if (key.includes('.')) {
            let keys = key.split('.');
            for (let i = 0; i < keys.length; i++) {
                const k = keys[i];
                if (current[k]) {
                    current = current[k];
                }
                else {
                    return false;
                }
            }
            return current;
        }
        else {
            return this.data[key];
        }
    }
    /**
     * @name has
     * Check to see if a guild already has data in the db file.
     * @summary important to make sure the app doesn't crash accessing data
     * that doesn't yet exist. IMPORTANT. Different from hasKey in the sense that
     * hasKey() will search the ENTIRE db tree for matches, not just the root of the json tree.
     * They aren't intercompatible because guild id's may appear elsewhere in the db file farther down
     * and conflate the results.
     * @param {import("./types").fsIDResolvable} GuildResolvable object that can be resolved into an {@link Discord.Snowflake}
     * see {@link GuildResolvable} and
     * @returns {true} if the object has been stored in the database before, false if not.
     */
    has(fsIDResolvable, searchStr) {
        if (!this.data)
            throw new types_1.Errors.fsDatabaseError('data is undefined. Check to make sure you are loading the database file properly');
            let ref;
        if(fsIDResolvable && !searchStr){
        if (typeof (fsIDResolvable) === 'string'){
        if(utilities_1.IsSnowflake(fsIDResolvable) && fsIDResolvable in this.data){return true}
             ref = utilities_1.resolveID(fsIDResolvable);
            }}
        else if(!fsIDResolvable && searchStr){
            ref = searchStr; 
            let keys = ref.includes('.') ? ref.split('.') : ref;
            let current = this.data;
            for (const key of keys) {
                if (current.hasOwnProperty(key)) {
                    if((typeof(current[key]) === 'object'))
                     current = current[key];
                    else return true;
                }
                else {
                    return false; // Key doesn't exist in the data
                }
            }
        }
        else if(fsIDResolvable && searchStr){
            ref ={'id': utilities_1.resolveID(fsIDResolvable),"search": searchStr};
            let keys = ref.search.includes('.') ? ref.search.split('.') : ref.search;
            let current = this.data[ref.id];

            for (const key of keys) {
                if (current.hasOwnProperty(key)) {
                    if((typeof(current) === 'object'))
                     current = current[key];
                    else return true;
                }
                else {
                    return false; // Key doesn't exist in the data
                }
            }}
        else
            throw new types_1.Errors.fsDatabaseError('no search parameters provided');
        
        return false;
    }
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
    hasKey(key) {
        if (!this.data)
            throw new types_1.Errors.fsDatabaseError('data is undefined. Check to make sure you are loading the database file properly');
        let keys = key.includes('.') ? key.split('.') : key;
        let current = this.data;
        for (const key of keys) {
            if (current.hasOwnProperty(key)) {
                current = current[key];
                return true;
            }
            else {
                return false; // Key doesn't exist in the data
            }
        }
        // If the key is not found in the current object or its descendants, return false
        return false;
    }
    /**
     * Grab the entire database as one object
     * @name SimpleDatabase#getAllData
     * @returns {object}
     *  @throws {Error} If data does not exist
     */
    getAllData() {
        if (this.data)
            return this.data;
        else
            throw new types_1.Errors.fsDatabaseError('the data for this database has not been initalized yet!');
        /**
        *  The lazy low iq solution to a hosted database
        *  certified Eli™ crackhead ducktape
        *  @name SimpleDatabase
        */
    }
}
exports.SimpleDatabase = SimpleDatabase;
exports.default = SimpleDatabase;
