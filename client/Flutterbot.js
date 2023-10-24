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
exports.Flutterbot = exports.shy = void 0;
require('dotenv').config();
const SimpleDatabase_1 = require("../utils/SimpleDatabase");
const ExpHandler_1 = require("../utils/ExpHandler");
const evaluator_1 = __importDefault(require("../guardianAngel/evaluator"));
const LockBox_1 = __importDefault(require("../utils/LockBox"));
const distube_1 = __importDefault(require("distube"));
const utilities_1 = require("../utils/utilities");
const discord_js_1 = require("discord.js");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const filters = require('../assets/filters.json');
const LastfmApi = require('lastfmapi');
const commands = utilities_1.findAllCommands();
/**
* Flutterbot's default presence, partials, intents data etc
*/
const options = {
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.GuildPresences,
        discord_js_1.GatewayIntentBits.GuildMessageReactions,
        discord_js_1.GatewayIntentBits.GuildVoiceStates,
        discord_js_1.GatewayIntentBits.DirectMessages,
        discord_js_1.GatewayIntentBits.MessageContent
    ],
    partials: [
        discord_js_1.Partials.Channel,
        discord_js_1.Partials.Message,
        discord_js_1.Partials.User,
        discord_js_1.Partials.GuildMember,
        discord_js_1.Partials.Reaction
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
        ]
    }
};

 class Shy extends discord_js_1.Client {
    /**
    * Creates an instance of Fluttershy.
    * @memberof Shy
    */
    constructor() {
        super(options); //clear the log on start;
        /**
        * cooldown times for commands
        * @memberof Shy
        */
        this.cooldowns = new discord_js_1.Collection();
        /**
         * Log
         * @memberof Shy
         */
        this.Log = utilities_1.Log;
        /**
         * message collectors for button components
         * @memberof Shy
         */
        this.collectors = new Map();
        /**
        * cooldown times created by guilds
        * @memberof Shy
        */
        this.GuildCooldowns = new Map();
         /**
        * Flutterbot's slash (interaction) commands
        * @memberof Shy
        */
        this.SlashCommands = commands.SlashCommands;
        /**
         * Flutterbot's prefix commands
        * @memberof Shy
        */
        this.PrefixCommands = commands.PrefixCommands;
        /**
         * Flutterbot's last.fm api instance
        * @memberof Shy
        */
        this.LastFm = new LastfmApi({
            'api_key': process.env.FM_KEY,
            'secret': process.env.FM_SECRET
        });
        /**
         * Flutterbot's [Database]({@link SimpleDatabase})
        * @memberof Shy
        */
        this.DB = new SimpleDatabase_1.SimpleDatabase('assets/db.json', this.Log, false);
        /**
         * encryption utility
        * @memberof Shy
        */
        this.LockBox = new LockBox_1.default();
        /**
        * message / url content saftey scanner module
        * @memberof Shy
        */
        this.Evaluator = new evaluator_1.default(this.DB, this);
        /**
         * Flutterbot's DisTube instance
        * @memberof Shy
        */
        this.DisTube = new distube_1.default(this, {
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
        /**
         * Flutterbot's expeirence handler
        * @memberof Shy
        */
        this.ExpHandler = new ExpHandler_1.ExpHandler(this.DB);
    }
    getDefaultCoolDown(serverId) {
        let default_cooldown = this.DB.get(`${serverId}.config.default_cooldown`);
        if (!default_cooldown)
            return 2;
        else
            return default_cooldown;
    }
    /**
     * The bot client's main loop
     * @return {Promise<void>}
     * @memberof Shy
     */
    updateEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            const eventFiles = utilities_1.findFiles(__dirname, '../events', '.js');
            for (const file of eventFiles) {
                const event = require(`../events/${file}`);
                if (event.once)
                    this.once(event.name, (...args) => { event.execute(this, ...args), this.ExpHandler.update(...args); });
                else
                    this.on(event.name, (...args) => { event.execute(this, ...args), this.ExpHandler.update(...args); });
            }
        });
    }
    /**
     * You know she's not a tree right?
     * @memberof Shy
     */
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ExpHandler.writeAll();
            yield this.login(process.env.DISCORD_TOKEN);
            yield this.updateEvents();
            yield this.Evaluator.updateIntelligence();
        });
    }
}
exports.shy = Shy;
class Flutterbot extends Shy{
   
    constructor()
    {
    super();
    this.resolveGuildId = utilities_1.resolveGuildID;
    this.resolveUserId = utilities_1.resolveUserID;
    this.resolveId = utilities_1.resolveID;
    this.getsnowflakeType = utilities_1.getSnowflakeType;
    this.getextension = utilities_1.getExtension;
    this.isSnowflake = utilities_1.IsSnowflake;
    this.getArrayType = utilities_1.getArrayType;
    this.format = utilities_1.format;
    this.formatSeconds = utilities_1.formatSeconds;
    this.toTimezone = utilities_1.convertToTimezone;
    this.hasVoicePerms = utilities_1.hasVoiceChannelPermissions;
    this.isNsfwChannel = utilities_1.nsfwChannel;
    this.langRand = utilities_1.langRand;
    this.removeEveryoneMentions = utilities_1.removeEveryoneMentions;
    this.mediaSource = utilities_1.MusicMediaUrl;
    this.formatytlink = utilities_1.formatYtLink;
    this.lockbox = new LockBox_1.default();
    this.lastfm = this.LastFm;
    this.imageFinder = utilities_1.imageFinder;
    }
    
}
exports.Flutterbot = new Flutterbot();

