const { Client, Partials, Collection, GatewayIntentBits, MessagesActionRow, ActionRowBuilder, Discord, Formatters } = require('discord.js');

const MessageEmbed  = require('discord.js');
const scan = require('./utils/findimage.js');
const cheerio = require('cheerio');
const request = require('request');
const { DisTube } = require('distube');
const { REST, Routes } = require('discord.js');
const filters = require("./assets/filters.json");
const path = require('path'); 
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
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
    status: 'You know im not a tree, right?'
  }
});



require('dotenv').config();



const prefix1 = "-"; 

const fs = require('fs');
let debug = false; 


client.commands = new Collection(); 
client.imgcommands = new Collection();
client.slashcommands = new Collection(); 
client.aliases = new Collection(); 
 

//test change
//init command source (stored in seperate js modules)
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
const imageFiles = fs.readdirSync('./commands/image/').filter(file => file.endsWith('.js'));
const slashFiles = fs.readdirSync('./commands/slash/').filter(file => file.endsWith('.js')); 
 




 


//Global Variables 
let lang = require(`./lang/en.js`); 





var a =0; 
var b = 0;
var c = 0;

//init commands before the client is online 
init_commands();
register_slash_commands();

client.DisTube = new DisTube(client, {
    leaveOnStop: false,
    leaveOnFinish: true, 
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    youtubeCookie: process.env.FART,
    youtubeIdentityToken: process.env.ID_TOKEN,
    customFilters: filters
    
	
})





//main events 


    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        if (event.once) {
            client.once(event.name, (client, ...args) => event.execute(client, ...args));
        } else {
            client.on(event.name, (client, ...args) => event.execute(client, ...args));
        }
    }


client.on('interactionCreate', interaction => { 
    
 
    const { commandName } = interaction;
    const user = interaction.user
    const command = client.slashcommands.get(commandName); 
    //update button interactions 

    if(interaction.isButton())
    { 
      //if the Button interaction is coming from the play command. e.g. Someone has given the queue a non link string, and search results are being displayed in an ActionRow
      if(interaction.customId.includes('youtube'))
      {
        
        interaction.reply({content:`Okay, I'll put that song into the queue for you!`, ephemeral: true})
    
        client.DisTube.play(interaction.member.voice.channel,interaction.component.customId,{
            member: interaction.member,
            textChannel: interaction.channel,
            interaction

        });

      }
     if(interaction.customId == 'Gamer')
     {
        
        const gamer_role = interaction.message.channel.guild.roles.cache.find(role => role.name === 'Gamer');
        try 
        {
          
            interaction.message.guild.members.cache.get(user.id).roles.add(gamer_role) 
        } 
        catch(error) {
           
            if(error.message == 'Missing Permissions') 
            {
                interaction.reply({
                    content: `I'm sorry, it looks like I don't have permission to modify your roles on this server: \n  **${error.message}**`,
                    ephemeral: true,
                })

            } 
            interaction.reply({
               content: `Something went wrong while executing this command... tell Eli that: \n  **${error.message}**`,
               ephemeral: true,
           })
        }

     }
     if(interaction.customId == 'Luna') 
     { 
        
        const gamer_role = interaction.message.channel.guild.roles.cache.find(role => role.name === 'New Lunar Republic');
        try 
        {
          
            interaction.message.guild.members.cache.get(user.id).roles.add(gamer_role) 
        } 
        catch(error) {
           
            if(error.message == 'Missing Permissions') 
            {
                interaction.reply({
                    content: `I'm sorry, it looks like I don't have permission to modify your roles on this server: \n  **${error.message}**`,
                    ephemeral: true,
                })

            } 
            interaction.reply({
               content: `Something went wrong while executing this command... tell Eli that: \n  **${error.message}**`,
               ephemeral: true,
           })
        }



     }
       
        return 
    }
    

   
    console.log(interaction.options.values);
    try {
         command.execute(Discord, client, interaction, debug);
    } catch (error) {
        console.error(error);
         interaction.reply({
            content: `Something went wrong while executing this command... tell Eli that: \n  **${error.message}**`,
            ephemeral: true,
        });
    }
}); 

client.once('ready', () => { 
	
   
		
	
	});


client.on('guildMemberAdd', async guildMember => {let welcomeRole = guildMember.guild.roles.cache.find(role => role.name ==='new broner')






}); 


client.on('guildCreate', (guild) => {
	
       

}); 


//these event listeners shouldn't be ever nested. It will cause a memory leak, everytime discord's client events are called these will 
// be called in tandem created multipule uncess. instances. 






client.DisTube.on("playSong", (queue, song) => {
    


    queue.textChannel.send(`🎶 Now playing **${song.name}** / ${song.formattedDuration} / requested by ${song.user}`);
});



client.DisTube.on("error", (channel, e) => {

    
  
   // console.log(e.stack)
    console.log(Object.getOwnPropertyNames(e))
    console.log(Object.keys(e))
    console.log(e.message)
    console.log(e.name)
    
    
    channel.send(`I'm sorry, My songbirds are having trouble playing this song because...\n\`${e.message}\``); 
    //console.log(e);
    
   
      
    
 
});




client.login(process.env.DISCORD_TOKEN);
     

async function voice(message, args)
{
        
     message.channel.send(await ai(args))
        
}

 
 async function save_data(values, file) 
 {
 	
 	var json = JSON.stringify(values); 
 	
 	 fs.writeFile(file, json, function (err, result) {
        
        if (err) console.log('JSON file writing error in main.js lin 431 caught', err);
        
    });
    
    
    

 	
 	
 	
 }


 async function load_data(file) 
 {
 	let values;
 	//var values = JSON.parse(file); 
 	 fs.readFile(file, 'utf-8', function (err, result) {
        
        if (err) console.log('txt file reading error in main.js lin 450 caught', err);
        values = result; 
    });

 	
 	return values; 
 }

 	

//client debugging events 
client.on("reconnecting", function(){
    console.log(`FlutterShy Is Attempting to Reconnect to the Websocket`);
});


client.on("guildUnavailable", function(guild){
	console.log('Fluttershy Cannont Connect to Discord'); 
    console.error('Unable to connect to discord. Discord is likley offline or not working right now');
});


client.on("error", function(error, message){
	
  
})




client.on("messageReactionRemove", async (reaction, user) => {
   





});



client.on("guildMemberSpeaking", function (member, speaking) {
    console.log(`a guild member starts/stops speaking: ${member.tag}`);
});



//Mares mares mares mares mares, when I am sad I like to thnk about mares. Mares make me feel better when I am depressed. Life can make me depressed often but I like mares and thinking about cute mares mares mares. So It is okay
async function init_commands() {

    //init text input commands 
    for (const file of commandFiles) {
        var arr = [];
        const command = require(`./commands/${file}`);
        arr.push(file);
        const total = commandFiles.length;

        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write("loading commands:" + Math.round((1 + commandFiles.indexOf(file)) / total * 100) + "%");


        client.commands.set(command.name, command);

        if (command.aliases) {
            command.aliases.forEach(alias => {
                client.aliases.set(alias, command)

            });

        }
        process.stdout.write(" ");
        //console.log(' '); 
    }


    console.log(' ');


    //init image manipulation commands 
    for (const file of imageFiles) {
        var arr = [];
        const command = require(`./commands/image/${file}`);
        arr.push(file);

        const total = imageFiles.length;
        //console.log(total); 
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write("loading Image Commands:" + Math.round((1 + imageFiles.indexOf(file)) / total * 100) + "%");


        client.imgcommands.set(command.name, command);


        if (command.aliases) {
            command.aliases.forEach(alias => {
                client.aliases.set(alias, command)

            });

        }




    }

    console.log(' ');

    //init the slash commands 
    for (const file of slashFiles) {
        var arr = [];
        const command = require(`./commands/slash/${file}`);
        arr.push(file);

        const total = imageFiles.length;
        //console.log(total); 
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write("loading Image Commands:" + Math.round((1 + imageFiles.indexOf(file)) / total * 100) + "%");


        client.slashcommands.set(command.name, command);


        if (command.aliases) {
            command.aliases.forEach(alias => {
                client.aliases.set(alias, command)

            });

        }




    }

    console.log(' '); 
   

    //register the slash commands 
   

}

async function register_slash_commands() {
    try {
        const clientId = '817161573201608715';
        const guildId = '960713019753644032';
    
        const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: client.slashcommands },
        );
      
      // DEBUG  console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {


        // console.error(error);
        console.log('error loading one or more slash commands');
        console.log(error.rawError);
    }


}


async function fetchAllMessages() {
    console.log('fetching messages...')
    const channel = client.channels.cache.get("960713019753644035");
    let messages = [];
  
    // Create message pointer
    let message = await channel.messages
      .fetch({ limit: 1 })
      .then(messagePage => (messagePage.size === 1 ? messagePage.at(0) : null));
  
    while (message) {
      await channel.messages
        .fetch({ limit: 100, before: message.id })
        .then(messagePage => {
          messagePage.forEach(msg => messages.push(msg));
           console.log(message)         
          // Update our message pointer to be last message in page of messages 
          message = 0 < messagePage.size ? messagePage.at(messagePage.size - 1) : null;
        })
    }
    console.log('fucking your mother')   
    console.log(messages)
    save_data(messages, "messages.json");  // Print all messages
  }
