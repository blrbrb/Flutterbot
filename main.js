
const Discord = require('discord.js')
const MessageEmbed  = require('discord.js');
//const Discord = require('Discord.js');
const ytdl = require("ytdl-core"); 
const scan = require('./utils/findimage.js');
let pcounter = 1;
var pdata = {c}
var servers = {};
//var debug = false;

const client = new Discord.Client();

require('dotenv').config();

//client.player = player;

const prefix1 = "-"; 

const fs = require('fs');



client.commands = new Discord.Collection(); 
client.imgcommands = new Discord.Collection();  
client.aliases = new Discord.Collection()
 
const cheerio = require('cheerio');  
const request = require('request');  
//init command source (stored in seperate js modules)
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
const imageFiles = fs.readdirSync('./commands/image/').filter(file => file.endsWith('.js')); 

 




 


//Global Variables 
let lang = require(`./lang/en.js`);
var a =0; 
var b = 0;
var c = 0;

//init commands before the client is online 
init_commands(); 
init_imgcommands();



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

        //message.channel.send("Container Scan has tested true for executable bytes");
        //message.channel.send("SomePony has sent a potentially dangerous attachment. Do not click on it, even if it looks like an image at first");
        //message.channel.send("")
      

    

 let cwords = await get_banned_words();
 var word_said = false; 
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
 await client.imgcommands.get('mosaic').run(client, message, args); 
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


if(command == 'wholesome_check' && (message.member.hasPermission("ADMINISTRATOR") == true)) 
{
	
	message.channel.send(`**Our Little Ponies Have said bad words** ${pcounter} **times in this server!**`); 
	
	
	
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



async function voice(message, args)
{
        
     message.channel.send(await ai(args))
        
}



    //const messageList = the_channel.messages.sort(function (a, b) { 
   //     return b.createdTimestamp - a.createdTimestamp;
   // })   



 function profanity_counter(message) 
{
	var bannedwords = get_banned_words(); 
	

	
	
	
	
	
	
	
	
	
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
	
		 //console.log(commandFiles.indexOf(file) / total * 100 + "%");
	
	
	//console.log(total);
	
	//console.log(command);
	process.stdout.clearLine();
	process.stdout.cursorTo(0);
	process.stdout.write("loading commands:" + Math.round((1 + commandFiles.indexOf(file)) / total * 100) + "%");
	
  	//console.log("%s Loading Commands" + 
	client.commands.set(command.name, command);    
	
	if (command.aliases) {
    command.aliases.forEach(alias => {
    client.aliases.set(alias, command) 
       
    });
	
	}	 
	//process.stdout.write("/n");
}

	
	
	
}





async function init_imgcommands() 
{
	
	
	for(const file of imageFiles) {
	const command = require(`./commands/image/${file}`);  
	client.imgcommands.set(command.name, command);  
	const total = commandFiles.length; 
	//process.stdout.clearLine();
	process.stdout.cursorTo(0);
	process.stdout.write("loading Image Commands:" + Math.round(imageFiles.indexOf(file) / total * 100) + "%");   
	
	if (command.aliases) {
    command.aliases.forEach(alias => {
    client.aliases.set(alias, command) 
       
    });
	
	}	 

	
	

	}
	process.stdout.write('\n');
	}
