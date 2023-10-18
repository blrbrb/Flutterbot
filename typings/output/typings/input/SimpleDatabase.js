"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleDatabase = void 0;
const fs_1 = __importDefault(require("fs"));
const types_1 = require("./types");
const utilities_1 = require("./utilities");
/**
 * SimpleDatabase
 * @author Ellypony
 */
class SimpleDatabase {
    constructor(filePath = '', debug_print = true) {
        this.log = utilities_1.Log;
        /**
        * @param filePath @type {string} @param logger @type {Log} @param debug_print @type {boolean}  - Brief description of the parameter here. Note: For other notations of data types, please refer to JSDocs: DataTypes command.
        * @return {SimpleDatabase}
        */
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
            return JSON.parse(data);
        }
        catch (error) {
            console.error('Error loading data:', error);
            return { "": 0 };
        }
    }
    /**
     * Private Class Method. Called by the database each time a property is changed, added, or deleted
     * @name SimpleDatabase#_saveData
     * @returns {void}
     */
    _saveData() {
        fs_1.default.writeFile(this.filePath, JSON.stringify(this.data, null, 2), 'utf-8', (error) => {
            if (error) {
                console.error('Error saving data:', error);
            }
        });
    }
    /**
     * Modify a value in the database
     * @name SimpleDatabase#set
     * @param {string} key
     * @param {any} value
     * @returns {void}
     *
     */
    set(IDResolvable, Key, value) {
        let ID, current, exists;
        if (Key && IDResolvable === undefined) {
            if (!(typeof (Key) === 'string'))
                throw new TypeError(`Excpected string for "Key", got ${typeof (Key)} instead`);
            ID = Key;
        }
        else
            ID = (0, utilities_1.resolveID)(IDResolvable);
        exists = this.hasGuild(ID);
        this.log('green', 'Acessing database...', true, true, false);
        current = this.data[ID];
        if (Key === ID) {
            this.log(`green`, `notice: this object will be appended to the root of the json structure`, true, true, false);
            current = this.data;
        }
        if (!current) {
            this.log('yellow', `${Key} is not a property on ${ID}. Creating a new property`, true, true, false);
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
            this.log(`and it's an array`);
            if (Array.isArray(value)) //the new value is also an array. Merge.
             {
                this.log("", 'the new value is also an array...', true, true, false);
                try {
                    const appended = (0, utilities_1.mergeArrays)(current[`${Key}`], value);
                    current[Key] = appended;
                }
                catch (error) {
                    console.log(error);
                }
            }
            else //the existing property is an array, but the new value is not.
             {
                const arrayType = (0, utilities_1.getArrayType)(current[`${Key}`]).type;
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
                            return console.log(`something is very wrong lol`);
                    default:
                        console.log(`This array is empty, and safe to append any datatype to`);
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
        this.log('green', 'done', true, true, false);
        return;
    }
    /**
     * @summary Set a key-value at the root of the database instead of attaching it to a discord API object.
     * Useful for things that aren't easily indexed by snowflakes.
     * @name SimpleDatabase#setAtRoot
     * @param {string} key
     * @param {any} value
     * @returns {void}
     */
    setAtRoot(key, value) {
        this.data[key] = value;
        this._saveData();
    }
    /**
     * merge two class objects together, keeping and updating the contents of the old
     * @name SimpleDatabase#_updateObject
     * @param {fsObject} New
     * @param {fsObject} Old
     * @returns {object}
     */
    _updateObject(New, Old) {
        // Create a new object with props. of old obj to update
        const combined = Object.assign({}, Old);
        // Iterate through props. in the new object
        for (const prop in New) {
            if (New.hasOwnProperty(prop)) {
                // Assign the prop. from the new object to the combined object, if that prop hasGuild 
                combined[prop] = New[prop];
            }
        }
        //Voici your new updated object, with all previous values intact. 
        return combined;
    }
    /**
     * Deletes a value from the database file.
     * @name SimpleDatabase#deleteEntry
     * @param {string} key
     * @returns {void}
     */
    deleteEntry(key) {
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
     * sets the default cooldown time for a guild's configuration in the database file.
     * @name SimpleDatabase#setGuildCoolDown
     * @param {Discord.Snowflake} GuildResolvable
     * @param {number} cooldowntime
     * @returns {void}
     */
    setGuildCoolDown(GuildResolvable, cooldowntime) {
        try {
            let guildID = (0, utilities_1.resolveGuildID)(GuildResolvable);
            if (guildID && this.hasGuild(guildID)) {
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
        }
        catch (error) {
            console.log(error);
            return;
        }
    }
    /**
     * updates, or creates a new value for a guild's configuration in the database file
     * @name SimpleDatabase#setGuildConfig
     * @param {Discord.GuildResolvable} GuildResolvable
     * @param {string} configKey
     * @param {any} value
     * @returns {void}
     */
    setGuildConfig(GuildResolvable, configKey, value) {
        try {
            let guildID = (0, utilities_1.resolveGuildID)(GuildResolvable);
            if (guildID && this.hasGuild(guildID)) {
                var current = this.data[guildID]['config'][configKey];
                if (Array.isArray(current)) {
                    if (Array.isArray(value)) //the new value is also an array. Merge.
                     {
                        if (this.debug_print)
                            try {
                                const appended = (0, utilities_1.mergeArrays)(current, value);
                                current = appended;
                            }
                            catch (error) {
                                this.log('red', error);
                            }
                    }
                    else {
                        const arrayType = (0, utilities_1.getArrayType)(current).type;
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
                                throw new Error('something is very fucked lmao');
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
            this.log('green', 'done', true, true, false);
        }
        catch (error) {
            this.log('red', error);
            return;
        }
    }
    /**
     * fetch the all of the configuration values from a guild's configuration in the database file.
     * @name SimpleDatabase#getGuildConfig
     * @param {Discord.GuildResolvable} GuildResolvable
     * @param {string} configKey
     * @returns {void | any}
     */
    getGuildConfig(GuildResolvable, configKey) {
        try {
            let guildID = (0, utilities_1.resolveGuildID)(GuildResolvable);
            if (guildID && this.hasGuild(guildID)) {
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
        catch (error) {
            this.log("red", error);
            return;
        }
    }
    /**
     * Sets the embed color value for a guild's configuration in the database file.
     * @name SimpleDatabase#setGuildEmbedColor
     * @param {Discord.GuildResolvable} GuildResolvable
     * @param {number || string } color
     * @returns {void}
     */
    setGuildEmbedColor(GuildResolvable, color) {
        try {
            let guildID = (0, utilities_1.resolveGuildID)(GuildResolvable);
            if (guildID && this.hasGuild(guildID)) {
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
        catch (error) {
            this.log("red", error);
            return;
        }
    }
    /**
     * get any value in the database
     * @name get
     * @param {string} key
     * @returns {any} value, or {@link false} upon failure to find an associated value.
     */
    get(key) {
        let current = this.data;
        if (key.includes('.')) {
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
     * @name hasGuild
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
    hasGuild(GuildResolvable) {
        let ID = (0, utilities_1.resolveGuildID)(GuildResolvable);
        if ((0, utilities_1.IsSnowflake)(ID) && ID in this.data)
            return true;
        else if (typeof (GuildResolvable) === 'string') {
            let keys = GuildResolvable.includes('.') ? GuildResolvable.split('.') : GuildResolvable;
            let current = this.data;
            for (const key of keys) {
                if (current.hasOwnProperty(key)) {
                    current = current[key];
                }
                else {
                    return false; // Key doesn't exist in the data
                }
            }
            return true;
        }
        return false;
    }
    /**
     * Check to see if a key hasGuild at any point on the json structure.
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
            throw new Error('the data for this database has not been initalized yet!');
        /**
        *  The lazy low iq solution to a hosted database
        *  certified Eli™ crackhead ducktape
        *  @name SimpleDatabase
        */
    }
}
exports.SimpleDatabase = SimpleDatabase;
exports.default = SimpleDatabase;
