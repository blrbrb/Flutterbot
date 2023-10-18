require('dotenv').config();
import * as Discord from "discord.js"
import {cooldowns} from "./types"
import SimpleDatabase  from "./SimpleDatabase";
import  expHandler  from "./expHandler";
import Evaluator from "./evaluator";
import  LockBox from "./LockBox";
import DisTube from "distube";
import express from 'express';
import { Log, findFiles } from "./utilities";


const { Client, Partials, GatewayIntentBits, Collection, SnowflakeUtil} = require('discord.js');
const { SoundCloudPlugin } = require("@distube/soundcloud");
const filters = require('../assets/filters.json');
const { prefixcommands, slashcommands, current_maintenance } = require('../findAllCommands.js');
const LastfmApi = require('lastfmapi'); 
const {Structures} = require('discord.js')

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
}

export class Flutterbot extends Client {
   cooldowns= new Collection();
   
   collectors=new Map(); 
   GuildCooldowns=new Map();  
   Evaluator:Evaluator;
   SlashCommands= slashcommands; 
   PrefixCommands=prefixcommands;
   Lastfm:any;
   DB=new SimpleDatabase('assets/db.json', this.log);
   LockBox=new LockBox();
   DisTube: DisTube;
   Exp= new expHandler(this.DB);

    constructor() {
       super(options)
       this.DisTube=this._initDistube();
       this.Evaluator=this._initEvaluator(); 
       this.Lastfm=this._initLastFMAPI(); 
       this.PORT = process.env.PORT || 3000;
       this.app = express();
      
    }

    /**private class initalizers */
    _initLastFMAPI()
    {
       return this.Lastfm =  new LastfmApi({   
            'api_key' : process.env.FM_KEY,
            'secret' : process.env.FM_SECRET
        }); 
    }
    _initDistube()
    {
       return this.DisTube = new DisTube(this, {
            leaveOnStop: true,
            leaveOnFinish: true,
            leaveOnEmpty: true,
            emptyCooldown: 5,
            emitAddSongWhenCreatingQueue: false,
            emitAddListWhenCreatingQueue: false,
            youtubeCookie: process.env.FART,
            customFilters: filters,
            plugins:[new SoundCloudPlugin({clientId: process.env.SOUNDCLOUD_CLIENT,  oauthToken: process.env.SOUNDCLOUD_TOKEN})]
        });   

    }
   
    //must be called AFTER this.initdb();
    _initEvaluator() 
    {
        return this.Evaluator = new Evaluator(this.DB, this.client);   
    }

    //update the database on an hourly basis to ensure the perseverance of data between leaving / joining
    //and client restarts 
    getDefaultCoolDown(serverId:string) {
        
       let default_cooldown = this.DB.get(`${serverId}.config.default_cooldown`);
       if(!default_cooldown)
        return 2; 
       else 
       return default_cooldown;
    }
   async updateEvents()
    {
        const eventFiles = findFiles(__dirname, '../events', '.js');
        for (const file of eventFiles) {
            const event = require(`../events/${file}`);
           
         if (event.once) this.once(event.name, (...args:any[]) => event.execute(this, ...args), (...args:any[]) => this.Exp.update(...args));
         else this.on(event.name, (...args:any[]) => event.execute(this, ...args), (...args:any[]) => this.Exp.update(...args));
    }
    }

    
     // Method to start the bot
     async start() {
      this.Exp.writeAll();
      await this.login(process.env.DISCORD_TOKEN);
      await this.updateEvents(); 
      
      //await this.Evaluator.updateIntelligence(); 
    }
  }

export default Flutterbot; 





