require('dotenv').config();
const fs = require('fs');
const chrono = require('chrono-node');
const { strict } = require('assert');
//eew
const crypto = require('crypto');


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
function Log(logAll = true) {
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
    }
}

function ID() {
    this.generate = function () {
        return new Date().valueOf();
    }
}


const log = new Log(true);

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
  addEntry(key, value) {
    let current = this.data; 
    if (key.includes('.')){
     let keys = key.split('.')
     keys.forEach((key, index) => {
      if (!current[key]) {
        if (index === keys.length - 1) {
          current[key] = value;
          this.saveData();
        } else {
          //at this point, we've looped over all of the keys 
          //if there really isn't a key this far down in the json tree
          //it's safe to initalize the new key as an empty object
          current[key] = {};
          this.saveData();
        }
      }
      current = current[key];
    });}
    else
    //if the key string does not have ".". It's a flat property. Just add it to the root 
    this.data[key] = value;
    this.saveData();
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
    //We're accessing a nested value. Split at '.' 
    let keys = key.split('.'); 

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

      if(this.guildExists([key]))
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
        this.data[key] = key; 
        this.saveData(); 
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
   * @param {Discord.Snowflake} guildID {@link Discord.Snowflake}
   * @returns {any}
   */
  guildExists(guildID)
  {
    //would it be better to use .hasOwnProperty or nah? Quieres¿¿
    return guildID in this.data 
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

function validateDate(RawDateString) {

  const results = chrono.parse(RawDateString);

  console.log('fucking');
  if (results.length === 0) { 
    console.log('unable to parse')
    console.log(results)
    return false; // Couldn't parse a date
  }

  const parsedDate = results[0].start.date();
  const currentDate = new Date();

  // Check if the parsed date is in the past
  if (parsedDate < currentDate) {
    console.log('this date has already passed')
    return false; // Date has already passed
  }

  return parsedDate;
  //Discord's event manager API can take just straight up Date() 
  // Convert the valid date to a Unix timestamp
  //const unixTimestamp = parsedDate.getTime() / 1000;

 // return unixTimestamp;
}

class FluttershyLockBox 
{
   
   constructor() {
    //if there is an existing key, everything has already been encrypted with it.
    //it is not necessary to create a new one yet, as all of the old data will become unreadable.
    this.Key = process.env.ENCRYPTION_KEY;
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
    Log('created new key and updated .env file'); 

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

module.exports = { displayList, log, Log, ID, SimpleDatabase, validateDate, FluttershyLockBox};