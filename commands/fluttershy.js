const discord = require('discord.js');
const cleverbot = require('cleverbot-free'); 


module.exports = {
    name: "Fluttershy",
    alias: ["Fluttershy"],
    run: async (client, message, command, args) => {

        let conversation = [];
        let text = message.content; 
        if(text.includes('fluttershy'))
        {
        	//text = text.slice(text.indexOf('-fluttershy')).trim().split(/ +/g).splice(text.indexOf('-fluttershy')); 
        	text = text.substring(text.indexOf("-fluttershy") + 11, text.length);
           // text.slice('fluttershy'); 
     
        	console.log(text); 
        }
		else 
        text = text.substring(text.indexOf(">") + 2, text.length)
        
        cleverbot(text, conversation).then((res) => {

            conversation.push(text);
            conversation.push(res);
            message.channel.send(res); 


        })




    }
}