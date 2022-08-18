
const Discord = require('discord.js')
const MessageEmbed  = require('discord.js');
const ytdl = require("ytdl-core"); 
const scan = require('./utils/findimage.js');
const cheerio = require('cheerio');
const request = require('request');

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION" ]});
const cooldowns = new Map(); 
require('dotenv').config();



const prefix1 = "-"; 

const fs = require('fs');
let debug = false; 


client.commands = new Discord.Collection(); 
client.imgcommands = new Discord.Collection();  
client.aliases = new Discord.Collection(); 
 


//init command source (stored in seperate js modules)
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
const imageFiles = fs.readdirSync('./commands/image/').filter(file => file.endsWith('.js')); 

 




 


//Global Variables 
let lang = require(`./lang/en.js`);
const { anagrams } = require('./commands/anagramgame.js');
const roles_channel = '1006737480550207508';
const anagram_channel = '1009199104812929155';
const gamer_emoji = '🎮';
const bronerreacts_emoji = '📺';
const discordian_emoji = '🟨';
const minor_emoji = '🔞';
const luna_emoji = '🌙';
const celestia_emoji = '☀️';
const Derpist_emoji = '🧁';
const hive_emoji = '🐞';



var a =0; 
var b = 0;
var c = 0;

//init commands before the client is online 
init_commands(); 




//main events 
client.once('ready', () => {
	
   
		
	
	});
client.on('ready', () => {

    console.log('Fluttershy is Awake Yay! :3');
    //scan the roles channel for new role assignments constantly.
    
   
});  

client.on('guildMemberAdd', guildMember => {let welcomeRole = guildMember.guild.roles.cache.find(role => role.name ==='new broner')

guildMember.roles.add(welcomeRole); 
guildMember.guild.channels.cache.get('960713019753644035').send(` <@${guildMember.user.id}> HI NEW FRIEND!!`); 

}); 


client.on('guildCreate', (guild) => {
	console.log(`Client joined guild ${guild.name} with ID ${guild.id}`);
	createGuild(guild, true);
});

client.on('message', async message => {

        //message.channel.send("Container Scan has tested true for executable bytes");
        //message.channel.send("SomePony has sent a potentially dangerous attachment. Do not click on it, even if it looks like an image at first");
        //message.channel.send("")
      

    

 

 //save_data(pcounter, "assets/counter.txt"); 	
 
	
	
  

    let args = message.content.slice(prefix1.length).trim().split(/ +/g);


    

    const command = args.shift();
  

   
  
if(!message.content.startsWith(prefix1) || message.author.bot) return; 

    
if(command == 'rip')
{
   message.channel.send('Oh no!, it looks like someone died'); 

   client.commands.get('rip').run(client, message, args);
}
    
if(command == 'uwu')
{
    message.channel.send(' I am fluttershy and Owo Uwu');
}
    
    
if(command == 'role')
{
    if (!message.member.hasPermission("MANAGE_ROLES"))
       return message.channel.send("Insufficient permissions")
    const member = message.mentions.members.first()
    if (!member)
       return message.channel.send("No user mentioned")
    const add = args.slice(1).join(" ");
    console.log(add);
    if (!add)
       return message.channel.send("No role said")
    //const roleAdd = message.guild.roles.cache.find(role => role.name === add);
    const roleAdd = message.guild.roles.cache.find(role => role.name === add);
    if (!roleAdd)
       return message.channel.send("Role does not exist")
    if (member.roles.cache.has(roleAdd.id)) {
       return message.channel.send("User already has role")
    }
    if (member) {
      member.roles.add(roleAdd).catch((error) => {
          console.log(error);
         message.channel.send("I cant add...")
       }).then((member) => {
           message.channel.send(`:thumbsup: ${roleAdd} added to ${message.author}`)
          
       })
    }

        
}



   
 if (command == 'reactionRole_HardReset')
 {
     let allowedRole = message.guild.roles.cache.find(role => role.name === "FlutterProgrammer");
     if (message.member.hasPermission("ADMIN") || message.member.roles.cache.has(allowedRole.id))
     {
         create_reaction_roles(); 
     }
}


if (command == 'angel')
{
    message.channel.send('angel bunny');
    message.channel.send
}


 if (command == 'lesson')
 {
     client.commands.get('lesson').execute(client, message, args); 

 }

	
    if (command == 'tweet')
    {
        client.commands.get('tweet').run(client, message, args); 
        
        
    }

if(command == 'play' || command == 'skip' || command == 'queue' || command == 'save')
{
         
 client.commands.get('play').execute(message,args,command,client,Discord, debug);

}

    
if(command == 'img')
{
    if (message.author.id == '582097357768753168') { 
    	
    	var bannedwords = await get_banned_words(); 
    	let x = false; 
		
		for(i = 0; i < bannedwords.length; i++) 
		{
			if(message.content.includes(bannedwords[i]))
			{
				//message.channel.send('https://i.kym-cdn.com/photos/images/original/000/598/304/bca.gif');
				x = true;  
			}
			
		}
		
		if(x == true) 
		{
			message.channel.send('https://i.kym-cdn.com/photos/images/original/000/598/304/bca.gif');
			
			}
			
		else {
		client.commands.get('img').execute(client, message, args); }
			
       

       
    }
    else
     client.commands.get('img').execute(client, message, args);

}





///Begin Image Commands 
 if (command == 'circle')
 {
     client.imgcommands.get('circle').run(client, message, args); 
 }


if(command == 'deepfry') 
{
	
await client.imgcommands.get('deepfry').run(client,message,args); 	
	
}


 if (command == 'morejpeg')
 {
   
  await client.imgcommands.get('jpeg').run(client,message, args); 

 }
 
 if (command == 'destroy')
 {
   
   await client.imgcommands.get('destroy').execute(client,message,args);

 }

if (command == 'mosaic')
{
 //await client.imgcommands.get('mosaic').run(client, message, args, debug); 
}

if (command == 'swirl')
{
await client.imgcommands.get('swirl').run(client, message, args);
}

if(command == 'paint') 
{
await client.imgcommands.get('paint').run(client, message, args);		
} 

if(command == 'text')
{
await client.imgcommands.get('text').run(client, message, args); 	
	
}


if(command == 'Fluttershy' || command == 'fluttershy' || command == 'fs') 
{
    if (!cooldowns.has(command.name))
    {
        cooldowns.set(command.name, new Discord.Collection());
    }
    const current_time = Date.now();
    const time_stamps = cooldowns.get(command.name);
    const cooldown_time = (command.cooldown) * 1000;

    if (time_stamps.get(message.author.id)) {
        const expiration_time = time_stamps.get(message.author.id) + cooldown_time;
        if (current_time < expiration_time)
        {
            const time_left = (expiration_time - current_time) / 1000;
            return message.reply(`I need about ${time_left.toFixed(1)} second(s), okay ;3`);

        }
    }

    time_stamps.set(message.author.id, current_time); 

    
    client.commands.get('Fluttershy').run(client, message, command, args); 
}

 

if(command == 'ifunny') 
{
    client.commands.get('ifunny').execute(message, args, debug); 
} 


if(command == 'fart') 
{
	message.channel.send('poo poo among us sus'); 
	
}


if(command == 'quote')
{
   client.commands.get('quote').execute(client,message,args, debug); 
}

if (command == 'rules' && (message.member.hasPermission("ADMINISTRATOR") == true)) 
{
    client.commands.get('rules').execute(message, args, Discord);
}
    
    
if(command === 'ping') {

	client.commands.get('ping').execute(message,args);
 }
 
   
 

 if (command == 'rate')
{
	
	
  client.commands.get('rate').execute(message, args, client); 
} 





if (command == 'boop') 
{
 client.commands.get('boop').run(client, message, command, args, prefix1); 


} 

if(command == 'avatar') 
{
 client.commands.get('avatar').run(client, message, command, args,lang); 
  

}



if(command == 'terminal')
{
	client.commands.get('terminal').run(client, message, args); 	
}





if (command == 'help') 
{
  let args = message.content.slice('help').trim().split(/ +/g);
   client.commands.get('help').execute(client, message, command, args, prefix1, lang, commandFiles); 
}






if(command == 'debug')
{
	let allowedRole = message.guild.roles.cache.find(role=> role.name === "FlutterProgrammer");
	
	if(message.member.roles.cache.has(allowedRole.id) || message.author.id == '252235505318625281')
	{
		
			if(debug == true) 
				message.channel.send('debug output disabled');
			else 
				 message.channel.send('debugging mode enabled on Fluttershy Build:' + ' ' + process.env.VERSION);  
				 debug = true;
				 return; //dangerous

	}
}


   

    if (message.channel.id == '1009199104812929155')
    {
        console.log('working');

        const anagramgame = client.commands.get('anagramgame').anagrams(command, args[0]); 

        if (anagramgame.anagrams(command, args[0])) {
            message.channel.send('this is a valid anagram!');
        }
        else
            message.channel.send('this is not a valid anagram');
    }
 });   

client.login(process.env.DISCORD_TOKEN);
     

async function voice(message, args)
{
        
     message.channel.send(await ai(args))
        
}



    //const messageList = the_channel.messages.sort(function (a, b) { 
   //     return b.createdTimestamp - a.createdTimestamp;
   // })   




 
 
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

 	


client.fileCheck = (image) => {
    return new Promise((resolve, reject) => {
        request.get(image, (error, response, body) => {

            
            if (error) throw new Error(error);

         
          //  console.log(response); 
            response.on('data', () => {
                const chunk = response.read(imageType.minimumBytes);
                response.destroy();
                console.log(imageTye(chunk));

                if (imageType(chunk) && ["image/jpeg", "image/png", "image/webp", "image/jpg"].includes(imageType.mime)) {
                    resolve(image);
                } else {
                    reject("Attachment not found");
                }
                //=> {ext: 'gif', mime: 'image/gif'}
            });
           

          
            //const buff = Buffer.from(body, "utf-8");
           // console.log(body.toString()); 
          //  const imageTypeResult = imageType(buff);
           // console.log(imageTypeResult);
          ///  message.channel.send(imageTypeResult);
           
        });
    });
};




async function init_commands() 
{
	
	for(const file of commandFiles) {
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
	
	
	
	for(const file of imageFiles) {
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
	
}



//client debugging events 
client.on("reconnecting", function(){
    console.log(`FlutterShy Is Attempting to Reconnect to the Websocket`);
});


client.on("guildUnavailable", function(guild){
	console.log('Fluttershy Cannont Connect to Discord'); 
    console.error('Unable to connect to discord. Discord is likley offline or not working right now');
});


client.on("error", function(error){
	console.log('My Websocket has encountered an error :('); 
    console.error(`client's WebSocket encountered a connection error: ${error}`);
})

client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot)
        return;
    if (!reaction.message.guild)
        return;



    const channel = await client.channels.fetch(roles_channel);


   
    const gamer_role = channel.guild.roles.cache.find(role => role.name === 'Gamer');
    const bronerreacts_role = channel.guild.roles.cache.find(role => role.name === `Broner's React`);
    const luna_role = channel.guild.roles.cache.find(role => role.name === 'New Lunar Republic');
    const celestia_role = channel.guild.roles.cache.find(role => role.name === 'Solar Empire');
    const minor_role = channel.guild.roles.cache.find(role => role.name === 'Minor')
    const discordian_role = channel.guild.roles.cache.find(role => role.name === 'Discordian');
    const derpist_role = channel.guild.roles.cache.find(role => role.name === 'Derpist');
    const hive_role = channel.guild.roles.cache.find(role => role.name === 'The hive');

    //console.log(gamer_role); 




 
    
   

    if (reaction.message.channel.id == roles_channel) {
        //These next if statements are the if statements that will check wether or not the corresponding emoji's for each role have been reacted with
        //TD: potential make this a switch/case statement for efficency? 

        if (reaction.emoji.name === gamer_emoji) {

            
            await reaction.message.guild.members.cache.get(user.id).roles.add(gamer_role);

        }
        if (reaction.emoji.name === bronerreacts_emoji) {

            await reaction.message.guild.members.cache.get(user.id).roles.add(bronerreacts_role);

        }
        if (reaction.emoji.name === luna_emoji) {

            await reaction.message.guild.members.cache.get(user.id).roles.add(luna_role);

        }
        if (reaction.emoji.name === celestia_emoji) {

            await reaction.message.guild.members.cache.get(user.id).roles.add(celestia_role);

        }
        if (reaction.emoji.name === hive_emoji) {

            await reaction.message.guild.members.cache.get(user.id).roles.add(hive_role);

        }
        if (reaction.emoji.name === Derpist_emoji) {

            await reaction.message.guild.members.cache.get(user.id).roles.add(derpist_role);

        }
        if (reaction.emoji.name === minor_emoji) {

            await reaction.message.guild.members.cache.get(user.id).roles.add(minor_role);

        }
        if (reaction.emoji.name === discordian_emoji) {

            await reaction.message.guild.members.cache.get(user.id).roles.add(discordian_role);

        }




    }
    else {
        return;
    }
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

