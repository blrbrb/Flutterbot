const fs = require('fs');
const Discord = require('discord.js');
const {resolveGuildID, resolveUserID, IsSnowflake, printCurrentFrame} = require('./utilities.js');



const DataTypes = {
    Undefined: 0,
    Number: 1,
    String: 2,
    Boolean: 3,
    Object: 4,
    Function: 6,
  };

class SimpleDatabase {
    /**
     *  The lazy low iq solution to a hosted database 
     *  certified Eli™ crackhead ducktape  
     * @param {string} filePath
     * @returns {void}
     */
    constructor(filePath, logger=undefined) {
      this.filePath = filePath;
      this.data = this.loadData();
      if(logger)
      {
          if(typeof !logger ==='function')
          {
            console.log(`SimpleDatabase constructor(filepath=${filepath}, logger=${logger.strip(25)}) "Logger" parameter must be of type "Log" \n defined in ./utils/utilities.js`)
          }
          else 
          {
            this.log = logger; 
          }
      }
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
      this.log('green', 'Acessing database...');

      //first, fetch the ID of the object
      let ID = this.Exists(IDResolveable)  // this will always return true if IDresolveable is an object with a property that is a discord Snowflake
      let current; 

      if(ID) //then check if the Object exists in the database 
      {
       
       current = this.data[ID]; 
  
        if(Key === ID)
        {
          //the Supplied guild resolveable, and the new key are the same, we are not assigning a new property deeper into the object.
          //the parent guild and the new key are the same property. Set current to data[ID] to avoid circular refrences
          current = this.data; 
         
        }
        this.log(`setting key ${Key}, on ${ID}`);
        if(current.hasOwnProperty(Key)) //the property key already exists 
        { 
          this.log(`${ID} already has this property`)
          if(Array.isArray(current[Key])) // the existing property is an array. 
          {
            this.log(`and it's an array`)
            if(Array.isArray(value)) //the new value is also an array. Merge.
            {
              this.log('the new value is also an array...')
              try
              { 
               
                const appended = this.mergeArrays(current[`${Key}`], value); 
                current[Key] = appended; 
              }
              catch(error)
              {
                console.log(error);
              }
            }   
            else//the existing property is an array, but the new value is not.
            {
              console.log('appending the new value...');
              console.log(`the new value to append to the existing array is a ${typeof value} `);
              console.log(this.getArrayType(current[`${Key}`]));
              const arrayType = this.getArrayType(current[`${Key}`]).type; 
              switch(arrayType) //make sure it's the correct datatype before pushing.
              {
                case DataTypes.Boolean:
                  if(typeof value === 'boolean'){
                    current[Key].push(value);
                    //this.data[ID] = current; 
                   // this.saveData(); 
                    return; 
                    }
                  else  
                    this.log(`incorrect data type, expected boolean but got ${typeof value} instead`);
                case DataTypes.String: 
                  if (typeof value === 'string'){
                    current[Key].push(value);
                    // this.data[ID] = current; 
                    // this.saveData(); 
                     return;
                  }
                  else
                    console.log(`incorrect data type, expected string but got ${typeof value} instead`);
                case DataTypes.Number: 
                  if(typeof value === 'number'){
                   current[Key].push(value);
                  // this.data[ID] = current; 
                  // this.saveData(); 
                   break;
                  }
                  else 
                  console.log(`incorrect data type, expected num but got ${typeof value} instead`);
                case DataTypes.Object: 
                  if(typeof value === 'object'){
                    current[Key].push(value);
                    //this.data[ID] = current; 
                   // this.saveData(); 
                    return;
                    
                  }
                  else 
                    console.log(`incorrect data type, expected obj but got ${typeof value} instead`);
                case DataTypes.Function: 
                  if(typeof value === 'function'){
                     current[Key].push(value);
                     //this.data[ID] = current; 
                    // this.saveData(); 
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
            console.log('and this property is an object...')
            if(typeof value === 'object')
            {
              console.log('the new value is also an object...')
              let updateValue = this.updateObject(current[Key], value); 
              console.log('updated object:',updateValue);
             
            
              current = updateValue; 
              this.data[ID] = current; 
            } 
            
          }
          else //the property key is not an array, or object, safe it add it.
          {
            this.log(`the new value is neither an array, nor is it a object`)
            current[Key] = value; 
          }
          
        }
        else { 

          this.log(`${Key} is not a property on ${ID}. Creating a new property`); 
          //even if value is an array or object, adding it here will be safe and the correct datatype will be written
          
          current[Key] = {}; 
          current[Key] = value;
          
          }
      }   
      
      else if(!ID && this.resolveID(IDResolveable)) //the object does not exist in the database,
      {
         ID = this.resolveID(IDResolveable);
         current = {}; 

         this.log('yellow', `Discord API Object with SnowFlake ID ${ID} was not found in the database...`);
         this.log('yellow, underscore', `Initalizing a new entry with ID ${ID}...`);  
        
         current[Key] = value;   
      
      }
  
      else if(!ID && !this.resolveID(IDResolveable)) //The object does not exist in the guild, and the resolveID is not 
      {
          this.log('red', `CRITIAL: non-Discord.Snowflake resolvable object, exiting database`, frame=printCurrentFrame()); 
          return; 
      }

      this.data[ID] = current; 
      this.saveData();
      this.log('green', 'done');
      return; 
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
  
    
   
    updateObject(New, Old) {
      // Create a new object with props. of old obj to update
      const combined = { ...Old };
  
      // Iterate through props. in the new object
      for (const prop in New) {
          if (New.hasOwnProperty(prop)) {
              // Assign the prop. from the new object to the combined object, if that prop exists 
              combined[prop] = New[prop];
          }
      }
      //Voici your new updated object, with all previous values intact. 
      return combined;
  }
    
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
      
        var current = this.data[guildID]['config'][configKey]; 

        if(Array.isArray(current))
        {
          if(Array.isArray(value)) //the new value is also an array. Merge.
          {
            console.log('the new value is also an array...')
            try
            { 
              const appended = this.mergeArrays(current, value); 
              current = appended; 
            }
            catch(error)
            {
              console.log(error);
            }
          }   
          else//the existing property is an array, but the new value is not.
            {
              console.log(`the new value to append to the existing array is a ${typeof value} `);
              console.log(this.getArrayType(current));
              const arrayType = this.getArrayType(current).type; 
             
              switch(arrayType) //make sure it's the correct datatype before pushing.
              {
                case DataTypes.Boolean:
                  if(typeof value === 'boolean'){
                    current.push(value);
                   
      
                    break; 
                    }
                  else  
                    console.log(`incorrect data type, expected boolean but got ${typeof value} instead`);
                case DataTypes.String: 
                  if (typeof value === 'string'){
                    current.push(value);
                    
                   
                     break;
                  }
                  else
                    console.log(`incorrect data type, expected string but got ${typeof value} instead`);
                case DataTypes.Number: 
                  if(typeof value === 'number'){
                   current.push(value);
                  
                 
                   break;
                  }
                  else 
                  console.log(`incorrect data type, expected num but got ${typeof value} instead`);
                case DataTypes.Object: 
                  if(typeof value === 'object'){
                    current.push(value);
                   
                  
                    break;
                    
                  }
                  else 
                    console.log(`incorrect data type, expected obj but got ${typeof value} instead`);
                case DataTypes.Function: 
                  if(typeof value === 'function'){
                     current.push(value);
                    
                     break;
                    
                    }
                  else 
                     console.log(`incorrect data type, expected function but got ${typeof value} instead`);
                case DataTypes.Undefined: 
                    if(typeof value === 'undefined') 
                    {
                       console.log(`the value is undefined, cannot append`) 
                       break;
                    }
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
        else if (typeof current === 'object')
        {
          console.log('and this property is an object...')
          if(typeof value === 'object')
          {
            console.log('the new value is also an object...')
            let updateValue = this.updateObject(current, value); 
            console.log('updated object:',updateValue);
            current = updateValue; 
          } 

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

      this.data[guildID]['config'][configKey] = value; 
      console.log(current);
      console.log(this.data[guildID]['config'][configKey]);
      this.saveData(); 

      this.log('green', 'done');
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
        
        console.log('returning current');
        return current;
      } else {
          return this.data[key];
        
      }
    }
    
    /**
     * Check to see if a guild already has data in the db file. 
     * important to make sure the app doesn't crash accessing data 
     * that doesn't yet exist. IMPORTANT. Different from keyExists in the sense that 
     * keyExists() will search the ENTIRE db tree for matches, not just the root of the json tree.
     * They aren't intercompatible because guild id's may appear elsewhere in the db file farther down 
     * and conflate the results.
     * @param {Discord.GuildResolvable || Discord.UserResolvable} guildResolveable object that can be resolved into an {@link Discord.Snowflake}
     * @returns {true} if the object has been stored in the database before, false if not.
     */
    Exists(guildResolveable)
    {     
     let ID = this.resolveID(guildResolveable);
    // c//onsole.log(`Exists() ID = ${ID}`); 
     if(IsSnowflake(ID) && ID in this.data)
        return ID;
     else 
      return false; 
    }

    resolveID(guildResolveable)
    {
      let ID; 

      if(typeof guildResolveable !== "string" ||typeof guildResolveable !== "string") //if the ID is on an object (guild/user, etc) with an ID property
      {
       ID = resolveGuildID(guildResolveable) !== false ? resolveGuildID(guildResolveable) : resolveUserID(guildResolveable);
      }
      else if(IsSnowflake(guildResolveable)) //if the ID to resolve is just a plain string or number with the ID
      {
        ID = guildResolveable;
      }
      return ID;
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


module.exports = {SimpleDatabase}; 