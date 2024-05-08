const {Events} = require('discord.js'); 
const {expOnReact} = require('../utils/exp.js');

module.exports = {
    name: Events.MessageReactionAdd, 
    once:false,
    async execute(Flutterbot, reaction, user)
    {
      Flutterbot.exp.update(reaction, user); 

    }
}