"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleDatabase  = void 0;
//const {Log} = require('../utils/utilities');
const Discord = require('discord.js');
const fs_1 = __importDefault(require("fs"));
const types_1 =require('../structures/types');
const {fsGuild, fsGuildConfig} = require('../structures/fsGuild');
const {fsUser} = require('../structures/fsUser');
const{getSnowflakeType}= require("./utilities");
const utilities_1 = require("./utilities");
const {PonyExp} = require('./exp');
const { unescape } = require('querystring');

/**
 *  The lazy low iq solution to a hosted database
 *  certified Eli™ crackhead ducktape.
 *  Author: [EllyPony]({@link EllyPonyUrl})
 */
class SimpleDatabase {
/**
 * Creates an instance of SimpleDatabase.
 * @param {string} [filePath='']
 * @param {Function} log
 * @param {boolean} [debug_print=false]
 */
constructor(filePath = 'assets/db.json', debug_print=false) {

    //#### Member constants // 
    this.debug_print = debug_print;
    this.filePath = filePath;
    
    //if (!log || !(typeof (log) === 'function'))
        //throw Error('cannot instantize SimpleDatabase without a Log function!');
   
  
    //#### Member Acessors //   (this.data is both acessor and constant)
     //critical that this is the first *method* called in the constructor
    this._guilds = new Map(); 
    this._users = new Map(); 
    this.data = this._loadData();
   
}
_printAcessInfo(Key = '', value, ID) {
    // this.log(`blue underscore`, `| Key:${Key} Value: ${value} ID: ${ID}`, true, true, false);
    // this.log(``, "| type - ${typeof(value)}", true, true, false);
    // this.log(``, "| value - ${value}", true, true, false);
    // this.log(``, "| destination - ${ID}.${Key}", true, true, false);
    return;
}
/**
 * Private Class Method. Called by the database when modifying adding or removing propereties
 * in order to keep the database up to date and clean.
 * @returns {object} the loaded database
 */
_loadData() {
    
        const data = fs_1.default.readFileSync(this.filePath, 'utf-8');
        if (data)
        {   const dat = JSON.parse(data); 
            Object.keys(dat).forEach((key, index)=>
            { 
            
                if(dat[key].hasOwnProperty('GuildId'))
                { 
                    this._guilds.set(key, new fsGuild(dat[key], new fsGuildConfig()));
                }
                else if(dat[key].hasOwnProperty('UserId'))
                {
                    this._users.set(key, new fsUser(key,dat[key].PonyExp, dat[key].server_quotes));
                }
            })

            return dat;
        }
          
        else
            throw new Error(`SimpleDatabase_loadData() unable to load file`);
    
    
}

/**
 * All users currently registered in the database. 
 * 
 * @returns {Map<Snowflake, fsUser>} empty Map() if none
 */
get users()
{
    if(!this.data)
        throw new types_1.fsDatabaseError('SimpleDatabase.js 68: Cannot load Users, data is undefined!');
    
   
    for(const ID in this.data)
    { 
        if(this.data[ID] && this.data[ID].hasOwnProperty('UserId'))
        {   
            this._users.set(new fsUser(ID, this.data[ID].exp, this.data[ID].server_quotes));
        }   
    }
    this._saveData();
    return this._users; 
}

/**
 * All Guilds currently registered in the database. 
 * 
 * @returns {Map<Snowflake, fsGuild} empty Map() if none
 */
get guilds()
{
    if(!this.data)
    throw new types_1.fsDatabaseError('SimpleDatabase.js 68: Cannot load Users, data is undefined!');
    

for(const ID in this.data)
{
    if(this.data[ID] && this.data[ID].hasOwnProperty('GuildId'))
        {   
            this._guilds.set(new fsGuild(ID, this.data[ID].config));
        }   
}
    //console.log(ID);
    // console.log(this.data[ID], this.data[ID] instanceof fsGuild);
 this._saveData();
return this._guilds; 
}
/**
 * Private Class Method. Called by the database each time a property is changed, added, or deleted
 * @private
 * @returns {void}
 */
_saveData() {

    if(!this.data)
        throw new types_1.fsDatabaseError('SimpleDatabase.js 139 _saveData(): this.data is null or undefined, cannot write data that does not exist');
    
    if(this._guilds.size > 0)
        this._guilds.forEach((guild, id) =>
         {
            this.data[id] = guild; 
         });
    if(this._users.size >0)
        this._users.forEach((user, id) =>
        {
         this.data[id] = user; 
        });

    try {
        fs_1.default.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), 'utf-8');
    }
    catch (error) {
        throw new Error(`SimpleDatabase_saveData() ${error}`);
    }
}
/**
 * Add a value to the database
 * 
 * @param {import('../types').fsIDResolvable} fsIDResolvable 
 * @param {string} [Key]
 * @param {any} value 
 * @return {void}
 *
 */
set(fsIDResolvable, Key, value) {
    let ID, current, exists;
    ID = utilities_1.resolveID(fsIDResolvable);
    if (!this.data)
        throw new Error('data is undefined. Check to make sure you are loading the database file properly');
    if (!Key && !fsIDResolvable) {
        if (!(typeof (Key) === 'string'))
            throw new TypeError(`Excpected string for "Key", got ${typeof (Key)} instead`);
        ID = Key;
    }
    if(fsIDResolvable && !Key && !value)
    {
        if(this.has(ID)){
            if((typeof(fsIDResolvable) === typeof(this.data[ID])))
                this.data[ID] = fsIDResolvable; //ensure that overwriting existing data by appending loosely to the root is impossible
           else 
                 throw new types_1.fsDatabaseError(`cannot overwrite an existing root ${types_1.fsSnowflakeType[getSnowflakeType(ID)]} property with a new value of ${typeof(value)}`);
               
            } 
            this.data[ID] = fsIDResolvable; 
            this._saveData();
    }
    else if (!Key && fsIDResolvable)
    {
        if(this.has(ID)){
        if((typeof(value) === typeof(this.data[ID])))
            this.data[ID] = value; //ensure that overwriting existing data by appending loosely to the root is impossible
       else 
             throw new types_1.fsDatabaseError(`cannot overwrite an existing root ${types_1.fsSnowflakeType[getSnowflakeType(ID)]} property with a new value of ${typeof(value)}`);
           
        } 
        this.data[ID] = value; 
        this._saveData();
    }
     
       
    exists = this.has(ID);
    //if (this.debug_print)
        // this.log('green', 'Acessing database...', true, true, false);
    current = this.data[ID];
    if (Key === ID) {
        // this.log(`yellow`, `Warn: this object will be appended to the root of the json structure`, true, true, false);
        current = this.data;
    }
    if (!current) {
        // this.log('yellow', `Warn: ${Key} is not a property on ${ID}. Creating a new property`, true, true, false);
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
                throw new Error(error);
            }
        }
        else //the existing property is an array, but the new value is not.
            {
            const arrayType = utilities_1.getArrayType(current[`${Key}`]).type;
            switch (arrayType) //make sure it's the correct datatype before pushing.
                {
                case types_1.fsDataTypes.Boolean:
                    if (typeof value === 'boolean') {
                        current[Key].push(value);
                        break;
                    }
                    else
                        throw new TypeError(`incorrect data type, expected boolean for ${Key} but got ${typeof value} instead`);
                case types_1.fsDataTypes.String:
                    if (typeof value === 'string') {
                        current[Key].push(value);
                        break;
                    }
                    else
                        throw new TypeError(`incorrect data type, expected string for ${Key} but got ${typeof value} instead`);
                case types_1.fsDataTypes.Number:
                    if (typeof value === 'number') {
                        current[Key].push(value);
                        break;
                    }
                    else
                        throw new TypeError(`incorrect data type, expected num for ${Key} but got ${typeof value} instead`);
                case types_1.fsDataTypes.Object:
                    if (typeof (value) === 'object') {
                        // Check if the newObj already exists in arrayOfObjects
                        const exists = current[Key].some((obj) => obj === value);
                       
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
                case types_1.fsDataTypes.Function:
                    if (typeof value === 'function') {
                        current[Key].push(value);
                        break;
                    }
                    else
                        throw new TypeError(`incorrect data type, expected function for ${Key} but got ${typeof value} instead`);
                case types_1.fsDataTypes.Undefined:
                    if (typeof value === 'undefined') {
                        throw new TypeError(`the value is undefined, cannot append`);
                    }
                    else
                         console.log(`Warn: pushing data to an array of undefined. This will permanetely change the array's datatype`);
                default:
                    if (this.debug_print)
                        // this.log('green', `Info: This array is empty, and safe to append any datatype to`);
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
    //if (this.debug_print)
        // this.log('green', 'done');
    return;
}
/**
 * Add a value to the root of the database manually 
 * @param {string} [key]
 * @param {any} [value]
 * @returns {void}
 */
setAtRoot(key, value) {
    if (!this.data)
        throw new Error('data is undefined. Check to make sure you are loading the database file properly');
    this.data[key] = value;
    this._saveData();
}

addGuild(fsGuildIDResolvable)
{
   if (!this.data)
    throw new Error('data is undefined. Check to make sure you are loading the database file properly');
   else 
     try{
        const ID = utilities_1.resolveID(fsGuildIDResolvable);
        this.data[ID] = fsGuildIDResolvable;
        this._saveData();
      return;
    }
    catch(error)
    {
        console.log(error);
    }
   return;
}
/**
 * Merge two objects together, keeping and updating the contents of the old
 * @param {object} New
 * @param {object} Old
 * @returns {object}
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
 *Delete a value from the database file.
 * @param {string} key
 * @returns {void}
 */
deleteEntry(key) {
    if (!this.data)
        throw new Error('data is undefined. Check to make sure you are loading the database file properly');
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
 * Sets a default cooldown time for a guild
 * 
 * @param {fsGuildIDResolvable} Guild
 * @param {number} cooldowntime seconds
 * @returns {void}
 */
setGuildCoolDown(Guild, cooldowntime) {
    if (!this.data)
        throw new Error('data is undefined. Check to make sure you are loading the database file properly');
    let guildID = utilities_1.resolveGuildID(Guild);
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
 * set a value in a guild's configuration 
 * @param {fsGuildIDResolvable} Guild
 * @param {string} configKey
 * @param {any} value
 * @return {void}
 */
setGuildConfig(Guild, configKey, value) {
    if (!this.data)
        throw new Error('data is undefined. Check to make sure you are loading the database file properly');
    let guildID = utilities_1.resolveGuildID(Guild);
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
                        throw new Error(error);
                    }
            }
            else {
                const arrayType = utilities_1.getArrayType(current).type;
                switch (arrayType) //make sure it's the correct datatype before pushing.
                    {
                    case types_1.fsDataTypes.Boolean:
                        if (typeof value === 'boolean') {
                            current.push(value);
                            break;
                        }
                        else
                            throw new TypeError(`This array accepts boolean values, but got ${typeof value} instead`);
                    case types_1.fsDataTypes.String:
                        if (typeof value === 'string') {
                            current.push(value);
                            break;
                        }
                        else
                            throw new TypeError(`this array accepts string values, but got ${typeof value} instead`);
                    case types_1.fsDataTypes.Number:
                        if (typeof value === 'number') {
                            current.push(value);
                            break;
                        }
                        else
                            throw new TypeError(`this array accepts number values, but got ${typeof value} instead`);
                    case types_1.fsDataTypes.Object:
                        if (typeof value === 'object') {
                            current.push(value);
                            break;
                        }
                        else
                            throw new TypeError(`This array accepts object values, but got ${typeof value} instead`);
                    case types_1.fsDataTypes.Function:
                        if (typeof value === 'function') {
                            current.push(value);
                            break;
                        }
                        else
                            this.log("red", `This array accepts function() values, but got ${typeof value} instead`);
                    case types_1.fsDataTypes.Undefined:
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
    if (this.debug_print)
        // this.log('green', 'done', true, true, false);
    return;
}
/**
 * fetch the all of the configuration values from a guild's configuration in the database file.
 * @param {import('../types').fsGuildIDResolvable} Guild
 * @param {string} configKey
 * @returns {void | any}
 */
getGuildConfig(Guild, configKey) {
    if (!this.data)
        throw new Error('data is undefined. Check to make sure you are loading the database file properly');
    let guildID = utilities_1.resolveGuildID(Guild);
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
 * @param {fsGuildIDResolvable} Guild 
 * @param {number || string } color
 * @returns {void}
 */
setGuildEmbedColor(Guild, color) {
    if (!this.data)
        throw new Error('data is undefined. Check to make sure you are loading the database file properly');
    let guildID = utilities_1.resolveGuildID(Guild);
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
/**
 *
 * #### Check to see if a guild already has data in the db file.
 * important to make sure the app doesn't crash accessing data
 * that doesn't yet exist. IMPORTANT. Different from hasKey in the sense that
 * hasKey() will search the ENTIRE db tree for matches, not just the root of the json tree.
 * They aren't intercompatible because guild id's may appear elsewhere in the db file farther down
 * and conflate the results.
 * ---
 * @param {import("../types").fsIDResolvable} fsIDResolvable object that can be resolved into an {@link Discord.Snowflake}
 * see {@link fsIDResolvable} 
 * @returns {Boolean} 
 */
has(fsIDResolvable) {
    if (!this.data)
        throw new Error('data is undefined. Check to make sure you are loading the database file properly');
        let ref;
    if((typeof(fsIDResolvable) === 'string') || (typeof(fsIDResolvable) === 'number')){ 
        if(utilities_1.IsSnowflake(fsIDResolvable)){
        if(fsIDResolvable in this.data){return true}}
        else {
            let keys = fsIDResolvable.toString().includes('.') ? ref.split('.') : fsIDResolvable.toString();
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
        }}
    else
        throw new Error('no search parameters provided');
    
    return false;
}
/**
 * Check to see if a key has at any point on the json structure.
 * 
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
        throw new Error('data is undefined. Check to make sure you are loading the database file properly');
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
 * add a user to the list of quarantined user IDs in a guild
 * @param {fsUserIDResolvable} User
 * @param {fsGuildIDResolvable} Guild
 * @return {void} 
 * 
 */
quarantine(User, Guild)
    {   let user = utilities_1.resolveUserID(User);
        const guild = this.data[utilities_1.resolveGuildID(Guild)];
        
        if(!this.data)
            throw new types_1.fsDatabaseError('database is null, unable to quaratine user.');
        else if(!User || !Guild)
            throw new types_1.fsDatabaseError('a valid user resolvable, and guild resolvable object are required');
        else if(!user)
            throw new types_1.fsDatabaseError('cannot quarantine unable to resolve user Id');
        else if (!guild)
          throw new types_1.fsDatabaseError('cannot quarantine unable to resolve guild Id');
        else 
            if(guild.hasOwnProperty('config') ){
            if(guild.config.hasOwnProperty('quarantined')|| Array.isArray(guild.config.quarantined)){
                //check to make sure we aren't adding the same value twice 
                if(guild.config.quarantined.includes(user))
                 return console.log('user is already quarantined');
                else
                 return guild.config.quarantined.push(user);
                }
                
            
            else
            {
                guild.config.quarantined = [];
                guild.config.quarantined.push(user);
                return;
            }
            }
            else
            {
                guild.config = {}; 
                guild.config.quaranined = []; 
                guild.config.quaranined.push(user);
                return;
            }
        }
/**
 * get list of  quarantined user IDs in a guild
 * @param {fsGuildIDResolvable} Guild
 * @return {fsSnowflakeArray} 
 */
getQuarantined(Guild)
    {
        if(!this.data)
         throw new types_1.fsDatabaseError('database is undefined, cannot fetch quarantine data on this guild');
        
         const guild = this.data[utilities_1.resolveGuildID(Guild)];
         if(!guild)
            return;
        //this massive else-if is just to ensure that if a config property is accessed on a guild where it doesn't yet exist
        //it'll be created and won't cause any problems in the future.
         if(guild.hasOwnProperty('config') )
         {
            if(guild.config.hasOwnProperty('quarantined') && Array.isArray(guild.quaranined))
            {
                return guild.configquaranined; 
            }
            else
            {
                guild.config.quarantined = [];
                return undefined;
            }
         }
         else
         {
             guild.config = {}; 
             guild.config.quaranined = []; 
             return undefined;
         }
    
    }
/**
* get the entire database as one object
* @return {object}
*/
getAllData() {
    if (this.data)
        return this.data;
    else
        throw new Error('the data for this database has not been initalized yet!');
}


}



exports.default = SimpleDatabase;
exports.SimpleDatabase = SimpleDatabase;

