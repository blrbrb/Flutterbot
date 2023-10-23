const {Events} = require('discord.js'); 
const {expOnReact} = require('../utils/exp.js');

module.exports = {
    name: Events.MessageReactionAdd, 
    once:false,
    async execute(Flutterbot, reaction, user)
    { 
      try{
      if(reaction.hasOwnProperty('message')){
        Flutterbot.ExpHandler.update(reaction,user)}
      else {
        return
           }     // .Exp.update(reaction, user); 
    }
    catch(error)
    {
      Flutterbot.log('Red', error);
    }
  }
}