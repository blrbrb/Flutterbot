const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');

module.exports =
{
    name: 'roles',
    description: 'Get a list of server roles, add or remove roles (unstable)',
    async execute(Discord, client, interaction, debug) 
    { 

        
    ///const current_guild = client.guilds.cache.get(interaction.member.guild.id) 
    ///const example_role = interaction.message.guild.roles.cache.find(r => r.name === 'Mauds') 
    ///console.log(example_role)
    ///const roles = current_guild.roles.cache.map(role=> role.name)
      
    const row2 = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('Gamer')
            .setLabel('Gamer')
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId('Luna')
            .setLabel('Lunarist')
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId('Celestia')
            .setLabel('Sun Loyalist')
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId('React')
            .setLabel('Broners React')
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId('Minor')
            .setLabel('Minor')
            .setStyle(ButtonStyle.Primary),
    );

        const row = new ActionRowBuilder()
        .addComponents(
                new ButtonBuilder()
					.setCustomId('Derpist')
					.setLabel('Derpist')
					.setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
					.setCustomId('Discordian')
					.setLabel('Discordian')
					.setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
					.setCustomId('Hive')
					.setLabel('The Hive')
					.setStyle(ButtonStyle.Primary),
			);

           

       
            await interaction.reply({ content: 'Here are the avalible roles!', components: [row, row2], ephemeral: true });

           
    }
}