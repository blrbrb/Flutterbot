require('dotenv').config();
const { SimpleDatabase, FluttershyLockBox } = require('./utils')
const { Client, Partials, GatewayIntentBits } = require('discord.js');
const { DisTube } = require('distube');
const filters = require('./assets/filters.json');
const { prefixcommands, slashcommands, current_maintenance } = require('./findAllCommands.js');
const LastfmApi = require('lastfmapi'); 
const http = require('http');
const url = require('url');

const client = new Client({
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

client.lastfm = new LastfmApi({
	'api_key' : process.env.FM_KEY,
	'secret' : process.env.FM_SECRET
}); 

client.prefixcommands = prefixcommands;
client.slashcommands = slashcommands;
client.LockBox = new FluttershyLockBox(); 
client.db = new SimpleDatabase('assets/db.json');
client.fmAuthUrl = client.lastfm.getAuthenticationUrl({ 'cb' : "https://e7e1-97-83-17-173.ngrok-free.app"});
client.DisTube = new DisTube(client, {
    leaveOnStop: false,
    leaveOnFinish: true,
    leaveOnEmpty: true,
    emptyCooldown: 5,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    youtubeCookie: process.env.FART,
    customFilters: filters
});

var key = ''; 

///We need to find a way to move this to another file or something??? Or have these listeners, clients, etc in a more organized structure
http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;

    if (pathname === '/') {
        
        console.log('pathname = /')
        res.writeHead(200, { 'Content-Type' : 'text/html' });
        res.end('<a href="' + client.fmAuthUrl + '">Authenticate</a>');
        client.db.addEntry(`last_fmSessions.${session.username}`, session.key); 
        return;
    }

    if (pathname === '/auth') {
        console.log('pathname = /auth')
        var token = url.parse(req.url, true).query.token;

        client.lastfm.authenticate(token, function (err, session) {
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
                
                //encrypt the new user's secure key before storing it in the database. 
                //client.db.addEntry(`last_fmSessions.${session.username}`, session.key); 
                
                 
            }

        });

        return;
    }

    res.writeHead(404, { 'Content-Type' : 'text/plain' });
    res.end('Not found');


}).listen(8080);

const eventFiles = require('./utils/findFiles')(__dirname, './events', '.js');
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) client.once(event.name, (...args) => event.execute(client, ...args));
    else client.on(event.name, (...args) => event.execute(client, ...args));
}







client.on('interactionCreate', interaction => {
    
    
    if(current_maintenance && !developers.includes(interaction.user.id))
    {
        return 
    }
    
    if (interaction.channel.id == '1091850338023260261') return;
    try {
        // we should check if a command isnt found but was registered in discord
        slashcommands.get(interaction.commandName)?.execute(interaction, client);
    } catch (error) {
        console.error(error);
        interaction.reply({
            content: `Something went wrong while executing this command... tell Eli that: \n  **${error.message}**`,
            ephemeral: true,
        });
    }

    
});
/* 
client.on('guildMemberAdd', async guildMember => {
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'new broner');
});
 */

//When fluttershy has joined a new guild
client.on('guildCreate', (guild) => {});

client.login(process.env.DISCORD_TOKEN);
/* 
async function voice(message, args) {
    message.channel.send(await ai(args));
}

async function save_data(values, file) {
    let json = JSON.stringify(values);
    fs.writeFile(file, json, function (err, result) {
        if (err) console.log('JSON file writing error in main.js lin 431 caught', err);
    });
}

async function load_data(file) {
    let values;
    //var values = JSON.parse(file); 
    fs.readFile(file, 'utf-8', function (err, result) {
        if (err) console.log('txt file reading error in main.js lin 450 caught', err);
        values = result;
    });
    return values;
}
 */
client.on('ready', async () => {
    //Distube listeners need to be initalized here, according to the documentation on DisTube.js 
    // discord bot "ready" event is only called once, but the listeners will still be activated.
    client.DisTube.on("playSong", (queue, song) => {
        queue.textChannel.send(removeEveryoneMentions(`🎶 Now playing **${song.name}** / ${song.formattedDuration} / requested by ${song.user}`));


        client.DisTube.on("error", (channel, e) => {
            // console.log(e.stack);
            console.log(Object.getOwnPropertyNames(e));
            console.log(Object.keys(e));
            console.log(e.message);
            console.log(e.name);
            client.DisTube.deleteQueue();
            channel.send(`I'm sorry, My songbirds are having trouble playing this song because...\n\`${e.message}\``);
            //console.log(e);
        });


        client.DisTube.on("empty", (queue) => { queue.textChannel.send("Oh has everyone gone home? I'll stop playing the music"); });

    });

});

//client debugging events 
client.on("reconnecting", function () {
    console.log(`FlutterShy Is Attempting to Reconnect to the Websocket`);
});

client.on("guildUnavailable", function (guild) {
    console.log('Fluttershy Cannont Connect to Discord');
    console.error('Unable to connect to discord. Discord is likley offline or not working right now');
});

client.on("messageReactionRemove", async (reaction, user) => { });

client.on("guildMemberSpeaking", function (member, speaking) {

});

//Mares mares mares mares mares, when I am sad I like to thnk about mares. Mares make me feel better when I am depressed. Life can make me depressed often but I like mares and thinking about cute mares mares mares. So It is okay

function removeEveryoneMentions(text) {
    // Define regex pattern to match @everyone mentions
    const pattern = /@everyone/g;

    // Use String.replace() to replace all matches of the pattern with an empty string
    const updatedText = text.replace(pattern, "");

    // Return the updated text
    return updatedText;
}