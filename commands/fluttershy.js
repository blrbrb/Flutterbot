const discord = require('discord.js');
const cleverbot = require('cleverbot-free'); 


module.exports = {
    name: "Fluttershy",
    alias: ["Fluttershy"],
    run: async (client, message, command, args) => {

        let conversation = [];
        let text = message.content;

        text = text.substring(text.indexOf(">") + 2, text.length)
        
        cleverbot(text, conversation).then((res) => {

            conversation.push(text);
            conversation.push(res);
            message.channel.send(res); 


        })




    }
}