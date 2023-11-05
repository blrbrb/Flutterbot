const { Events, Collection, ChannelType} = require('discord.js');
const {handledistubeSelection} = require('../commands/slash/play.js');
const {handleSyncRequest} = require('../commands/slash/fmrecent.js')
const fs = require('fs');
const { Shy } = require('../client/Flutterbot.js');

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    async execute(Flutterbot, interaction){ 
      
        let command; 
       
        try{
        if(interaction.channel.type === ChannelType.DM)
            return; 
        if(interaction.isMessageComponent())
        {   
          
          // console.log(Flutterbot.collectors)
            //if this interaction "${interaction.user.id}" is for selecting distube search results
            if(Flutterbot.collectors.has(`distube_results${interaction.user.id}`))
            {   
                response = Flutterbot.collectors.get(`distube_results${interaction.user.id}`); 
                handledistubeSelection(response, Flutterbot, interaction);
            }
            if(Flutterbot.collectors.has(`fmIntegration${interaction.user.id}`))
            {  
                response = Flutterbot.collectors.get(`fmIntegration${interaction.user.id}`); 
                handleSyncRequest(response, Flutterbot, interaction);
            }
            return; 
        }
       
        //if the command is an application command 
        if (interaction.isChatInputCommand()) {
            
			command = Flutterbot.SlashCommands.get(interaction.commandName);
        }
        //handler user context menu commands 
        if (interaction.isUserContextMenuCommand())
        {   
            const { username, id } = interaction.targetUser;
           
            command = Flutterbot.ContextCommands.get(interaction.commandName);
            console.log(`context command name is ${command.name}`);
        }   
           //handler message context menu commands 
        if (interaction.isMessageContextMenuCommand())
        {   
               //const { username, id } = interaction.targetUser;
               //console.log(interaction);
               command = Flutterbot.ContextCommands.get(interaction.commandName);
               
        }   
         
      
        let cooldowns = Flutterbot.GuildCooldowns.get(interaction.guild.id);
        
        if (!cooldowns) {
            cooldowns = new Collection();
            Flutterbot.GuildCooldowns.set(interaction.guild.id, cooldowns);}

        //if the called application command does not already have a cooldown set,  
        //save and apply a default cooldown
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Collection());}
        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown ?? Flutterbot.getDefaultCoolDown(interaction.guild.id)) * 1000;

        ///Usercheck to ensure that cooldown information isn't lost upon a user leaving, and then re-joining a guild 
        if (timestamps.has(interaction.user.id)) {
            const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
    
            if (now < expirationTime) {
                const expiredTimestamp = Math.round(expirationTime / 1000);
                return interaction.reply({ content: `Please wait, you are on a cooldown for \`${command.name}\`. You can use it again <t:${expiredTimestamp}:R>.`, ephemeral: true });
            }
        }
        timestamps.set(interaction.user.id, now);
	    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

        // we should check if a command isnt found but was registered in discord
        command.execute(interaction, Flutterbot); 
    }
    catch(fsError)
    {
    console.log(fsError);
    Flutterbot.Log('Red',`${fsError}`);
    Flutterbot.Log(`${fsError}`);
	  return;
    }
 }

}