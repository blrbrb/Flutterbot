const { Events, Collection, ChannelType} = require('discord.js');
const {handledistubeSelection} = require('../commands/slash/play.js');

const fs = require('fs');
const { Shy } = require('../client/Flutterbot.js');

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    async execute(Flutterbot, interaction){ 
        try{
        if(interaction.channel.type === ChannelType.DM)
            return; 
        if(interaction.isMessageComponent())
        {
            //if this interaction "${interaction.user.id}" is for selecting distube search results
            if(Flutterbot.collectors.has(`distube_results${interaction.user.id}`))
            { 
                response = Flutterbot.collectors.get(`distube_results${interaction.user.id}`); 
                handledistubeSelection(response, Flutterbot, interaction);
            }
            return; 
        }
        let command; 
        //if the command is an application command 
        if (interaction.isChatInputCommand()) {
           
			command = Flutterbot.SlashCommands.get(interaction.commandName);
        }
        //if the command is a prefix command 
        //this must be else/if, or the command will default equal undefined. That not good
        else{
            command = Flutterbot.commands.get(interaction.commandName);}

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
        Flutterbot.SlashCommands.get(interaction.commandName)?.execute(interaction, Flutterbot); 
        Flutterbot.ExpHandler.update(interaction);
    
       
    }
    catch(fsError)
    {
      
    Flutterbot.Log('Red',`${fsError.name}: ${fsError.message}`);
    Flutterbot.Log(`${fsError.origin()}`);
      interaction.reply({
        content: `Something went wrong while executing this command... I'll send this to elly: \n **${fsError.name}** **${fsError.stack.split('\n')[1]}`,
        ephemeral: true,
    });
	  return;
    }
 }

}