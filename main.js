const { Client, Partials, Collection, GatewayIntentBits, Discord, Formatters } = require('discord.js');

const MessageEmbed  = require('discord.js');
const ytdl = require("ytdl-core"); 
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
            interaction.component.setStyle("SUCCESS");
            interaction.message.guild.members.cache.get(user.id).roles.add(gamer_role) 
        } 
        catch(error) {
            interaction.component.setStyle("DANGER");
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


client.DisTube.on("searchNoResult", (message, query) => message.channel.send(`No result found for ${query}!`)); 
client.DisTube.on("playSong", (queue, song) => {

    queue.textChannel.send(`🎶 Now playing **${song.name}** / ${song.formattedDuration} / requested by ${song.user}`);
});



client.DisTube.on("error", (error, channel) => {
    console.log(error);
    if (channel)
        channel.send(`My songbirds are having trouble for some reason... I need to go back to my cottage for a minute`); 
    
 
});


client.login(process.env.DISCORD_TOKEN);
     

async function voice(message, args)
{
        
     message.channel.send(await ai(args))
        
}

 
 async function save_data(values, file) 
 {
 	
 	var json = JSON.stringify(values); 
 	
 	 fs.writeFile(file, values.toString(), function (err, result) {
        
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




async function create_reaction_roles()
{
    const example_yellow_cucumber_role = '13121412312312';

    const channel = await client.channels.fetch(roles_channel);


   

    let embed = new Discord.MessageEmbed()
        .setColor()
        .setTitle(`Hello, my name is Fluttershy... Eli (Elly) is asking me to help with roles!`)
        .setDescription('giving yourself a role here will allow me to write them down, and send my critters over to ping you')
        .addField(`Gamer ${gamer_emoji}`, "The Gamer Roll. I'll ping you whenever the Broners are about to do something fun in a videogame")
        .addField(`Broners React ${bronerreacts_emoji}`, "I'll ping you for watch parties, and New G5 stuff!")
        .addField(`Lunist ${luna_emoji}`, "praise the moon! you are a proud supporter of the night guard")
        .addField(`Solist ${celestia_emoji}`, "praise the sun! you are a summer sunshine enjoyer")
        .addField(`The Hive ${hive_emoji}`, "Buzzzzzzz")
        .addField(`Derpist ${Derpist_emoji}`, `I just don't know what went wrong"`)
        .addField(`I am A **MINOR** ${minor_emoji}`, "saftey first")
        .addField(`Discordian ${discordian_emoji}`, `"But it's RAINING CHOCOLATE"`)



    //The process of sending the message to the channel needs to be an asyncro process, because it will 
    //take the client and server some time to process the reacion of the end user. 

    let messageembed = await channel.send(embed)
        .then((sentMessage) => {
            
                channel.messages
                    .fetch(sentMessage.id)
                    .then((fetchedMessage) => {
                        console.log('Message exists');

                        fetchedMessage.react(gamer_emoji)
                        fetchedMessage.react(gamer_emoji);
                        fetchedMessage.react(gamer_emoji);
                        fetchedMessage.react(luna_emoji);
                        fetchedMessage.react(celestia_emoji);
                        fetchedMessage.react(hive_emoji);
                        fetchedMessage.react(Derpist_emoji);
                        fetchedMessage.react(minor_emoji);
                        fetchedMessage.react(discordian_emoji);

                            
                    })
                    .catch((err) => {
                        if (err.httpStatus === 404) {
                            console.log('Message already deleted');
                        } else {
                            console.log(err);
                        }
                    });
            
        });

    

  


}

client.on("guildMemberSpeaking", function (member, speaking) {
    console.log(`a guild member starts/stops speaking: ${member.tag}`);
});




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
      console.log(data);
      // DEBUG  console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {


        // console.error(error);
        console.log('error loading one or more slash commands');
        console.log(error.rawError);
    }


}





