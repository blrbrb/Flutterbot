require('dotenv').config();
const { MessageEmbed } = require('discord.js'); 

module.exports = { name: 'help', 
		   description: 'get helpful information', 
		   execute(client, message, command, args, prefix1, lang, commandfiles) {

        switch (args[1])
         {
            case 'commands':
               	//const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js')); 
               	//commandstring = commandfiles; 
               	
               	commandfiles.slice(0, -4);
	
	             message.channel.send(commandfiles); 

                break; 
                

            case 'about':
                message.channel.send(process.env.VERSION);
                message.channel.send('Hello! :3 I am a free open source discordbot made with love by <@252235505318625281> documentation for me can be found here,' + ' ' + process.env.GIT);
                break; 
                

            case 'info':
            		 message.channel.send(process.env.VERSION);
             
                break;
                
            case 'support': 
            
            let embed = new MessageEmbed()
            .setTitle('Buy a Coffee for Flutterbot').setColor(0xfbfb2b).setURL('https://ko-fi.com/flutterbot')
            .setDescription(`Powered by \nKo-fi`).setThumbnail("https://storage.ko-fi.com/cdn/useruploads/852fff3c-a4a2-4cdb-98fa-2a0d97f2dff3.png"); 
            
            	message.channel.send(embed); 
            	
            	break;
            			

            default: message.channel.send("Enter 'help' followed by either 'commands' for useable commands, 'about' for my documentation, or 'support' to help support my creator :)");
                

            //TD 
            //insert webhook/ handling stuff here. 
            //add patreon in future deployments? 
            //Make fluttershy do something easter-eggy and releated to the show idk, discord joke?  
            
         }

            

}      



}
