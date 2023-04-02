const { PermissionFlagsBits } = require('discord.js');

module.exports = {
 
    name: 'raffle',
    description: 'Selects a random user in the guild.',
    async execute(Discord, client, interaction) {

    // Check if user has admin role
    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({
        content: 'You do not have permission to use this command.',
        ephemeral: true,
      });
    }
    console.log('working');
    const guild = interaction.guild;
    const members = await guild.members.fetch();

    // Filter out bots and admins
    const validMembers = members.filter( 
      
      (member) => !member.user.bot && !member.permissions.has(PermissionFlagsBits.Administrator)
    );

    // Select a random member
    const randomMember = validMembers.random();
 

    if (randomMember) {
      return interaction.reply({content: `Random user selected: ${randomMember.displayName}`, ephemeral: true});
    } else {
      return interaction.reply({content: 'No valid users found in this guild.', ephemeral: true});
    }
  },
};