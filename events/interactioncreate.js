const { Events,AttachmentBuilder } = require('discord.js');
const { prefix, current_maintenance } = require('../config/config.json');

const fs = require('fs');

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    async execute(Flutterbot, interaction){
    
        if (interaction.channel.id == '1091850338023260261') return;
    try {
        // we should check if a command isnt found but was registered in discord
        Flutterbot.slashcommands.get(interaction.commandName)?.execute(interaction, Flutterbot);
    } catch (error) {
        console.error(error);
        interaction.reply({
            content: `Something went wrong while executing this command... tell Eli that: \n  **${error.message}**`,
            ephemeral: true,
        });
    }


    }

}