require('dotenv').config();
const express = require('express');
const { SimpleDatabase } = require('../utils/SimpleDatabase');
const {Log} = require('../utils/utilities.js');
const { Client, Partials, GatewayIntentBits, Collection, SnowflakeUtil} = require('discord.js');
const { DisTube } = require('distube');
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { YouTubePlugin } = require("@distube/youtube");
const {expHandler} = require('../utils/exp');
const filters = require('../assets/filters.json');
const Evaluator = require('../guardianAngel/evaluate');
const { prefixcommands, slashcommands, current_maintenance } = require('../findAllCommands.js');
const LastfmApi = require('lastfmapi'); 
const chron = require('node-cron');

class Flutterbot {
    constructor() {
       this.initClient(); //organized by call heirachy. Shit on top is needed for shit on the bottom. 
       this.initDistube();
       this.initLogger(); 
       this.initEvaluator();
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
    initEvaluator()
    {
    	this.evaluator = new Evaluator(this.db);
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
            emitAddSongWhenCreatingQueue: false,
            emitAddListWhenCreatingQueue: false,
            customFilters: filters,
            plugins:[new SoundCloudPlugin({clientId: process.env.SOUNDCLOUD_CLIENT,  oauthToken: process.env.SOUNDCLOUD_TOKEN}),
                    new YouTubePlugin()]
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
       
        this.db.query(`INSERT INTO GUILDS (guild_id, cooldown_seconds) VALUES (${serverId}, 2) ON DUPLICATE KEY UPDATE guild_id=guild_id, cooldown_seconds=cooldown_seconds`);
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
    async updateTasks()
    {
        const registeredTasks = await this.db.query(`SELECT * FROM TASKS`);
        console.log(registeredTasks);

        registeredTasks.forEach(task=>{
            chron.schedule('* * * * *',async ()=>
                {
                    const guild = await this.client.guilds.fetch(task.guid);
                    const channel = await guild.channels.fetch(task.channel_id); 
                    const date = new Date(task.until);
                    const now = new Date(); 
                    let difference= date - now; 
                    console.log('executing task, and sending message');
                    if(channel.isTextBased())
                        {
                            channel.send(difference);
                        }
                })
        });
    }

    
    // Method to start the bot
    async start() {
      await this.client.login(process.env.DISCORD_TOKEN);
      await this.updateEvents(); 
      await this.updateTasks();
      this.evaluator.loadfromFile('./assets/suspicious-list.json', this.db);
     // await this.evaluator.updateIntelligence(this.db); 
    }
  }



module.exports = {Flutterbot}; 
//const entry = new Flutterbot(); 
//entry.start(); 


