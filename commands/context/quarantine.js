const {ApplicationCommandType,ContextMenuCommandBuilder,PermissionFlagsBits, Command, PermissionsBitField, ModalBuilder} = require('discord.js');

module.exports = {
    name: 'Quarantine',
    type:ApplicationCommandType.User,
    default_member_permissions: 8,
    
    /**
     * ### Context Menu Command 
     * ---
     * #### Hover over guild member & left click >  Apps > quarantine 
     * Add a user to the list of quarantined users in a guild 
     * @param {import('discord.js').CommandInteraction} interaction
     * @param {import('../../types').Flutterbot} Flutterbot
     */
    async execute(interaction,Flutterbot)
    { 
       
      
       //Flutterbot.AngelBunny.quaratine(interaction.targetMember);
      interaction.reply(`${interaction.targetUser.username} has been added to the list of quarantined / unsafe user accounts in this guild. This action does not affect feature access but does involve security restrictions to permissions`);
      return  Flutterbot.DB.quarantine(interaction.targetUser,interaction.guild);
    },

}