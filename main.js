require('dotenv').config();
const { SimpleDatabase, Log, FluttershyLockBox } = require('./utils')
const { Client, Partials, GatewayIntentBits, Collection} = require('discord.js');
const { DisTube } = require('distube');
const filters = require('./assets/filters.json');
const { prefixcommands, slashcommands, current_maintenance } = require('./findAllCommands.js');
const LastfmApi = require('lastfmapi'); 
const http = require('http');
const url = require('url');


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
       this.cooldowns = new Collection();
       this.GuildCoolDowns = new Map();     
        
       this.lastfm =  new LastfmApi({   
        'api_key' : process.env.FM_KEY,
        'secret' : process.env.FM_SECRET
    }); 
    this.fmAuthUrl = this.lastfm.getAuthenticationUrl({ 'cb' : "https://1b16-97-83-17-173.ngrok-free.app"});
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
            } 
            this.db.addEntry(`${process.env.GUILD_ID}.sacrified`, sacrificed); 
        });
        
        
    }
    getServerCooldown(serverId) {
        
        return null;
      }
   async update()
    {
        const eventFiles = require('./utils/findFiles')(__dirname, './events', '.js');
        for (const file of eventFiles) {
            const event = require(`./events/${file}`);
         if (event.once) this.client.once(event.name, (...args) => event.execute(this, ...args));
         else this.client.on(event.name, (...args) => event.execute(this, ...args));
               
    }
    const intervalInMs = 60 * 60 * 1000;
    const intervalId = setInterval(async () => {
        await this.updateSurvivors();
      }, intervalInMs);
      
    //await this.updateSurvivors();
    }

    
    // Method to start the bot
    async start() {
      await this.client.login(process.env.DISCORD_TOKEN);
      //cannot access the on ready event in update(). Important to do it here. 
      this.client.on('ready', async (client) =>
      {
        await this.update();
      });
    }
  }


const entry = new Flutterbot(); 
entry.start(); 


var key = ''; 
http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;

        var token = url.parse(req.url, true).query.token;

        entry.lastfm.authenticate(token, function (err, session) {
            if (err) {
                console.log(err);
                res.writeHead(401, { 'Content-Type' : 'text/plain' });
                res.end('Unauthorized');

            } else {
                console.log('success!!');
                res.writeHead(200, { 'Content-Type' : 'text/html' });
                res.write('<p>Authentication successful. You can now make authenticated method calls.</p>');
                res.write('<pre>' + JSON.stringify(session, null, '    ') + '</pre>');
                res.write('<p>Store this data for future authentication.</p>');
                res.write('<p>Use <code>client.lastfm.setSessionCredentials(\'' + session.username + '\', \'' + session.key + '\');</code> for automatic authentication in the future.</p>');
                res.end('<pre>:)</pre>'); 
                entry.db.addEntry(`last_fmSessions.${entry.LockBox.encrypt(session.username)}`, entry.LockBox.encrypt(session.key)); 
                //encrypt the new user's secure key before storing it in the database. 
                
                
                 
            }

        });

       

    //res.writeHead(404, { 'Content-Type' : 'text/plain' });
    //res.end('Not found');


}).listen(80);

//Mares mares mares mares mares, when I am sad I like to thnk about mares. Mares make me feel better when I am depressed. Life can make me depressed often but I like mares and thinking about cute mares mares mares. So It is okay




