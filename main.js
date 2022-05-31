
const Discord = require('discord.js')
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
 
const cheerio = require('cheerio');  
const request = require('request');  

//init command source (stored in seperate js modules)
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
 for(const file of commandFiles) {
	const command = require(`./commands/${file}`); 

	client.commands.set(command.name, command); 
}

//init music player queue
//const serverQueue = queue.get(message.guild.id);
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

client.on('guildMemberAdd', guildMember => {let welcomeRole = guildMember.guild.roles.cache.find(role => role.name ==='new role')

guildMember.roles.add(welcomeRole); 
guildMember.guild.channels.cache.get('960713019753644035').send(` <@${guildMember.user.id}> 'HI NEW FRIEND'`); 

});

client.on('message',message => {

    //let args = message.content.substring(prefix1.length).split(" ");
      let args = message.content.slice(prefix1.length).trim().split(/ +/g); 
    
    
    //var command = message.content.contents
    const command = args.shift().toLowerCase();
    
    
    




 
	 
	 
 if(message.content.includes('sus') && !message.author.bot) 
 { 
    b++;
     var readout = ' ';
	//message.channel.send('sus amogus counter:' + b );
     
     fs.readFile("\SUS_COUNTER.json","utf8", function(err, data) {
     if(err)
     {
        console.log(err);
     }
         readout = data;
         console.log(readout);
    if(readout < 1)
    {
        fs.writeFile("\SUS_COUNTER.json", b.toString(), (err) =>
        {
         if (err)
             console.log(err);
         else {
             
              console.log("File Written Saving Counter...");
         }
            
        });
    }
         
     })
        
     

	 }
	 

    
  

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
    
    

	
    if (command == 'tweet')
    {
        client.commands.get('tweet').run(client, message, args); 
        
        
    }

if(command == 'play' || command == 'skip')
{
        
client.commands.get('play').execute(message,args,command,client,Discord, false);
    
}
    
if(command == 'image')
{

     //client.commands.get('image').execute(client, message, args, debug);

    message.channel.send('I need a better filter...sorry');
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
        
    quote(message, args);

   
        
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
 //client.commands.get('avatar').run(client, message, command, args,lang); 
  

}

if(command == 'emoji') 
{
	
	client.commands.get('emoji').run(client, message, command, args, prefix1, lang); 
	
}




    //help command section 
   if (command == 'help')
    {
    	let args = message.content.slice('help').trim().split(/ +/g);
        switch (args[1])
         {
            case 'commands':
               	const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js')); 
               	
               	commandFiles.slice(0, -4);
	
	             message.channel.send(commandFiles); 

                break; 
                

            case 'about':
                message.channel.send('Hello! :3 I am a free open source discordbot made with love by <@252235505318625281> documentation for me can be found here,' + ' ' + process.env.GIT);
                break; 
                

            case 'info':
                message.channel.send(process.env.VERSION);
                break;

            default: message.channel.send("Enter 'help' followed by either commands, about, or info");
                

            //TD 
            //insert webhook/ handling stuff here. 
            //add patreon in future deployments? 
            //Make fluttershy do something easter-eggy and releated to the show idk, discord joke? 

            

        }

      }



    
 });   

client.login(process.env.DISCORD_TOKEN);
     







function quote(message, args)
{
    var options = {
            url: "https://inspirobot.me/api?generate=true",
            method: "GET",
            headers: { "Accept" : "text/html",
                   "User-Agent": "Chrome" }
    };
    
  
   
    
    request(options, function(error,response,responseBody) {

            if(error) { console.log('Im yellow shy, and Eli is a useless, incapable human being'); return;}

            $ = cheerio.load(responseBody);
    
        //var el = $().click();
        //document.getElementById("").click();
       
           // el.click();
        
        //".done-img-wrap-wrap done-img-wrap"
     

            var url = $('body').text();
          // var url2 = url.querySelector('#done-img');
           // var urls = url.attr("src");
       // var urls = new Array(url.length).fill(0).map((v,i) => url.eq(i).attr("src"));
        //var urls = url.attr('src');

        //message.channel.send(links[1]);
        
        
        
    console.log(url);
    //console.log(urls);
    //if (!urls) {
     //   message.channel.send('invalid array allocation: urls.length < 0');
        //message.channel.send(urls);
        
           

        
      
        
    //return;
   // }

        
    //filter through array, send resulting random image
   // else {
        //message.channel.send("");
        //urls.shift();
        message.channel.send(url);
       // return;
   // }


    });

}







function printcommands() 
{
	
	
 //for(const file of commandFiles) 
	//const command = require(`./commands/${file}`); 
	
// var cnames = commandFiles.slice('.js); 

	//client.commands.set(command.name, command); 
}

	
	











async function voice(message, args)
{
        
     message.channel.send(await ai(args))
        
}


