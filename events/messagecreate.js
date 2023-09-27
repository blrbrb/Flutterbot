const { Events } = require('discord.js');
const { prefix} = require('../config/config.json');
const {socialHelp} = require('../lang/en.js');
const {updateexp} = require('../utils/exp.js');

module.exports = {
    name: Events.MessageCreate,
    once: false,
    async execute(Flutterbot, message) { 
       if(message.author.bot) return; 
       
       if(Flutterbot.collectors.get(message.author.id))
       {
           const instance = Flutterbot.collectors.get(message.author.id); 
    
            return socialHelp.handleUserInput(instance);
            
       }
       else if (message.content.startsWith(prefix))
       {
        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift(); 
        
         return Flutterbot.prefixcommands.get(command)?.execute(Flutterbot, message, args);
        
       } 
       else{ ///messages that are not commands, part of a collection, or from a bot. 
         updateexp(message, Flutterbot);
         return; 
       
       }
    }
};