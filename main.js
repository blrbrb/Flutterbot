require('dotenv').config();
const { SimpleDatabase, Log, FluttershyLockBox } = require('./utils')
const { Client, Partials, GatewayIntentBits } = require('discord.js');
const { DisTube } = require('distube');
const filters = require('./assets/filters.json');
const { prefixcommands, slashcommands, current_maintenance } = require('./findAllCommands.js');


//I will force this to be c++ 
//I LOVE C++ I LOVE OBJECTS
//I LOVE OVER THE TOP ORGANIZATION 
//every single component is ON WORKING MEMORY AT ALL TIMES WOOOOOO BABY THATS WHAT IM TALKING ABOUT 
class Flutterbot {
    constructor() {
       this.initClient();
       this.initDistube(); 
       this.initdb('assets/db.json');
       this.initLockBox()
       this.slashcommands = slashcommands; 
       this.prefixcommands = prefixcommands; 
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
        this.LockBox = new FluttershyLockBox();
    }
   
    update()
    {
        const eventFiles = require('./utils/findFiles')(__dirname, './events', '.js');
        for (const file of eventFiles) {
            const event = require(`./events/${file}`);
         if (event.once) this.client.once(event.name, (...args) => event.execute(this, ...args));
         else this.client.on(event.name, (...args) => event.execute(this, ...args));
    }
    }

    
    // Method to start the bot
    start() {
      this.client.login(process.env.DISCORD_TOKEN);
      this.update(); 
    }
  }






/* 
client.on('guildMemberAdd', async guildMember => {
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'new broner');
});
 */



const entry = new Flutterbot(); 

entry.start(); 





//Mares mares mares mares mares, when I am sad I like to thnk about mares. Mares make me feel better when I am depressed. Life can make me depressed often but I like mares and thinking about cute mares mares mares. So It is okay




