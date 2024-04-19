const { Events } = require('discord.js');
const { prefix} = require('../config/config.json');
const {socialHelp} = require('../lang/en.js');


module.exports = {
    name: Events.MessageCreate,
    once: false,
    async execute(Flutterbot, message) { 
    
       if(message.author.bot) return; 
       
       else if (message.content.startsWith(prefix))
       {
        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift(); 
        
         return Flutterbot.prefixcommands.get(command)?.execute(Flutterbot, message, args);
        
       } 
       else{ ///messages that are not commands, part of a collection, or from a bot. 
        Flutterbot.exp.update(message);
         return; 
       
       }
    }
};