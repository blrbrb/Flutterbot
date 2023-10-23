const { Events, ChannelType } = require('discord.js');
const { prefix} = require('../config/config.json');
const {socialHelp} = require('../lang/en.js');
const { SimpleDatabase } = require('../utils/SimpleDatabase');


module.exports = {
    name: Events.MessageCreate,
    once: false,
    async execute(Flutterbot, message) { 
       try{
       if(message.author.bot) return; 
       try
       {
         Flutterbot.Evaluator.onMessage(message);
       }
       catch(error)
       {
        Flutterbot.Log('Red Bold', `${error}`);
       let c = new expHandler
        return;
       }
       if(Flutterbot.collectors.get(message.author.id))
       {
           const instance = Flutterbot.collectors.get(message.author.id); 
           return socialHelp.handleUserInput(instance);
       }
       else if (message.content.startsWith(prefix))
       {
        
        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift(); 
        try{
         return Flutterbot.PrefixCommands.get(command)?.execute(Flutterbot, message, args);
        }
        catch(fsError)
        {
          message.channel.send(`${fsError.name}: ${fsError.message} | ${fsError.origin()}`)
        }
       } 
       else{
        try
        { 
        Flutterbot.ExpHandler.update(message);
        }
        catch(error)
        {
          Flutterbot.Log('Red Bold', `${error}`);
          return;
        }
         return; 
       
       }
    }
    catch(fsError)
    {
      Flutterbot.Log('Red',`${fsError.name}: ${fsError.message}`);
      Flutterbot.Log(`${fsError.origin()}`);
    }
  }
 
};