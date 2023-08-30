require('dotenv').config();
const {db} = require('./utils')
const { Client, Partials, GatewayIntentBits } = require('discord.js');
const { DisTube } = require('distube');
const filters = require('./assets/filters.json');
const { prefixcommands, slashcommands } = require('./findAllCommands.js');

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

client.prefixcommands = prefixcommands;
client.slashcommands = slashcommands;
client.db = new db('assets/db.json')

client.DisTube = new DisTube(client, {
    leaveOnStop: false,
    leaveOnFinish: true,
    leaveOnEmpty: true,
    emptyCooldown: 5,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    youtubeCookie: process.env.FART,
    youtubeIdentityToken: process.env.ID_TOKEN,
    customFilters: filters
});

// main events
const eventFiles = require('./utils/findFiles')(__dirname, './events', '.js');
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) client.once(event.name, (...args) => event.execute(client, ...args));
    else client.on(event.name, (...args) => event.execute(client, ...args));
}

client.on('interactionCreate', interaction => {
    // we shouldnt just ignore an interaction
    // and instead we should give an empty response to discord with an acknowledgement but without a response
    // otherwise the channel where the interaction was created in will react as if the bot is offline
    // possibly prompting people to think the bot had crashed
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