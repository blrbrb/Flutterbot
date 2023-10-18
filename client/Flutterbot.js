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
exports.Flutterbot = void 0;
require('dotenv').config();
const SimpleDatabase_1 = __importDefault(require("../utils/SimpleDatabase"));
const expHandler_1 = __importDefault(require("../utils/expHandler"));
const evaluator_1 = __importDefault(require("../guardianAngel/evaluator"));
const LockBox_1 = __importDefault(require("../utils/LockBox"));
const distube_1 = __importDefault(require("distube"));
const express_1 = __importDefault(require("express"));
const { Client, Partials, GatewayIntentBits, Collection, SnowflakeUtil } = require('discord.js');
const { SoundCloudPlugin } = require("@distube/soundcloud");
const filters = require('../assets/filters.json');
const { prefixcommands, slashcommands, current_maintenance } = require('../findAllCommands.js');
const LastfmApi = require('lastfmapi');
const { Structures } = require('discord.js');
const { findFiles } = require('../utils/utilities');
const options = {
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User,
        Partials.GuildMember,
        Partials.Reaction
    ],
    presence: {
        activities: [
            {
                name: "Hi",
                type: 0
            },
            {
                name: "Y'Mother",
                type: 0
            }
        ],
        status: 'You know I\'m not a tree, right?'
    }
};
class Flutterbot extends Client {
    constructor() {
        super(options);
        this.cooldowns = new Collection();
        this.collectors = new Map();
        this.GuildCooldowns = new Map();
        this.SlashCommands = slashcommands;
        this.PrefixCommands = prefixcommands;
        this.DB = new SimpleDatabase_1.default('assets/db.json', this.log);
        this.LockBox = new LockBox_1.default();
        this.Exp = new expHandler_1.default(this.DB);
        this.DisTube = this._initDistube();
        this.Evaluator = this._initEvaluator();
        this.Lastfm = this._initLastFMAPI();
        this.PORT = process.env.PORT || 3000;
        this.app = (0, express_1.default)();
    }
    /**private class initalizers */
    _initLastFMAPI() {
        return this.Lastfm = new LastfmApi({
            'api_key': process.env.FM_KEY,
            'secret': process.env.FM_SECRET
        });
    }
    _initDistube() {
        return this.DisTube = new distube_1.default(this, {
            leaveOnStop: true,
            leaveOnFinish: true,
            leaveOnEmpty: true,
            emptyCooldown: 5,
            emitAddSongWhenCreatingQueue: false,
            emitAddListWhenCreatingQueue: false,
            youtubeCookie: process.env.FART,
            customFilters: filters,
            plugins: [new SoundCloudPlugin({ clientId: process.env.SOUNDCLOUD_CLIENT, oauthToken: process.env.SOUNDCLOUD_TOKEN })]
        });
    }
    //must be called AFTER this.initdb();
    _initEvaluator() {
        return this.Evaluator = new evaluator_1.default(this.DB, this.client);
    }
    //update the database on an hourly basis to ensure the perseverance of data between leaving / joining
    //and client restarts 
    getDefaultCoolDown(serverId) {
        let default_cooldown = this.DB.get(`${serverId}.config.default_cooldown`);
        if (!default_cooldown)
            return 2;
        else
            return default_cooldown;
    }
    updateEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            const eventFiles = findFiles(__dirname, '../events', '.js');
            for (const file of eventFiles) {
                const event = require(`../events/${file}`);
                if (event.once)
                    this.once(event.name, (...args) => event.execute(this, ...args), (...args) => this.Exp.update(...args));
                else
                    this.on(event.name, (...args) => event.execute(this, ...args), (...args) => this.Exp.update(...args));
            }
        });
    }
    // Method to start the bot
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.Exp.writeAll();
            yield this.login(process.env.DISCORD_TOKEN);
            yield this.updateEvents();
            //await this.Evaluator.updateIntelligence(); 
        });
    }
}
exports.Flutterbot = Flutterbot;
exports.default = Flutterbot;
