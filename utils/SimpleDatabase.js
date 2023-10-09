const fs = require('fs');
const Discord = require('discord.js');
const {
    resolveGuildID,
    IsSnowflake,
    resolveID,
    Log,
} = require('./utilities.js');


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
    constructor(filePath, logger = undefined, debug_print = false) {
        this.filePath = filePath;
        this.data = this.loadData();
        this.debug_print = debug_print;
        if (logger) {
            if (!logger instanceof Log) { 
                throw new Error('youre gay');
                console.log(`SimpleDatabase constructor(filepath=${filepath}, logger=${logger.strip(25)}) "Logger" parameter must be of type "Log" \n defined in ./utils/utilities.js`)
            } else {
                this.log = logger;
            }
        }
    }

    printAcessInfo(Key, value, ID) {
        this.log(`blue underscore`, `| Key:${Key} Value: ${value} ID: ${ID}`);
        this.log(`| type - ${typeof(value)}`);
        this.log(`| value - ${value}`);
        this.log(`| destination - ${ID}.${Key}`);
        return;
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
     * Modify a value in the database
     * @param {String} key 
     * @param {any} value 
     * @returns {any} Data associated with key.
     * @returns {undefined} if key does not exist. (will also auto-initalize the key that isn't found)
     */
    set(IDResolveable, Key, value) {
        let ID, current, exists
        IDResolveable = IDResolveable || undefined;

        if (Key && IDResolveable === undefined) {
            console.log(`setting id to key`);
            if (!typeof(Key) === 'string')
                throw new TypeError(`Excpected string for "Key", got ${typeof(Key)} instead`);

            ID = Key;
        } else
            ID = resolveID(IDResolveable);
        console.log(`ID is now set to: `, ID);


        exists = this.hasGuild(ID);

        this.log('green', 'Acessing database...');

        current = this.data[ID];
        if (Key === ID) {
            this.log(`green`, `notice: this object will be appended to the root of the json structure`);
            current = this.data;
        }

        if (!current) {
            this.log('yellow', `${Key} is not a property on ${ID}. Creating a new property`);
            this.data[ID] = {};
            current = this.data[ID];

            if (typeof(value) === 'object') {
                current[Key] = this.updateObject({}, value);
            } else
                current[Key] = value;

        }

        if (this.debug_print)
            this.printAcessInfo(Key, value, ID);

        if (Array.isArray(current[Key])) // the existing property is an array. 
        {
            this.log(`and it's an array`)
            if (Array.isArray(value)) //the new value is also an array. Merge.
            {
                this.log('the new value is also an array...')
                try {

                    const appended = this.mergeArrays(current[`${Key}`], value);
                    current[Key] = appended;
                } catch (error) {
                    console.log(error);
                }
            } else //the existing property is an array, but the new value is not.
            {
                console.log('appending the new value...');

                console.log(`the new value to append to the existing array is a ${typeof(value)} `);
                const arrayType = this.getArrayType(current[`${Key}`]).type;

                switch (arrayType) //make sure it's the correct datatype before pushing.
                {
                    case DataTypes.Boolean:
                        if (typeof value === 'boolean') {
                            current[Key].push(value);
                            break
                        } else
                            throw new Error(`incorrect data type, expected boolean for ${Key} but got ${typeof value} instead`);
                    case DataTypes.String:
                        if (typeof value === 'string') {
                            current[Key].push(value);
                            break;
                        } else
                            throw new Error(`incorrect data type, expected string for ${Key} but got ${typeof value} instead`);
                    case DataTypes.Number:
                        if (typeof value === 'number') {
                            current[Key].push(value);
                            break;
                        } else
                            throw new Error(`incorrect data type, expected num for ${Key} but got ${typeof value} instead`);

                    case DataTypes.Object:
                        if (typeof(value) === 'object') {
                            // Check if the newObj already exists in arrayOfObjects
                            const exists = current[Key].some((obj) => obj === value);
                            console.log(exists);
                            if (!exists) {
                                current[Key].push(value);
                                break;
                            } else
                                console.log('identical object. Returning');
                            return; //don't throw an error here. it just means we tried to push an identical object. not that big of a deal.
                        } else
                            throw new Error(`incorrect data type, expected obj for ${Key} but got ${typeof value} instead`);

                    case DataTypes.Function:
                        if (typeof value === 'function') {
                            current[Key].push(value);
                            break;
                        } else
                            throw new Error(`incorrect data type, expected function for ${Key} but got ${typeof value} instead`);

                    case DataTypes.Undefined:
                        if (typeof value === 'undefined') {
                            throw new Error(`the value is undefined, cannot append`)
                        } else
                            return console.log(`something is very wrong lol`);

                    default:
                        console.log(`This array is empty, and safe to append any datatype to`);
                        current[Key].push(value);
                        return;
                }



            }

        } else if (typeof current[Key] === 'object') {
            console.log('and this property is an object...')

            if (typeof value === 'object') {
                console.log('the new value is also an object...')
                let updateValue = this.updateObject(value, current[Key]);


                current[Key] = updateValue;
                //this.data[ID] = current; 
            } else {
                current[Key] = value;
            }
        } else //the property key is not an array, or object, safe it add it.
        {
            this.log(`the new value is neither an array, nor is it a object`)
            current[Key] = value;
        }

        this.data[ID] = current;
        this.saveData();
        this.log('green', 'done');
        return;

    }

    setAtRoot(key, value) {
        this.data[key] = value;
        this.saveData();
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
        const combined = {
            ...Old
        };

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

    getArrayType(arr) {
        if (Array.isArray(arr) && arr.length > 0) {
            const firstElementType = typeof arr[0];
            //console.log('first element type = ', firstElementType);
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


    deleteEntry(key) {
        let current = this.data;
        //We're accessing a nested value. Split at '.'
        if (key.includes('.')) {
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
            });
        } else
            //the key string is one key. There are no nested values, or we just want to delete a root property.
            delete this.data[key];
        this.saveData();
    }



    setGuildCoolDown(GuildResolvable, cooldowntime) {
        try {
            let guildID = resolveGuildID(GuildResolvable);

            if (guildID && this.hasGuild(guildID)) {
                let current = this.data[guildID];
                if (current.hasOwnProperty('config')) {

                    current.config.default_cooldown = cooldowntime;
                    this.data[guildID] = current;
                    this.saveData();
                    // this.data[guildID]['config']['default_cooldown'] = cooldowntime;
                } else {
                    current.config = {};
                    current.config.default_cooldown = cooldowntime;
                    this.data[guildID] = current;
                    this.saveData();
                }
            } else {
                //initalize a new object for the guild that does not exist 
                this.data[guildID] = {};
                this.data[guildID]['config'] = {};
                this.data[guildID]['config']['default_cooldown'] = cooldowntime;
            }
        } catch (error) {
            console.log(error);
            return
        }
    }

    setGuildConfig(GuildResolvable, configKey, value) {
        try {
            let guildID = resolveGuildID(GuildResolvable);

            if (guildID && this.hasGuild(guildID)) {

                var current = this.data[guildID]['config'][configKey];

                if (Array.isArray(current)) {
                    if (Array.isArray(value)) //the new value is also an array. Merge.
                    {
                        if (this.debug_print)
                            console.log('the new value is also an array...')
                        try {
                            const appended = this.mergeArrays(current, value);
                            current = appended;
                        } catch (error) {
                            console.log(error);
                        }
                    } else //the existing property is an array, but the new value is not.
                    {
                        //console.log(`the new value to append to the existing array is a ${typeof value} `);
                        //console.log(this.getArrayType(current));
                        const arrayType = this.getArrayType(current).type;

                        switch (arrayType) //make sure it's the correct datatype before pushing.
                        {
                            case DataTypes.Boolean:
                                if (typeof value === 'boolean') {
                                    current.push(value);


                                    break;
                                } else
                                    throw new TypeError(`This array accepts boolean values, but got ${typeof value} instead`);
                            case DataTypes.String:
                                if (typeof value === 'string') {
                                    current.push(value);


                                    break;
                                } else
                                    throw new TypeError(`this array accepts string values, but got ${typeof value} instead`);
                            case DataTypes.Number:
                                if (typeof value === 'number') {
                                    current.push(value);


                                    break;
                                } else
                                    throw new TypeError(`this array accepts number values, but got ${typeof value} instead`);
                            case DataTypes.Object:
                                if (typeof value === 'object') {
                                    current.push(value);


                                    break;

                                } else
                                    throw new TypeError(`This array accepts object values, but got ${typeof value} instead`);
                            case DataTypes.Function:
                                if (typeof value === 'function') {
                                    current.push(value);
                                    break;
                                } else
                                    console.log(`This array accepts function() values, but got ${typeof value} instead`);
                            case DataTypes.Undefined:
                                //if the array has an undefined datatype, it's safe to push anything.
                                //undefined = brand new array, no datatype yet. datatype will be automatically handled after creation
                                current.push(value);
                                break;
                            default:
                                throw new Error('something is very fucked lmao');
                        }

                    }

                } else if (typeof current === 'object') {
                    console.log('and this property is an object...')
                    if (typeof value === 'object') {
                        console.log('the new value is also an object...')
                        let updateValue = this.updateObject(current, value);
                        console.log('updated object:', updateValue);
                        current = updateValue;
                    }

                }


            } else {
                this.data[guildID] = {};
                this.data[guildID]['config'] = {};
                this.data[guildID]['config'][`${configKey}`] = value;
                this.saveData();
                return;
            }

            this.data[guildID]['config'][configKey] = value;
            this.saveData();

            this.log('green', 'done');
        } catch (error) {
            console.log(error);
            return;
        }

    }

    getGuildConfig(GuildResolvable, configKey) {

        try {
            let guildID = resolveGuildID(GuildResolvable);

            if (guildID && this.hasGuild(guildID)) {

                let current = this.data[guildID];
                if (current.hasOwnProperty('config')) {

                    if (current.config.hasOwnProperty(configKey)) {
                        return current.config[configKey];
                    } else {
                        return false;
                    }

                } else
                    return false;
            } else
                return false;
        } catch (error) {
            console.log(error);
            return;
        }
    }

    setGuildEmbedColor(GuildResolvable, color) {
        try {
            let guildID = resolveGuildID(GuildResolvable);
            if (guildID && this.hasGuild(guildID)) {
                current = this.data[guildID];
                if (current.hasOwnProperty('config')) {

                }
                //this.data[guildID]['config']['default_cooldown'] = cooldowntime; 
            } else {
                //initalize a new object for the guild that does not exist 
                this.data[guildID] = {};
                this.data[guildID]['config'] = {};
                this.data[guildID]['config']['default_cooldown'] = color;
            }
        } catch (error) {
            console.log(error);
            return
        }

    }

    /**
     * get any value in the database
     * @param {any} key
     * @returns {any}
     */
    get(key) {
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
     * that doesn't yet exist. IMPORTANT. Different from hasKey in the sense that 
     * hasKey() will search the ENTIRE db tree for matches, not just the root of the json tree.
     * They aren't intercompatible because guild id's may appear elsewhere in the db file farther down 
     * and conflate the results.
     * @param {Discord.GuildResolvable || Discord.UserResolvable} IDResolvable object that can be resolved into an {@link Discord.Snowflake}
     * @returns {true} if the object has been stored in the database before, false if not.
     */
    hasGuild(IDResolveable) {
        let ID = resolveID(IDResolveable) ? resolveID(IDResolveable) : IDResolveable;
        // c//onsole.log(`hasGuild() ID = ${ID}`); 
        if (IsSnowflake(ID) && ID in this.data)
            return ID;

        else if (typeof(IDResolveable) === 'string') {
            let keys = IDResolveable.includes('.') ? IDResolveable.split('.') : IDResolveable;

            let current = this.data;

            for (const key of keys) {
                if (current.hasOwnProperty(key)) {
                    current = current[key];
                } else {
                    return undefined; // Key doesn't exist in the data
                }
            }
            return current;
        }


        return false;
    }



    /**
     * Check to see if a key hasGuild at any point on the json structure.
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
        // Base case: if the current object is null or undefined, the key does not exist
        //yes i know. It's silly bc the db is created by the constructor. And it will always exist.
        //im baby proofing myself. There's a reason why hydroelectric damns have like, 2 million redundancies. 
        if (key.includes('.')) {


        }
        if (this.data === null || this.data === undefined) {
            return false;
        }

        // Check if the target key hasGuild in the current object
        if (this.data.hasOwnProperty(key)) {
            return true;
        }

        // If the current object is an array, recursively check each element
        // This should always return false on the first loop, because the root is an object. 
        //this only here bc we calling functions inside of functions now. 
        if (Array.isArray(this.data[key])) {
            for (const item of obj) {
                //We calling functions inside of cunctions now 
                if (hasKey(item, key)) {
                    return true;
                }
            }
        }

        // If the current object is an object, recursively check its properties
        if (typeof obj === 'object') {
            for (const key in obj) {
                if (hasKey(obj[key], targetKey)) {
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


module.exports = {
    SimpleDatabase
};