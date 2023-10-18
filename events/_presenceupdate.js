const {Events} = require('discord.js'); 
const {expOnReact} = require('../utils/exp.js');

module.exports = {
    name: Events.PresenceUpdate, 
    once:false,
    async execute(Flutterbot, oldPresence, newPresence)
    {
       
        const user = await Flutterbot.users.fetch(newPresence.userId); 
        
        if(user.bot)
            return;  
        
        const activity = newPresence.activities[0]; 
      
        if(activity){
        switch(activity.name)
        {
            case 'Spotify': 
                //idk do fun stuff here i guess.
                break;
            default: 
             
            break;

        }}
        else 
         return;
        //expOnReact(reaction, user, Flutterbot);
    }
}