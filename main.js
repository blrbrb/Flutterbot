
const Discord = require('discord.js')
//const Discord = require('Discord.js');

const ai = require("fifteenai");

const ytdl = require("ytdl-core");


var servers = {};
var debug = false;

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

client.on('guildMemberAdd', guildMember => {let welcomeRole = guildMember.guild.roles.cache.find(role => role.name ==='Fellow Comrade')

guildMember.roles.add(welcomeRole); 
guildMember.guild.channels.cache.get('819080587310006283').send(`Welcome <@${guildMember.user.id}> to off-brand Antifa!, Please read through our breif rules channel :)`); 

});

client.on('message',message => {

    let args = message.content.substring(prefix1.length).split(" ");
   
    
    
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
    
    
if(command == 'meme')
{
        client.commands.get('meme').run(client, message, args);
}
	
    if (command == 'tweet')
    {
        client.commands.get('tweet').run(client, message, args); 
        
        
    }
if(command == 'hitler')
{
        client.commands.get('hitler').run(client, message, args);
        
}

if(command == 'play' || command == 'skip')
{
        
client.commands.get('play').execute(message,args,command,client,Discord, debug);
    
}
    
if(command == 'image')
{

     //client.commands.get('image').execute(client, message, args, debug);

    message.channel.send('I need a better filter...sorry');
}
    
if(command == 'debug_mode_(on)')
{
        
    debug = true;
    message.channel.send('debug Toggeled');
    message.channel.send('ON using API validation Key:695774282508271616 ');
  
}
    
if (command == 'fluttershy')
{
     client.commands.get('fluttershy').execute(message, args, command, Discord);
    
}
    
    
if(command == 'ifunny') 
{
    client.commands.get('ifunny').execute(message, args); 
}

if(command == 'reaction') 
{ 
reaction(message, args); 
}
    
    
if(command == 'poopyimage')
{
    NeuralMeme(message, args);
}
    
if(command == 'quote')
{
        
    quote(message, args);
        
}
    
if(command == 'rules')
{
  client.commands.get('rules').execute(message, args, Discord);
}
    
    
if( command == 'booru')
{
    client.commands.get('booru').run(client,message,command,args, prefix1, 1);
        
}
    

if (command == 'twi')
{
    client.commands.get('twi').execute(message,args, command, Discord)
    
}
		 
if (command == 'tourettes')
{
        
     tourettes(message, args);
        
}
  
    
if (command == 'ai')
{
    
    
    //message.channel.send(ai(args));
    voice(message, args)
}
 


if(command === 'ping') {

	client.commands.get('ping').execute(message,args);
 }
 
if(command == 'fart')
 {
   client.commands.get('fart').execute(message,args);	

 }   

if(command == 'conservative')
{
        client.commands.get('conservative').execute(message,args);
        
}
    

 if(command == 'reddit')
{ 
  let args = message.content.substring(prefix1.length).split(' ');
   //client.commands.get('reddit').execute(message,args);    
   
   reddit(message, args);
} 

  if (command == 'darren')
{  

message.channel.send('based e-thot, join');
var pings = 5; 

 	for (i = 0; i < pings; i++) { 
 	 message.channel.send('@Kortalion'); 
 	
 	}
 	
 	 
}
    
    if (command == 'derrek')
  {

 // var pings = 10000;
//for (i = 0; i < pings; i++) {

  //      message.channel.send('@nickromney');
       
    }
 
       
 if (command == 'reverb')
{ 
client.commands.get('reverb').execute(message,args,Discord);	


} 

 if (command == 'ross')
{
	client.commands.get('ross').execute(message, args); 

}  


 if (command == 'rate')
{
  client.commands.get('rate').execute(message, args); 
} 

 if (command == 'paintingnamer')
{
  client.commands.get('paintingnamer').execute(message, args);

} 

if (command == 'hello')
{
 message.channel.send('I am friend. I am programmed to protect humanity'); 

}  

if (command == 'library')
{
client.commands.get('library').execute(message,args, Discord);

}

if (command == 'clop')
{
  
//client.commands.get('clop').run(client, message, command, args, prefix1, 1);
        
}

 if (command == 'bomba')
{
message.channel.send('!play Diarrhea sounds 10 hours'); 
							
}


if (command == 'rythm')
{
let args = message.content.substring(prefix1.length).split(' ');

message.channel.send('Now asking Comrade Rythm to play:' + ' ' + args[1]+ ' ' + args[2] +'...');

rythm(args);
} 


if (command == 'boop') 
{
 client.commands.get('boop').run(client, message, command, args, prefix1); 


} 

if(command == 'avatar') 
{
 //client.commands.get('avatar').run(client, message, command, args,lang); 


}

 if (command == 'e621')
{

message.channel.send('https://e621.net/posts/random'); 

}

 


});   

client.login(process.env.DISCORD_TOKEN);
     




function NeuralMeme(message, args)
{
    var options = {
            url: "https://imgflip.com/ai-meme",
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
     

            var url = $(".mm-canv").toDataUrl();
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
        //message.channel.send(url);
       // return;
   // }


    });

}


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





//generate and send a random gif based on args supplied to the bot 
 function ifunny(message, args1) {

	// console.log('working');
var options = { 
		url: "https://ifunny.co/other",
		method: "GET",
		headers: { "Accept" : "text/html", 
			   "User-Agent": "Chrome" }    
}; 


request(options, function(error,response,responseBody) {

		if(error) { console.log('Im yellow shy, and Eli is a useless, incapable human being'); return;}

		$ = cheerio.load(responseBody); 
//_26gD._3_Go._3brC.
		var links = $(".l5Cl img");
    
      
   // document.querySelector("#App > div._2Uj_ > div._2kNu > div > div._26gD._3_Go > div:nth-child(1) > div > div.l5Cl > img")

		var urls = new Array(links.length).fill(0).map((v,i) => links.eq(i).attr("data-src"));

    //message.channel.send(links[1]);
    
    
    
console.log(urls);
if (!urls.length) {
	message.channel.send('invalid array allocation: urls.length < 0');
    //message.channel.send(urls[1]);
    
       

    
	console.log('you fucked it up, objectvie B kill all humans');
    
return;
}  

    
//filter through array, send resulting random image
else {
    message.channel.send("p-please don't make me look through ifunny");
    urls.shift();
    message.channel.send(urls[1]);
    return;
}


});

}


 function reaction(message, args1) {

	// console.log('working');
var options = { 
		url: "http://reactionimage.org/random.html",
		method: "GET",
		headers: { "Accept" : "text/html", 
			   "User-Agent": "Chrome" }    
}; 


request(options, function(error,response,responseBody) {

		if(error) { console.log('Im yellow shy, and Eli is a useless, incapable human being'); return;}

		$ = cheerio.load(responseBody); 
//_26gD._3_Go._3brC.
		var links = $(".single-image img"); 
		//links.unshift("http://reactionimage.org");
    
                 var prestring = "http://reactionimage.org";
 

		var urls = new Array(links.length).fill(0).map((v,i) => prestring + links.eq(i).attr("src")); 

    
    //message.channel.send(flinks[1]);
    
    
    
//console.log(links); 
console.log(urls);
if (!urls.length) {  






urls.trim();
	message.channel.send('invalid array allocation: urls.length < 0');
    //message.channel.send(file: urls[1]);
    
       

    
	console.log('you fucked it up, objectvie B kill all humans');
    
return;
}  

    
//filter through array, send resulting random image
else { 

var sstring = urls.toString();   

ssstring = sstring.substr(0, 53);

console.log(ssstring);
const embed = new Discord.MessageEmbed().setURL(ssstring).setDescription('Generating reaction..')
  .setImage(ssstring) 


    message.channel.send(ssstring);
    return;
}


});

}




function rythm(args) {

   message.channel.cache.get('695774282508271616').send('!play' + searchterm);


}







async function voice(message, args)
{
        
     message.channel.send(await ai(args))
        
}


