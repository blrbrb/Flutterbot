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

  
  saveData() {
    /**
   * Private Class Method. Called by the database each time a property is changed, added, or deleted
   * @returns {any}
   */
    fs.writeFile(this.filePath, JSON.stringify(this.data, null, 2), 'utf-8', (error) => {
      if (error) {
        console.error('Error saving data:', error);
      }
    });
  }

  addEntry(key, value) {
    let current = this.data;
    //We're accessing a nested value. Split at '.'
    if (key.includes('.')){
     keys = key.split('.')
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
        keys = key.split('.')
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
    for (const key of key) {
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
    if(key.includes('.')){
    //We're accessing a nested value. Split at '.'
    for (const key of key) {
      if (current[key] === undefined) {
        return; // None of the keys can be found at root, do nothing
      }
      if (!Array.isArray(this.data[key])) {
        this.data[key] = [];
      }
      
    }

    }
    else 
    //the key string is one key. Modify a root property (careful! Easy to overwrite entire branches)
     if (!Array.isArray(this.data[key])) {
        this.data[key] = [];
       }
       this.data[key].push(newItem);
       this.saveData();
}
  
  /**
   * get any value in the database
   * @param {any} key
   * @returns {any}
   */
  getValue(key) {
    let current = this.data;
    if (key.includes('.')){
        keys = key.split('.')
        keys.forEach((key, index) => {
         if (!current[key]) {
            //do nothing, the value does not exist 
            return 
         }
        
    
        });
        return current[key];
    }
    
    else 
    //the key is a root value, grab it. 
     return this.data[key]
  }

  /**
   * Grab the entire database as one object
   * @returns {Object}
   */
  getAllData() {

    
    return this.data;
  }
}


module.exports = { displayList, log, Log, ID };