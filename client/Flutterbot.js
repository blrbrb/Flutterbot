require('dotenv').config();
const express = require('express');
const { SimpleDatabase } = require('../utils/SimpleDatabase');
const {Log} = require('../utils/utilities.js');
const { Client, Partials, GatewayIntentBits, Collection, SnowflakeUtil} = require('discord.js');
const { DisTube } = require('distube');
const { SoundCloudPlugin } = require("@distube/soundcloud");
const {expHandler} = require('../utils/exp');
const filters = require('../assets/filters.json');
const { prefixcommands, slashcommands, current_maintenance } = require('../findAllCommands.js');
const LastfmApi = require('lastfmapi'); 

class Flutterbot {
    constructor() {
       this.initClient(); //organized by call heirachy. Shit on top is needed for shit on the bottom. 
       this.initDistube();
       this.initLogger(); 
       this.initdb('assets/db.json');
       this.initLastFMAPI(); 
       this.initCooldowns(); 
       this.initCommands(); 
       this.initCollectors(); 
       this.initexp(); 
    
       //this.sessions = []; 
    }
     

    //initalizers 
    initCooldowns()
    {
        this.cooldowns = new Collection();
        this.GuildCoolDowns = new Map();
        
    }
    initCommands()
    {
        this.slashcommands = slashcommands; 
        this.prefixcommands = prefixcommands; 
    }
    initLastFMAPI()
    {
        this.lastfm =  new LastfmApi({   
            'api_key' : process.env.FM_KEY,
            'secret' : process.env.FM_SECRET
        }); 
    }
    initLogger()
    {
        this.log = new Log({clear:true}); 
         
    }
    initCollectors()
    {
        this.collectors = new Map();
       
    }
    initClient()
    {
        this.client = new Client({
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
        });
        
    }

    initDistube()
    {
        this.DisTube = new DisTube(this.client, {
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
    initdb(file)
    {
    this.db = new SimpleDatabase();
    }
    initexp()
    {
        this.exp = new expHandler(this.db); 
    }
    //must be called AFTER this.initdb();


    //update the database on an hourly basis to ensure the perseverance of data between leaving / joining
    //and client restarts 
    getDefaultCoolDown(serverId) {
        
       let default_cooldown = this.db.query(`SELECT cooldown_seconds FROM GUILDS WHERE guild_id=${serverId}`);
       console.log(`fetched default cooldown is ${default_cooldown} getDefaultCoolDown() FLutterbot.js`);
       if(!default_cooldown)
        return 2; 
       else 
       return default_cooldown;
    }
   async updateEvents()
    {
        const eventFiles = require('../utils/findFiles')(__dirname, '../events', '.js');
        for (const file of eventFiles) {
            const event = require(`../events/${file}`);
           
         if (event.once) this.client.once(event.name, (...args) => event.execute(this, ...args), (...args) => this.exp.update(...args));
         else this.client.on(event.name, (...args) => event.execute(this, ...args), (...args) => this.exp.update(...args));

    }
    }

    
    // Method to start the bot
    async start() {
      await this.client.login(process.env.DISCORD_TOKEN);
      await this.updateEvents(); 
      
     // await this.Evaluator.updateIntelligence(); 
    }
  }



module.exports = {Flutterbot}; 
//const entry = new Flutterbot(); 
//entry.start(); 


