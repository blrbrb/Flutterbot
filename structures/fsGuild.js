"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.fsGuildConfig = void 0;
const utilities_1 = require("../utils/utilities");
/**
 *  contains all of the data created by Flutterbot
 *  associated with a [Guild]({@link https://old.discordjs.dev/#/docs/discord.js/main/class/Guild})
 * @class fsGuild
*/
class fsGuild  {
    /**
     * Create an instance of fsGuild 
     * 
     * @param {Snowflake} GuildId 
     * @param {fsGuildConfig} config 
     */
    constructor(GuildId, config) {
        if(config && config instanceof fsGuildConfig)
            this.config = config; 
        else{
         throw Error('cannot instantize fsGuild: no default GuildConfig provided');}  
        if (GuildId)
            /**@type {Snowflake} */
            this.GuildId = utilities_1.resolveID(GuildId);
        else
         throw new Error('cannot instantize fsGuild: no valid Guild id!');
    }
    /**
     * Add a role to a guild's list of {@link privateRoles}
     * @param {Snowflake} [roleID] the role's unique discord [Snowflake]({@link https://old.discordjs.dev/#/docs/discord.js/main/typedef/Snowflake}) ID
     */
    addPrivateRole(roleID) {
        console.log('function call is working');
        if(!this.config.privateRoles)
            return;
        else if(this.config.privateRoles.includes(roleID))
            return; 
        else {
            this.config.privateRoles.push(roleID);
        return;}
    }

    setEmbedColor(color)
    {   //will always return a valid hex color value 
        const embed_color = utilities_1.ValidateHexColor(color)? color: utilities_1.ValidateHexColor(color);
        this.config.embedColor = embed_color; 
    }
}
exports.fsGuild = fsGuild;

/**
 * Houses a guild's configuration data 
 * @class fsGuildConfig
 */
class fsGuildConfig 
{
    /**
     * 
     * @param {number} newMemberMinumumAge 
     * @param {number} embedColor 
     * @param {number} defaultCoolDown 
     * @param {Array<Snowflake>} privateRoles 
     */
    constructor({newMemberMinimumAge=20, embedColor=0, defaultCoolDown=2, privateRoles=[]} = {})
    {
        /**@type {number} */
        this.newMemberMinimumAge = newMemberMinimumAge; 
        /**@type {number} */
        this.embedColor = embedColor;
        /**@type {number} */ 
        this.defaultCoolDown = defaultCoolDown; 
        /**@type {Array<Snowflake>} */
        this.privateRoles = privateRoles; 
    }
}
exports.fsGuildConfig = fsGuildConfig;
exports.fsGuild = fsGuild;
exports.default = fsGuild;

