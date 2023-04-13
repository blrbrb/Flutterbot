const { PermissionFlagsBits, PermissionsBitField } = require('discord.js');

module.exports = {
 
    name: 'survivor',
    description: 'Selects a random user in the guild.',
    async execute(Discord, client, interaction) {

    // Check if user has admin role
    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({
        content: 'You do not have permission to use this command.',
        ephemeral: true,
      });
    }

     
    await interaction.reply('Selecting a random user to remove their ability to send messages...');
        
    const members = interaction.channel.members.filter(member => !member.user.bot && member.permissions.has(PermissionFlagsBits.SendMessages));
    while (members.size > 0) {
        const index = Math.floor(Math.random() * members.size);
        const member = members.array()[index];
        interaction.channel.permissionOverwrites.get(member.id).delete();
        //channel.replacePermissionOverwrites ({ "overwrites": interaction.channel.permissionOverwrites.filter (o => o.id !== idOfUserToRemove) });
        await interaction.channel.permissions.remove(PermissionFlagsBits.SendMessages);
        members.delete(member.id);  
    }
    
    await interaction.reply('There can only be one');
  },
};