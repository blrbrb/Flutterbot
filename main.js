require('dotenv').config();
const express = require('express');
const { SimpleDatabase } = require('./utils/SimpleDatabase');
const {LockBox} = require('./utils/LockBox.js'); 
const Evaluator = require('./guardianAngel/evaluate.js');
const {Log} = require('./utils/utilities.js');
const { Client, Partials, GatewayIntentBits, Collection, SnowflakeUtil} = require('discord.js');
const { DisTube } = require('distube');
const { SoundCloudPlugin } = require("@distube/soundcloud");

const filters = require('./assets/filters.json');
const { prefixcommands, slashcommands, current_maintenance } = require('./findAllCommands.js');
const LastfmApi = require('lastfmapi'); 


const PORT = process.env.PORT || 3000;
//I will force this to be c++ 
//I LOVE C++ I LOVE OBJECTS
//I LOVE OVER THE TOP ORGANIZATION 
//every single component is ON WORKING MEMORY AT ALL TIMES WOOOOOO BABY THATS WHAT IM TALKING ABOUT 
class Flutterbot {
    constructor() {
       this.initClient(); //organized by call heirachy. Shit on top is needed for shit on the bottom. 
       this.initDistube();
       this.initLogger(); 
       this.initdb('assets/db.json');
       this.initEvaluator(); 
      
       this.initLockBox(); 
       this.initLastFMAPI(); 
       this.initCooldowns(); 
       this.initCommands(); 
       this.initCollectors(); 
       this.app = express();
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
        this.collectors = new Collection();
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
     this.db = new SimpleDatabase(file, this.log);
    }
    initLockBox()
    {
        this.LockBox = new LockBox();
    }
    //must be called AFTER this.initdb();
    initEvaluator() 
    {
        this.Evaluator = new Evaluator(this.db, this.LockBox, this.client); 
    }
  
    updateWeekly()
    {
        
    }
    //update the database on an hourly basis to ensure the perseverance of data between leaving / joining
    //and client restarts 
    async updateSurvivors()
    {
        //get the bc guild 
        const guild = await this.client.guilds.fetch(process.env.GUILD_ID);

        // Fetch all members of the guild
        const members = await guild.members.fetch();
        let sacrificed = []; 
        this.log('updating sacrified roles...');
        members.forEach(member => {
            
            if(member.roles.cache.has('1109587525720342548'))
            {
                sacrificed.push(member.id);
                console.log('person has the sacrified role');
            } 
           
        })
        this.db.set(process.env.GUILD_ID, "sacrificed", sacrificed);
        
        
    }
    getDefaultCoolDown(serverId) {
        
       let default_cooldown = this.db.getValue(`${serverId}.config.default_cooldown`);
       if(!default_cooldown)
        return 2; 
       else 
       return default_cooldown;
    }
   async updateEvents()
    {
        const eventFiles = require('./utils/findFiles')(__dirname, './events', '.js');
        for (const file of eventFiles) {
            const event = require(`./events/${file}`);
         if (event.once) this.client.once(event.name, (...args) => event.execute(this, ...args));
         else this.client.on(event.name, (...args) => event.execute(this, ...args));
               
    }
   
    
    }

    
    // Method to start the bot
    async start() {
      await this.client.login(process.env.DISCORD_TOKEN);
    
      await this.updateEvents(); 
     
    }
  }


const entry = new Flutterbot(); 
entry.start(); 


process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Handle the error or log it
});
//Mares mares mares mares mares, when I am sad I like to thnk about mares. Mares make me feel better when I am depressed. Life can make me depressed often but I like mares and thinking about cute mares mares mares. So It is okay