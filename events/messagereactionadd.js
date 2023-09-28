const {Events} = require('discord.js'); 
const {expOnReact} = require('../utils/exp.js');

module.exports = {
    name: Events.MessageReactionAdd, 
    once:false,
    async execute(Flutterbot, reaction, user)
    {
        console.log('message reaction added');
        console.log(reaction); 
        expOnReact(reaction, user, Flutterbot);
    }
}