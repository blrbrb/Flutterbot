export class SimpleDatabase {
    /**
     *  The lazy low iq solution to a hosted database
     *  certified Eli™ crackhead ducktape
     * @param {string} filePath
     * @returns {void}
     */
    constructor(filePath: string, logger?: undefined, debug_print?: boolean);
    filePath: string;
    data: any;
    debug_print: boolean;
    log: any;
    printAcessInfo(Key: any, value: any, ID: any): void;
    /**
     * Private Class Method. Called by the database when modifying adding or removing propereties
     * in order to keep the database up to date and clean.
     * @returns {any}
     */
    loadData(): any;
    /**
     * Private Class Method. Called by the database each time a property is changed, added, or deleted
     * @returns {undefined}
     */
    saveData(): undefined;
    /**
     * Modify a value in the database
     * @param {String} key
     * @param {any} value
     * @returns {any} Data associated with key.
     * @returns {undefined} if key does not exist. (will also auto-initalize the key that isn't found)
     */
    set(IDResolveable: any, Key: any, value: any): any;
    setAtRoot(key: any, value: any): void;
    mergeArrays(arr1: any, arr2: any): any[];
    updateObject(New: any, Old: any): any;
    getArrayType(arr: any): {
        type: any;
        typeName: string;
    };
    deleteEntry(key: any): void;
    setGuildCoolDown(GuildResolvable: any, cooldowntime: any): void;
    setGuildConfig(GuildResolvable: any, configKey: any, value: any): void;
    getGuildConfig(GuildResolvable: any, configKey: any): any;
    setGuildEmbedColor(GuildResolvable: any, color: any): void;
    /**
     * get any value in the database
     * @param {any} key
     * @returns {any}
     */
    get(key: any): any;
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
    hasGuild(IDResolveable: any): true;
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
    hasKey(key: string): boolean;
    /**
     * Grab the entire database as one object
     * @returns {Object.JSON}
     */
    getAllData(): Object.JSON;
}
//# sourceMappingURL=SimpleDatabase.d.ts.map