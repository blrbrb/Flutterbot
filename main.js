
const Discord = require('discord.js')
const MessageEmbed  = require('discord.js');
//const Discord = require('Discord.js');
const ytdl = require("ytdl-core"); 




var servers = {};
//var debug = false;

const client = new Discord.Client();

require('dotenv').config();

//client.player = player;

const prefix1 = "-"; 

const fs = require('fs');

client.commands = new Discord.Collection(); 
client.aliases = new Discord.Collection()
 
const cheerio = require('cheerio');  
const request = require('request');  

//init command source (stored in seperate js modules)
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
 for(const file of commandFiles) {
	const command = require(`./commands/${file}`);  
	client.commands.set(command.name, command);    
	
	if (command.aliases) {
    command.aliases.forEach(alias => {
        client.aliases.set(alias, command) 
        
    });


	
	
	}
	//console.log(client.aliases); 
}

//init music player queue

//const queue = new Map();
 


//Global Variables 
let lang = require(`./lang/en.js`);
var a =0; 
var b = 0;
var c = 0;
//main events 
client.on('ready', () => {
console.log('Fluttershy is Awake Yay! :3');

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

    let word_said = false;
    let words = await get_nonowords("assets/nono.json");
    for (i in words) {
       console.log(words[i]);

        if (message.content.toLowerCase().includes(words[i].toLowerCase())) {

            console.log("word said");
            word_said = true; 
         //please god, I'm sorry 

        }

      


    }

    if (word_said) {
        message.channel.send("YOU SAID THE WORD!!!");
        //message.channel.
    }



    let args = message.content.slice(prefix1.length).trim().split(/ +/g);


    as

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
         
 client.commands.get('play').execute(message,args,command,client,Discord, false);

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
    

if (command == 'fluttershy')
{
     client.commands.get('fluttershy').execute(message, args, command, Discord);
    
}
    
    
if(command == 'ifunny') 
{
    client.commands.get('ifunny').execute(message, args); 
}



  if (command == 'randompony')
 {
      client.commands.get('randompony').execute(message, args); 

 }
    
    

if(command == 'quote')
{
        
   /// quote(message, args);

   client.commands.get('quote').execute(client,message,args); 
        
}

if (command == 'rules' && (message.member.hasPermission("ADMINISTRATOR") == true)) 
{

    client.commands.get('rules').execute(message, args, Discord);
    //TD figure out how to do this 
}
    
    
if(command === 'ping') {

	client.commands.get('ping').execute(message,args);
 }
 
   
 

 if (command == 'rate')
{
  client.commands.get('rate').execute(message, args, client); 
} 

 if (command == 'paintingnamer')
{
  client.commands.get('paintingnamer').execute(message, args);

} 


if (command == 'library')
{
//client.commands.get('library').execute(message,args, Discord);

}




if (command == 'boop') 
{
 client.commands.get('boop').run(client, message, command, args, prefix1); 


} 

if(command == 'avatar') 
{
 client.commands.get('avatar').run(client, message, command, args,lang); 
  

}

if(command == 'emoji') 
{
	
	//client.commands.get('emoji').run(client, message, command, args, prefix1, lang); 
	
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


if(command == 'filter') 
{
	
	filterwords(); 
	
	
}

    
 });   

client.login(process.env.DISCORD_TOKEN);
     
async function get_banned_words() 
{
	
      let rawdata = fs.readFileSync('assets/filterwords.json'); 	
	var banned_words = JSON.parse(rawdata); 
	//console.log(banned_words); 
	
	
	return banned_words; 
}



async function get_nonowords(nonofile)
{

    let rawdata = fs.readFileSync(nonofile);

    var nonowords = JSON.parse(rawdata);

   // console.log(nonowords);


    return nonowords; 


}



async function voice(message, args)
{
        
     message.channel.send(await ai(args))
        
}


