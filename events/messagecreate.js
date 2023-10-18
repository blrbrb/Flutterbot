const { Events, ChannelType } = require('discord.js');
const { prefix} = require('../config/config.json');
const {socialHelp} = require('../lang/en.js');
const { SimpleDatabase } = require('../utils/SimpleDatabase');


module.exports = {
    name: Events.MessageCreate,
    once: false,
    async execute(Flutterbot, message) { 
       
       if(message.author.bot) return; 
       
       Flutterbot.Evaluator.onMessage(message);
       
       if(Flutterbot.collectors.get(message.author.id))
       {
           const instance = Flutterbot.collectors.get(message.author.id); 
    
            return socialHelp.handleUserInput(instance);
            
       }
       else if (message.content.startsWith(prefix))
       {
        if(command === 'qtest')
        {
          Flutterbot.Evaluator.quarantine(message.author);
        }
        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift(); 
         return Flutterbot.PrefixCommands.get(command)?.execute(Flutterbot, message, args);
        
       } 
       else{ ///messages that are not commands, part of a collection, or from a bot. 
        Flutterbot.Exp.update(message);
         return; 
       
       }
    }
};