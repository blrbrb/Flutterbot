const fs = require('fs');
const Discord = require('discord.js');
const chrono = require('chrono-node');
const { strict } = require('assert');
const crypto = require('crypto');
const { assert } = require('console');
const { config } = require('dotenv');

const DataTypes = {
  Undefined: 0,
  Number: 1,
  String: 2,
  Boolean: 3,
  Object: 4,
  Function: 6,
};

const colors = {
    "": "\x1b[0m",
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",

    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    gray: "\x1b[90m",
    grey: "\x1b[90m",

    bgblack: "\x1b[40m",
    bgred: "\x1b[41m",
    bggreen: "\x1b[42m",
    bgyellow: "\x1b[43m",
    bgblue: "\x1b[44m",
    bgmagenta: "\x1b[45m",
    bgcyan: "\x1b[46m",
    bgwhite: "\x1b[47m",
    bggray: "\x1b[100m",
    bggrey: "\x1b[100m"
}
/**
 * @param {boolean} logAll 
 * true by default
 * true enables all logging in the file
 * false disables log calls that doesn't enable the forced parameter
 * NOTE: the forced param will not work if modifierList isnt provided
 */
function Log(logAll = true, tofile = true) {
    !logAll && console.log(`${colors.bright}${colors.red}TAKE CARE TO NOTE LOGALL IS DISABLED${colors.reset}`);
    /**
     * @param {string} modifierList
     * examples:
     * log("bright red", "Error");
     * log("bggreen blue", "Success!");
     * 
     * @param {any} message
     * the body of the log
     * 
     * @param {boolean} forced
     * false by default
     * NOTE: the forced param will not work if modifierList isnt provided
     */
    return function (modifierList, message, forced) {
        if (!logAll && !forced) return;
        if (Array.isArray(message)) {
            message = message.join(" ");
        }
        if (message === undefined) {
            message = modifierList;
            modifierList = "";
        }
       
        let pirate = modifierList.toLowerCase().split(" ");
        let combine = "";
        pirate.forEach(c => colors[c] ? combine += colors[c] : null);
        console.log(`${combine}${message}${colors.reset}`);  

        if (tofile){
          fs.appendFile('Flutterbot.log', message + '\n', (err) => {
            if (err) {
              console.error('Error writing to log file:', err);
            }
          });
        }
    }
}
const log = new Log(true);

function isValidHexColor(color) {
   
   const hexColorPattern = /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

  
   return hexColorPattern.test(color);
  
}

function ID() {
    this.generate = function () {
        return new Date().valueOf();
    }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`;
}


function displayList(array) {
    if (!array.length) return log("bright green", "\nEmpty\n");
    let headers = Object.keys(array[0]);
    let table = new Array(array.length + 2).fill().map(() => new Array(headers.length));
    for (let i = 0; i < headers.length; i++) {
        let h_fixed = headers[i].split("_").filter(x => x).map(x => x[0].toUpperCase() + x.slice(1).toLowerCase()).join(' ');
        table[0][i] = h_fixed;
        for (let j = 0; j < array.length; j++) {
            let d = array[j][headers[i]];
            table[2 + j][i] = String(d);
        }
        let mCount = 0;
        for (let j = 0; j < table.length; j++) {
            if (j == 1) continue;
            mCount = Math.max(mCount, table[j][i].length);
        }
        table[1][i] = ("").padEnd(mCount, "-");
        for (let j = 0; j < table.length; j++) {
            if (j == 1) continue;
            table[j][i] = table[j][i].padEnd(mCount, " ");
        }
    }
    table.map(pirate => pirate.join("  "));
    log("");
    for (let i = 0; i < table.length; i++) {
        if (i == 0) log("bright blue", table[i]);
        else if (i == 1) log("bright white", table[i]);
        else log("bright green", table[i]);
    }
    log("");
    return;
}


/**
 * Resolve (fetch) a guild id from any discord.js type that might have it. 
 * Can be used to check if an object is resolveable by guild id. 
 * @param {any} object
 * @returns {Discord.Snowflake} Guild ID on success
 * @returns {false} on failure 
 */
function resolveGuildID(object) 
{
  let guildID = 0;
 
  if (object instanceof Discord.Guild) {
   
    guildID = object.id; 
    console.log(guildID);
    return guildID;
  } else if (object.guild && object.guild instanceof Discord.Guild) {
   
    guildID = object.guild.id;
   
    return guildID;
  }
 else {
    // If the object doesn't contain a Guild object or a 'guild' property with 'id', return false
    return false;
  }
}

function resolveUserID(object)
{
  let UserID = 0;
  console.log('checking properties');
  if (object instanceof Discord.User) {
   
    UserID = object.id; 
    console.log(UserID);
    return UserID;
  } else if (object.user && object.user instanceof Discord.User) {
    console.log('has user property');
    return object.user.id; 
  }
  else if (object.member && object.member instanceof Discord.User)
  {
    console.log('has member property');
     return object.member.id;
  }
  else if (object.author && object.author instanceof Discord.User)
  {
    console.log('has author property'); 
    return object.author.id;
  }
 else {
    // If the object doesn't contain a Guild object or a 'guild' property with 'id', return false
    return false;
  }

}




function ProgressBar(current, whole)
{
  //This is NOT my code. 
  //All emily. Just making it so that I can use it elsewhere also 
  if(current > whole)
  {
    return "cant calculate percentage to display";
  }

  let Percent = (current / whole) * 100;
  let PerTen = Math.floor(Percent / 10);
  let percentBar = `${'🟥'.repeat(PerTen)}${'⬜'.repeat(10 - PerTen)}`;
  return percentBar; 
}
function removeEveryoneMentions(text) {
  // Define regex pattern to match @everyone mentions
  const pattern = /@everyone/g;

  // Use String.replace() to replace all matches of the pattern with an empty string
  const updatedText = text.replace(pattern, "");

  // Return the updated text
  return updatedText;
}

function format(template, replacements) {
  return template.replace(/\${(.*?)}/g, (match, key) => {
    // Check if the key exists in replacements, otherwise, return the original match
    return replacements.hasOwnProperty(key) ? replacements[key] : match;
  });
}


class SimpleDatabase {
  /**
   *  The lazy low iq solution to a hosted database 
   *  certified Eli™ crackhead ducktape  
   * @param {string} filePath
   * @returns {void}
   */
  constructor(filePath) {
    this.filePath = filePath;
    this.data = this.loadData();
    
  }
  

  /**
   * Private Class Method. Called by the database when modifying adding or removing propereties 
   * in order to keep the database up to date and clean.
   * @returns {any}
   */
  loadData() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading data:', error);
      return {};
    }
  }

   /**
   * Private Class Method. Called by the database each time a property is changed, added, or deleted
   * @returns {undefined}
   */
  saveData() {
   
    fs.writeFile(this.filePath, JSON.stringify(this.data, null, 2), 'utf-8', (error) => {
      if (error) {
        console.error('Error saving data:', error);
      }
    });
  }

  /**
   * Access a value in the database
   * @param {String} key 
   * @param {any} value 
   * @returns {any} Data associated with key.
   * @returns {undefined} if key does not exist. (will also auto-initalize the key that isn't found)
   */
  set(IDResolveable, Key, value)
  {
    
   let ID  = resolveGuildID(IDResolveable) ? resolveGuildID(IDResolveable) : resolveUserID(IDResolveable);

    if(ID && this.Exists(ID)) //the guild already exists in the database.
    {
      let current = this.data[ID]; 

      if(Key === ID)
      {
        //log("red underscore",`Warn: SimpleDatabase:set() cannot assign a property as ${ID}, the parent object is already ${ID}!`);
        current = this.data; 
        //return;
      }

    

      if(current.hasOwnProperty(Key)) //the property key already exists 
      { 
        if(Array.isArray(current[Key])) // the existing property is an array. 
        {
          if(Array.isArray(value)) //the new value is also an array. Merge.
          {
            try
            { 
             
              const appended = this.mergeArrays(current[`${Key}`], value); 
              current[`${Key}`] = appended; 
            }
            catch(error)
            {
              console.log(error);
            }
          }   
          else //the existing property is an array, but the new value is not.
          {
            console.log(this.getArrayType(current[`${Key}`]));
            const arrayType = this.getArrayType(current[`${Key}`]).type; 
            switch(arrayType) //make sure it's the correct datatype before pushing.
            {
              case DataTypes.Boolean:
                if(typeof value === 'boolean'){
                  current[Key].push(value);
                  this.data[ID] = current; 
                  this.saveData(); 
                  return; 
                  }
                else  
                  console.log(`incorrect data type, expected boolean but got ${typeof value} instead`);
              case DataTypes.String: 
                if (typeof value === 'string'){
                  current[Key].push(value);
                   this.data[ID] = current; 
                   this.saveData(); 
                   return;
                }
                else
                  console.log(`incorrect data type, expected string but got ${typeof value} instead`);
              case DataTypes.Number: 
                if(typeof value === 'number'){
                 current[Key].push(value);
                 this.data[ID] = current; 
                 this.saveData(); 
                 break;
                }
                else 
                console.log(`incorrect data type, expected num but got ${typeof value} instead`);
              case DataTypes.Object: 
                if(typeof value === 'object'){
                  current[Key].push(value);
                  this.data[ID] = current; 
                  this.saveData(); 
                  return;
                  
                }
                else 
                  console.log(`incorrect data type, expected obj but got ${typeof value} instead`);
              case DataTypes.Function: 
                if(typeof value === 'function'){
                   current[Key].push(value);
                   this.data[ID] = current; 
                   this.saveData(); 
                   return;
                  }
                else 
                   console.log(`incorrect data type, expected function but got ${typeof value} instead`);
              case DataTypes.Undefined: 
                  if(typeof value === 'undefined') 
                  {
                     console.log(`the value is undefined, cannot append`) 
                     break;
                  }
                  else 
                    console.log(`something is very wrong lol`);
                  break;
              default: 
                  console.log(`something is fucked`, typeof value);
            } 
            //Make sure the new value is the correct DataType
          }

        }
        else if (typeof current[Key] === 'object')
        {
          if(typeof value === 'object')
          {
              
            let updateValue = this.updateObject(current[Key], value); 
            console.log('updated object:',updateValue);
           
          
            current = updateValue; 
            this.data[ID] = current; 
            this.saveData(); 
            return;
          } 
          
        }
        
        
      }
      else { //the property key is not an array, or object, safe it add it.
        current[Key] = {}; 
        
        current[Key] = value;
        this.data[ID] = current; 
        this.saveData();
        return;}
    }

    else if(ID && !this.Exists(ID)) //the guild does not exist in the database, initalize it
    {
       console.log('guild not found in db'); 
       let current = {}; 
       //if the value being set on the new object is also an object, we don't want two of them nested
       //inside of one another with the same name

       if(typeof value === 'object')
       {
         current = value;   
       }
       else
       {
        current[Key] = value; 
       }
       this.data[ID] = current; 
       console.log('successfully appended new object to database...');
       this.saveData();
       return;
    }

    else if(!ID)
    {
      console.log(ID);
      console.log('unable to resolve guild id. SimpleDatabase set()');
    }

    
  }

  mergeArrays(arr1, arr2) {
    // Check if both arrays have the same data type (numeric or string)
    if (
      (Array.isArray(arr1) && Array.isArray(arr2)) &&
      (arr1.length > 0 && typeof arr1[0] === typeof arr2[0])
    ) {
      // Merge the arrays
      return arr1.concat(arr2);
    } else {
      // Arrays are of different data types, handle the error or return an empty array
      throw `Incompatible array types received ${typeof arr1[0]} and ${typeof arr2[0]}`
     
    }
  }


  /**
   * replace old keys on an object with new values. Must 
   * be identical objects sharing the same property names, and count
   * @param {Object} OldObject the object with old values
   * @param {Object} NewObject object with new values
   * @returns {Object}
   */
  updateObject(OldObject, NewObject)
  {
    let keys = Object.keys(NewObject)

    keys.map(x=>{
      OldObject[x] =  NewObject[x]
    });
    return NewObject; 
  }

  /**
   * Get the datatype (string) of an array in the database
   * @param {Array} arr
   * @returns {String} the type of data in the array e.g ("object", "string") etc. 
   */
 getArrayType(arr) {
    if (Array.isArray(arr) && arr.length > 0) {
      const firstElementType = typeof arr[0];
      
      switch (firstElementType) {
        case "number":
          return { type: DataTypes.Number, typeName: "Number" };
        case "string":
          return { type: DataTypes.String, typeName: "String" };
        case "boolean":
          return { type: DataTypes.Boolean, typeName: "Boolean" };
        case "object":
          if (Array.isArray(arr[0])) {
            return { type: DataTypes.Array, typeName: "Array" };
          } else if (arr[0] === null) {
            return { type: DataTypes.Object, typeName: "Object" };
          } else {
            return { type: DataTypes.Object, typeName: "Object" };
          }
        case "function":
          return { type: DataTypes.Function, typeName: "Function" };
        default:
          return { type: DataTypes.Unknown, typeName: "Unknown" };
      }
    } else {
      return { type: DataTypes.Unknown, typeName: "Unknown" };
    }
  }

  /**
   * Delete a property from the database
   * @param {string} key
   * @returns {void}
   * @example 
   * client.db.deleteEntry("poopoo.peepee.balls") 
   * //removes the "balls" property from "peepee", rooted at "poopoo" 
   */
  deleteEntry(key) {

    let current = this.data;
    //We're accessing a nested value. Split at '.'
    if (key.includes('.')){
        let keys = key.split('.')
        keys.forEach((key, index) => {
         if (!current[key]) {
           if (index === keys.length - 1) {
             current[key] = value;
             this.saveData();
           } else {
             current[key] = {};
             this.saveData();
           }
         }
         current = current[key];
       });}
    else 
    //the key string is one key. There are no nested values, or we just want to delete a root property.
    delete this.data[key];
    this.saveData();
  }

  /**
   * Update or change any value in the database
   * @param {string} key 
   * @param {any} newValue
   * @returns {void}
   * @example
   * //Changes the "in_production" property on "factory" to "Toyota Sienna" 
   * client.db.modifyEntry(factory.cars.in_production, Toyota Sienna)
   * 
   */
  modifyEntry(key, newValue) {
    
    let current = this.data;
    if(key.includes('.')){
      let keys = key.split('.');
    //We're accessing a nested value. Split at '.'
    for (const key of keys) {
      if (current[key] === undefined) {
        return; // None of the keys can be found at root, do nothing
      }
      current = current[key];
    }
    current = newValue;
    this.saveData();
    }
    else 
     //the key string is one key. Modify a root property (careful! Easy to overwrite entire branches)
    current[key] = newValue;
    this.saveData();
  }

  setGuildCoolDown(guildResolveable, cooldowntime)
  {
    try{
    let guildID = resolveGuildID(guildResolveable); 
  
    if(guildID && this.Exists(guildID))
    {
      let current = this.data[guildID]; 
      if(current.hasOwnProperty('config'))
      { 
       
        current.config.default_cooldown = cooldowntime;
        this.data[guildID] = current; 
        this.saveData();
      // this.data[guildID]['config']['default_cooldown'] = cooldowntime;
      }
      else
      {
        current.config = {}; 
        current.config.default_cooldown = cooldowntime;
        this.data[guildID] = current; 
        this.saveData();
      }
    }
    else
    {
      //initalize a new object for the guild that does not exist 
      this.data[guildID] = {};
      this.data[guildID]['config'] = {};
      this.data[guildID]['config']['default_cooldown'] = cooldowntime; 
    }
    }
    catch(error)
    {
      console.log(error);
      return
    }
  }

  setGuildConfig(guildResolveable, configKey, value)
  {
    try{
    let guildID = resolveGuildID(guildResolveable); 
    
    if(guildID && this.Exists(guildID))
    {
      
      let current = this.data[guildID]; 
      if(current.hasOwnProperty('config'))
      { 
       
        current.config[`${configKey}`] = value;
        this.data[guildID] = current; 
        this.saveData();
        return;
      }
      else
      {
        current.config = {}; 
        current.config[`${configKey}`] = value;
        this.data[guildID] = current; 
        this.saveData();
        return;
      }
    }
    else
    {
      //initalize a new object for a guild that does not exist 
      this.data[guildID] = {};
      this.data[guildID]['config'] = {};
      this.data[guildID]['config'][`${configKey}`] = value; 
      this.saveData(); 
      return;
    }
    }
    catch(error)
    {
      console.log(error);
      return; 
    }
  }

  getGuildConfig(guildResolveable, configKey)
  {
  
    try{
    let guildID = resolveGuildID(guildResolveable); 
    
    if(guildID && this.Exists(guildID))
    {
      
      let current = this.data[guildID]; 
      if(current.hasOwnProperty('config'))
      { 
        
        if(current.config.hasOwnProperty(configKey))
        {
          return current.config[configKey]; 
        }
        else
        {
          return false; 
        }
      
      }
      else
      return false; 
    }
    else 
    return false; 
    }
    catch(error)
    {
      console.log(error);
      return; 
    }
  }

  setGuildEmbedColor(guildResolveable, color)
  {
    try{
      let guildID = resolveGuildID(guildResolveable); 
      if(guildID && this.Exists(guildID))
      {
        current = this.data[guildID];
        if(current.hasOwnProperty('config'))
        {

        }
        //this.data[guildID]['config']['default_cooldown'] = cooldowntime; 
      }
      else
      {
        //initalize a new object for the guild that does not exist 
        this.data[guildID] = {};
        this.data[guildID]['config'] = {};
        this.data[guildID]['config']['default_cooldown'] = cooldowntime; 
      }
      }
      catch(error)
      {
        console.log(error);
        return
      }

  }

  //  this.data[`${guild}`]['config']['default_cooldown'] = time; 
    
  
  /**
   * append a new value to a property that is an array. 
   * @param {string} key
   * @param {any} newItem
   * @returns {void}
   * @example 
   * client.db.append("People.Fuckers", "Clarkson")
   * 
   * // in db.json  "People" will now appear as 
   * 
   * "People": {"Fuckers": ["Clarkson"] }
   */
  append(key, newItem) {
    let current = this.data;
  
    if (key.includes('.')) {
      let keys = key.split('.');
      
      // We're accessing a nested value. Split at '.'
      for (const k of keys) {
        // Check if the current property is an obj
        if (typeof(current[k]) =='object') {
          current = current[k]; // Move to the nested obj
        }
        else if(Array.isArray(current[k]))
        {
          
          current = current[k]; 
          push(newItem);
          this.data = current 
          this.saveData()
        }
        else {
          current = current[k] // Property is not an array, do nothing
        }
      }
      
      // Push the new item to the nested array
      
    } else {
      // The key string is one key. Modify a root property
      if (Array.isArray(current[key])) {
        current[key].push(newItem);
      }
    }
  
    this.saveData();
  }
  /**
   * get any value in the database
   * @param {any} key
   * @returns {any}
   */
  getValue(key) {
    let current = this.data;
    
    if (key.includes('.')) {
     
      let keys = key.split('.');
      
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        
        if (current[k]) {
          current = current[k];
        } else {
          
          return undefined; // Return undefined if any key is not found
        }
      }
      
      
      return current;
    } else {
      //check to make sure the root key (the guild) actually exists/
      //first key will always be guild the guild id. If we have reached
      //this else block there are no '.' in the key string. The key is flat. like your mom.  
      //so check to make sure the data actually exists. Just like how the doctor checks my penis.

      if(this.Exists(key))
      {
        return this.data[key];
      }
      //if the guild does not exist in the database, go ahead and do your negative IQ ass self a 
      //massive favor, and just initalize a new empty object at that key. That way no crashes are possible at 
      //any point further in the application where fluttershy might need to read, or create keys on that guild.
      //
      // Still return undefined, so your ass doesn't FORGET. Also save the db file 
      else 
      {
        return undefined;
      }
    }
  }
  
  /**
   * Check to see if a guild already has data in the db file. 
   * important to make sure the app doesn't crash accessing data 
   * that doesn't yet exist. IMPORTANT. Different from keyExists in the sense that 
   * keyExists() will search the ENTIRE db tree for matches, not just the root of the json tree.
   * They aren't intercompatible because guild id's may appear elsewhere in the db file farther down 
   * and conflate the results.
   * @param {Discord.Snowflake} ID {@link Discord.Snowflake}
   * @returns {true} if the object has been stored in the database before, false if not.
   */
  Exists(ID)
  {
    //would it be better to use .hasOwnProperty or nah? Quieres¿¿
    return this.data.hasOwnProperty(ID);
    
  }

 
  update(key, value) {
    if(key.includes('.')){
    const keys = key.split('.');
    
    let current = this.data;
  
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
  
      if (current[key] === undefined) {
        // If a key along the path doesn't exist, create an empty object for it
        current[key] = {};
      }
  
      current = current[key];
    }
  
    // Set the new value for the last key in the path
    const lastKey = keys[keys.length - 1];
    current[lastKey] = value;
    }

    else 
    this.data[key] = value; 
    this.saveData();
    ///return json;
  }

  /**
   * Check to see if a key exists at any point on the json structure.
   * @param {string} key
   * @returns {boolean} true if found, false otherwise 
   * @example  
   * 
   * //check the guild's data in the database for a key called "amongus"
   * if(client.db.keyExists(`${interaction.guild.id}.amongus`))
   * 
   * //this will most likely return false. No promises. 
   */
  keyExists(key) {
    // Base case: if the current object is null or undefined, the key does not exist
    //yes i know. It's silly bc the db is created by the constructor. And it will always exist.
    //im baby proofing myself. There's a reason why hydroelectric damns have like, 2 million redundancies. 
    if (key.includes('.')) 
    {
      

    }
    if (this.data === null || this.data === undefined) {
      return false;
    }
  
    // Check if the target key exists in the current object
    if (this.data.hasOwnProperty(key)) {
      return true;
    }
  
    // If the current object is an array, recursively check each element
    // This should always return false on the first loop, because the root is an object. 
    //this only here bc we calling functions inside of functions now. 
    if (Array.isArray(this.data[key])) {
      for (const item of obj) {
        //We calling functions inside of cunctions now 
        if (keyExists(item, key)) {
          return true;
        }
      }
    }
  
    // If the current object is an object, recursively check its properties
    if (typeof obj === 'object') {
      for (const key in obj) {
        if (keyExists(obj[key], targetKey)) {
          return true;
        }
      }
    }
  
    // If the key is not found in the current object or its descendants, return false
    return false;
  }

  /**
   * Grab the entire database as one object
   * @returns {Object.JSON}
   */
  getAllData() {
    return this.data;
  }
}

function convertToTimezone(date, targetTimezone) {
  const options = {
    timeZone: targetTimezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, // Use 24-hour format
  };

  const formatter = new Intl.DateTimeFormat('en-US', options);
  return formatter.format(date);
 
}

function stringToDate(RawDateString) {

  const results = chrono.parse(RawDateString);
  const cleaned = consolidateTimeObjects(results[0].start.impliedValues, results[0].start.knownValues);
 
  if (results.length === 0) { 
    console.log('unable to parse date')
    console.log(results)
    return false; // Couldn't parse a date
  }
  let parsed = new Date(); 
  parseDate(cleaned, parsed);

  
 //parsedDate.setUTCFullYear(parsed.year);
 // parsedDate.setUTCHours(parsed.hour, parsed.minutes, parsed.second, parsed.millisecond);
  
  
 
  //convert the parsed values into a date object
  //parsedDate.setFullYear(parsed.year);
  //parsedDate.setHours(parsed.hour);
  const currentDate = new Date();
  //console.log(parsedDate);
  // Check if the parsed date is in the past
  if (parsed < currentDate) {
    return false; // Date has already passed
  }
  
  return parsed;
}

function parseDate(results, Date)
{

  Date.setUTCFullYear(results.year, results.month - 1, results.day); 
  Date.setUTCHours(results.hour, results.minute, results.second);
 
}
  
function consolidateTimeObjects(impliedValues, knownValues) {
  // Define an object with all possible time components
  const universalObject = {
    year: 0,
    month: 0,
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  };

  // Iterate over the keys in the impliedValues object and add them to the universalObject
  for (const key in impliedValues) {
    if (universalObject.hasOwnProperty(key)) {
      universalObject[key] = impliedValues[key];
    }
  }

  // Iterate over the keys in the knownValues object and add them to the universalObject
  for (const key in knownValues) {
    if (universalObject.hasOwnProperty(key)) {
      universalObject[key] = knownValues[key];
    }
  }

  return universalObject;
}

// Example usage:
const impliedValues = {
  year: 1,
  millisecond: 500,
};

const knownValues = {
  month: 3,
  day: 15,
  hour: 12,
};

class LockBox 
{
   
   constructor() {
    //if there is an existing key, everything has already been encrypted with it.
    //it is not necessary to create a new one yet, as all of the old data will become unreadable.
    this.Key = process.env.ENCRYPTION_KEY;
    this.iv = crypto.randomBytes(16);
    if(this.Key === undefined)
    {
     //only update if it is the first time creating a key
     this.updateEnv()
    }
  
    
  }

  /**
   * @summary Encrypt secure keys, passwords, secrets, tokens, strings etc
   * @param {any} str
   * @returns {any}
   */
  encrypt(str) {
    const cipher = crypto.createCipher('aes-256-cbc', this.Key);
    let encryptedToken = cipher.update(str, 'utf8', 'hex');
    encryptedToken += cipher.final('hex');
    return encryptedToken;
  }
  
  /**
   * Same as encrypt(), but the key used for the encryption is immediately destroyed. 
   * rendering whatever data it has encrypted permanent scrambled. (prob wont work, haven't tested)
   * @param {any} str
   * @returns {any}
   */
  encrypt_forgetKey(message)
  {
    const cipher = crypto.createCipheriv('aes-256-cbc', crypto.randomBytes(32), Buffer.from(this.iv, 'hex'));
    let encryptedToken = cipher.update(message, 'utf-8', 'hex');
    encryptedToken += cipher.final('hex');
    return encryptedToken;
  }
  /**
   * @summary Decrypt secure keys, passwords, secrets, tokens, strings etc
   * @param {string} token_str
   * @returns {string}
   */
  decrypt(token_str) {
    const decipher = crypto.createDecipher('aes-256-cbc', this.Key);
    let decryptedToken = decipher.update(token_str, 'hex', 'utf8');
    decryptedToken += decipher.final('utf8');
    return decryptedToken;
  }
/** 
* 
* @summary Private Class Method: generate a new 32bit hex key to seed encryption ciphers
* @return {string} key representing random bytes 
*/
  generateKey() {
    Key = crypto.randomBytes(32).toString('hex');
    return Key;
  }

  /**
   * @summary Private Class Method: called to update the .env file after a new key is made
   * @returns {undefined}
   */
  updateEnv() {

    // Generate a new encryption key
    const Key = this.generateKey();
  
    const envKey = `
      ENCRYPTION_KEY=${Key}
    `;
  
    fs.writeFileSync('.env', envKey, { flag: 'a' }); //'a' 'append'. Dont erase important stuff already in .env
    log('created new key and updated .env file'); 

  }

  /**
   * @summary Private Class Accessor method. Check if key already exists in enviornment
   * @returns {boolean}
   */
  FirstTimeKey() {
    // Check if 'ENCRYPTION_KEY' exists in the environment variables
    return process.env.ENCRYPTION_KEY == undefined;
  }
  
 

}

function calculateexp(currentLevel) {
  
  const baseExperience = 100;
  
  const experienceMultiplier = 1.2;
  
  const experienceRequired = Math.round(baseExperience * Math.pow(experienceMultiplier, currentLevel - 1));
  
  return experienceRequired;
}

function expOnMessage(message) {
  // Base experience points for a message
  let experience = 10;


  const messageLength = message.content.length;
  experience += Math.min(messageLength, 100); // Limit extra points for long messages

  
  if (/\bhttps?:\/\/\S+\b/.test(message.content)) {
    experience += 20;
  }

  
  if (message.content.includes('\n')) {
    experience += 30 * (message.content.split('\n').length - 1); 
  }

  return experience;
}

function updateexp(message,Flutterbot)
{
 
  let authorExp = Flutterbot.db.getValue(`${message.author.id}`); 
  
  if(authorExp == undefined)
  {  
    console.log('creating new exp object');
    initexp(message, Flutterbot);
    return;
  }

  authorExp['exp'] += expOnMessage(message);
  authorExp['msg'] += 1;
  

  if(authorExp['exp'] >= authorExp['required'])
  {
      authorExp['level'] += 1; 
      authorExp['exp'] = 0; 
      authorExp['required'] = calculateexp(authorExp['level']);
      Flutterbot.db.set(message.author, message.author.id, authorExp);
      return;
  }
  Flutterbot.db.set(message.author, message.author.id, authorExp);
return;
}
function initexp(message, Flutterbot)
{
  let authorExp = Flutterbot.db.getValue(`${message.author.id}`); 
  if(!authorExp)
  {   
      console.log('fuckery');
      authorExp = 
      {
       'level': 0, 
       'required': 0,
       'exp': 0, 
       'msg':1
      }; 
      authorExp['required'] = calculateexp(authorExp['level']);
      Flutterbot.db.set(message.author, message.author.id, authorExp);
      return; 
  }
  return;
}

function langRand(langArray)
{
    const randomIndex = Math.floor(Math.random() * langArray.length);
    const randomElement = langArray[randomIndex]; 
    //OH FUCK yeah. I feel kinda clever for this one. SHIT IS COCAINE. 
    const rendered_message = removeEveryoneMentions(randomElement); 
    return randomElement;
}

module.exports = { displayList, log, Log, ID, SimpleDatabase, updateexp, stringToDate,convertToTimezone,  LockBox, formatTime, removeEveryoneMentions, resolveGuildID, ProgressBar, isValidHexColor, format, langRand};