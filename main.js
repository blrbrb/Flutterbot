require('dotenv').config();
const { SimpleDatabase, Log, LockBox } = require('./utils')
const Evaluator = require('./guardianAngel/evaluate.js');
const { Client, Partials, GatewayIntentBits, Collection, SnowflakeUtil} = require('discord.js');
const { DisTube } = require('distube');
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
       this.initClient();
       this.initDistube();
       this.initdb('assets/db.json');
       this.initEvaluator(); 
       this.initLockBox(); 
       this.slashcommands = slashcommands; 
       this.prefixcommands = prefixcommands; 
       this.cooldowns = new Collection();
       this.GuildCoolDowns = new Map();     
       this.lastfm =  new LastfmApi({   
        'api_key' : process.env.FM_KEY,
        'secret' : process.env.FM_SECRET
    }); 

    }
     

    //initalizers 
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
            leaveOnStop: false,
            leaveOnFinish: true,
            leaveOnEmpty: true,
            emptyCooldown: 5,
            emitAddSongWhenCreatingQueue: false,
            emitAddListWhenCreatingQueue: false,
            youtubeCookie: process.env.FART,
            customFilters: filters
        });   
    }
    initdb(file)
    {
     this.db = new SimpleDatabase(file);
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
    updateLastFMServer()
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
        console.log('updating sacrified roles...');
        members.forEach(member => {
            
            if(member.roles.cache.has('1109587525720342548'))
            {
                sacrificed.push(member.id);
                console.log('person has the sacrified role');
            } 
           
        })
        this.db.addEntry(`${process.env.GUILD_ID}.sacrificed`, sacrificed);
        
        
    }
    getDefaultCoolDown(serverId) {
        
       let default_cooldown = this.db.getValue(`${serverId}.config.default_cooldown`);
       if(!default_cooldown)
        return 2; 
       else 
       return default_cooldown;
    }
   async update()
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
      //cannot access the on ready event in update(). Important to do it here. 
      this.client.on('ready', async (client) =>
      {
       await this.update();
      
   
      });
      const repeater = 60* 60 * 1000; //hourly update
      setInterval(async() =>{await this.updateSurvivors()}, repeater);
     
    }
  }


const entry = new Flutterbot(); 
entry.start(); 


//Mares mares mares mares mares, when I am sad I like to thnk about mares. Mares make me feel better when I am depressed. Life can make me depressed often but I like mares and thinking about cute mares mares mares. So It is okay