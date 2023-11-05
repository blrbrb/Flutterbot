"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AngelBunny = void 0;
const discord_js_1 = require("discord.js");
const {Utils, Guild, Message, CommandInteraction} = require('discord.js');
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const fs_1 = __importDefault(require("fs"));
const types_1 = require("../structures/types");
const { youShouldLitterallyNeverSeeThis } = require('../lang/en.js');
const { SimpleDatabase } = require("../utils/SimpleDatabase");









class AngelBunny {
    /**
     *  Create an instance of Fluttershy's saftey AngelBunny 
     * @param {SimpleDatabase} Database 
     * @param {Flutterbot} shy Flutterbot's client instance  
     */
    constructor(Database, shy) {
        /**@type {RegExp} */
        this.urlRegex = /https?:\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]*[-A-Za-z0-9+&@#/%=~_|]/g;
        
        this.intel = this.loadIntel();
       /**@type {SimpleDatabase}  */
        this.db = Database;
        /**@type {Flutterbot} */
        this.shy = shy;
    }
    validateAge(member) {
        let MinAge = 0;
        MinAge = this.db.getGuildConfig(member.guild, "newMemberMinimumAge");
        if (!MinAge) {
            console.log('evaluage.js validateAge() no default new member age set in server config, using default of one month');
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
            return member.user.createdAt < oneMonthAgo;
        }
        else {
            const daysAgo = new Date();
            daysAgo.setDate(daysAgo.getDate() - MinAge);
            return member.user.createdAt < daysAgo;
        }
    }
    quaratine(member) {
        return __awaiter(this, void 0, void 0, function* () {
            const guild = this.shy.guilds.cache.get(member.guild.id);
            if (!guild)
                throw new types_1.Errors.fsClientError(`Unable to fetch the guild from my clients GuildManager. Cannot quaratine this user`);
            let qRoleID = this.db.getGuildConfig(member.guild, 'quaratine_role');
            let quarantinedUsers = this.db.getGuildConfig(member.guild, 'quarantined');
            if (!quarantinedUsers) {
                this.db.setGuildConfig(member.guild, 'quarantined', [member.id]);
            }
            else {
                quarantinedUsers.push(member.user.id);
                this.db.setGuildConfig(member.guild, 'quarantined', quarantinedUsers);
            }
            if (!qRoleID) {
                console.log('evaluate.js quaratine(). Guild quaratine role is not set in config');
                this.createQuaratineRole(member);
                return;
            }
            else {
                const qRole = yield guild.roles.cache.get(qRoleID);
                if (qRole) {
                    yield member.roles.add(qRole);
                    return;
                }
                return;
            }
        });
    }
    createQuaratineRole(member) {
        return __awaiter(this, void 0, void 0, function* () {
            const guild = this.shy.guilds.cache.get(member.guild.id);
            // Define the role's properties
            const roleData = {};
            if (guild) {
                guild.roles.create({
                    name: 'Quaratine',
                    color: 'Red',
                    permissions: [discord_js_1.PermissionFlagsBits.SendMessages, discord_js_1.PermissionFlagsBits.ViewChannel],
                    hoist: true,
                    mentionable: true,
                    "reason": 'Flutterbot.js default quaratined role did not exist. Initalizing from scratch to tag potentially malicious users in the future', // Optional reason for audit logs
                })
                    .then((role) => {
                    this.shy.Log(`Created role: ${role.name}`);
                    this.db.setGuildConfig(guild, 'quaratine_role', role.id);
                })
                    .catch((error) => {
                    this.shy.Log(`Red Bold`, `Error creating new quarantine role for (${guild.name})[${guild.id}] :`, error);
                });
            }
            return;
        });
    }
    onMessage(message) {
         __awaiter(this, void 0, void 0, function* () {
            if ((yield this.positiveURL(message)).match) {
                this.shy.Log('Pink Underscore', `This shit is for realsies bro. ${message.content}`);
            }
        });
       
    }
    updateIntelligence() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Make an HTTP GET request to the webpage
                const response = yield axios_1.default.get('https://urlhaus.abuse.ch/downloads/text/');
                if (!response.data) {
                    this.shy.Log('WARN: unable to fetch phishing data from urlhaus');
                    return;
                }
                // Load the HTML content of the webpage using cheerio
                const $ = cheerio_1.default.load(response.data.toString());
                let lines = [];
                // Split the content into lines
                lines = response.data.toString().split('\n');
                // Create an empty array to store the links
                const links = [];
                // Iterate through each line and extract links
                lines.forEach((line) => {
                    // Remove leading and trailing spaces
                    const trimmedLine = line.trim();
                    // Check if the line is not empty and doesn't start with '#' (comments)
                    if (trimmedLine && !trimmedLine.startsWith('#')) {
                        links.push(trimmedLine);
                    }
                });
                // Save the links to a JSON file
                const jsonData = JSON.stringify(links, null, 2);
                //save it as a class variable for convenience
                fs_1.default.writeFileSync('assets/intelligence.json', jsonData);
            }
            catch (error) {
                this.shy.Log('Red', error);
                return;
            }
        });
    }
    /**
     * Loads an array of phising / malware links from the urlhaus database into memory, 
     * updated once every five minutes in {@link update}
     * @returns 
     */
    loadIntel() { 
        const raw = fs_1.default.readFileSync('assets/intelligence.json');
        const data = JSON.parse(raw.toString());
        if (!data)
            throw new types_1.fsError('unable to load malicious url database.');
        return data;
    }
    /**
     * Does a message, or any of it's contents / embeds contain a link to malware for REALSIES
     * @param {Message} message 
     * @returns 
     */
    positiveURL(message) {
        let content = ''; 
        if(message instanceof Message)
            content = message.content; 
        else if(message instanceof CommandInteraction)
            content = message.message?.content; 
        if(!content)
            return {match:false, urls:undefined};
        return __awaiter(this, void 0, void 0, function* () {
            const contentUrls = message.content.match(this.urlRegex);
            if (contentUrls) {
                if (this.intel.includes(contentUrls[0])) {
                    //ruh-roh raggey, we gotta racker 
                    let origin = message.guild ? message.guild.name : message.author.username; //if guild is null and message is a dm, send the author's name 
                    this.shy.Log(`Red, Bold`, `Likely malicious link detected origin: ${origin} content:${message.content}`);
                    //Delete the msg, better safe than sorry with these odds
                    yield message.delete()
                        .then(() => {
                        message.channel.send({ embeds: [youShouldLitterallyNeverSeeThis.dearGodItsReal(this.shy)] });
                    });
                    return { match: true, urls: contentUrls };
                }
                else
                    return { match: false, urls: undefined };
            }
            else
                return { match: false, urls: undefined };
        });
    } 
    
    /**
     * Determine whether or not a guild already has a quarantine role registered 
     * @param {Guild} Guild 
     * @return {boolean}
     */
    hasQuarantineRole(Guild)
    {
        try
        {
            const quarantine_role = Utils.get(Guild.roles, name="fsQuarantine"); 
            let registered_quaratine_role = this.db.getGuildConfig(Guild, `quaratine_role`);
            
            //we want to be sure that a guild can only have a role associated with "quarantine"
            //if the guild owner or admins have specifially created said role for the quarantine
            //this way if a guild so happens to have a role named "fsQuarantine", that won't automatically be treated as the default quarantine role 
            if(quarantine_role && registered_quaratine_role)
                return true; 

            else if(!registered_quaratine_role && quarantine_role)
                return true; 
            else if(!quarantine_role && !registered_quaratine_role)
                return false; 
            else 
                return false; 

        }
        catch(error)
        {
            this.shy.log(error);
            return false; 
        }
    }
    /**
     * updates AngelBunny, and all of his components. To be called in the main event loop
     */
    update()
    {
       setInterval(this.loadIntel(), 1000 * 60 * 60 * 5); 

    }
}
exports.AngelBunny = AngelBunny;
exports.default = AngelBunny;
