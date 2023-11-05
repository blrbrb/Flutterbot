const { Events, ChannelType, InteractionType, CommandInteraction,APIInteraction, BaseInteraction, ApplicationCommandOptionBase,CommandInteractionOptionResolver
  ,CommandInteractionOption } = require('discord.js');
const { prefix} = require('../config/config.json');
const {socialHelp} = require('../lang/en.js');

const { Flutterbot } = require('../client/Flutterbot');


module.exports = {
    name: Events.MessageCreate,
    once: false,
    /**
     * @param {Flutterbot} Flutterbot
     * @param {Message<true>} message 
     */
    async execute(Flutterbot, message) { 
    
     
       try{
       if(message.author.bot) return; 
       try
       {
         //console.log('running eval');
         Flutterbot.AngelBunny.onMessage(message);
       }
       catch(error)
       {
        Flutterbot.Log('Red Bold', `${error}`);

        return;
       }
       if(Flutterbot.collectors.get(message.author.id))
       {
        message.reply()
           const instance = Flutterbot.collectors.get(message.author.id); 
           return socialHelp.handleUserInput(instance);
         
       }
       else if (message.content.startsWith(prefix))
       {
        let args = message.content.slice(("-").length).trim().split(/ +/g);
        const command = args.shift(); 
        let exec = Flutterbot.PrefixCommands.get(command) ? Flutterbot.PrefixCommands.get(command) :Flutterbot.SlashCommands.get(command); 
        return exec.execute(message, Flutterbot, args);
       } 
       else{
         return; 
       }
    }
    catch(fsError)
    {
      console.log(fsError);
      Flutterbot.Log('Red',`messagecreate.js lin 54: ${fsError} `);
      
    }
  }
 
};