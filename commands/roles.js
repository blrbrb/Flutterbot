const { SlashCommandBuilder } = require('@discordjs/builders');
const {ActionRow, Embed, EmbedBuilder, ActionRowBuilder, ComponentType, ButtonStyle, ButtonBuilder,PermissionFlagsBits } = require('discord.js');
const { PrivateRoles } = require('../config/config.json')
/*module.exports = {
    name: 'role',
    description: 'assign yourself a non-admin role',
    options: 
    [
        {
        type: 3,
        name: 'role',
        required: true,
        description: 'The role you want to assign yourself.'
        },

    ],
    async execute(Discord, client, interaction) {
        const guild = interaction.guild;
        const roleName = interaction.options.getString('role');
        const isAdmin = interaction.member.permissions.has(PermissionFlagsBits.Administrator);
       
        // Find the role by name
        
        const role = guild.roles.cache.find(role => role.name === roleName) || await guild.roles.fetch('ROLEID');

        // Check if the role exists
        if (!role) {
            return interaction.reply({ content: `The role ${roleName} does not exist.`, ephemeral: true });
        }


        //  Make sure users cannot give themselves admin roles
        if (role.permissions.has(PermissionFlagsBits.Administrator))
        {
             return interaction.reply({ content: `I'm sorry, I can't give you that role :(`, ephemeral: true });
        }
        // Check if the user already has the role, if they do allow them to remove it.
        if (interaction.member.roles.cache.has(role.id)) {

            //  make sure admins don't accidentally remove the admin role from themselves 
            if(isAdmin)
            {
                return interaction.reply({ content: `I can't manage that role!`, ephemeral: true });
            }
            else
            {
                await interaction.member.roles.remove(role);
                return interaction.reply({ content: `You already have the role ${roleName}. So I'll remove it`, ephemeral: true });
            }
        }


        // Assign the role to the user
        try {
            await interaction.member.roles.add(role);
            return interaction.reply({ content: `You have been assigned the role ${roleName}.`, ephemeral: true });
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: 'An error occurred while assigning the role.', ephemeral: true });
        }
    },
}; */
module.exports = {
  name: 'roles',
  description: 'Assign roles to yourself!',
  async execute(Discord, client, interaction) {
   
    const roles = await interaction.guild.roles.cache.filter(role => role.name !== '@everyone' && !PrivateRoles.includes(role.id)  && !role.permissions.has(PermissionFlagsBits.Administrator) && !role.managed); // Get all roles except @everyone
    console.log(roles);
    const roleNames  = roles.map(role => role.name);
    console.log(roleNames.length);
     // Get an array of role names
    //console.log(roles, typeof(roleNames));
    //console.log(Object.keys(roleNames));
    // Create an embed to display the available roles
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Roles! ')
      .setDescription(`Click the buttons below to assign or remove roles from yourself. yay.\n\n${roleNames.join('\n')}`);

    
    
    // Create a button for each role
    

   
    const buttons = roles.map(role  =>new ButtonBuilder()
      .setCustomId(role.id)
      .setLabel(role.name)
      .setStyle(ButtonStyle.Primary));

      ;
    // Create an action row with all the buttons
    console.log(buttons);
    const actionRow = new ActionRowBuilder().addComponents(buttons);
    console.log(actionRow.components.length); 
    
   
    // Send the embed with the action row to the user
    await interaction.reply({ embeds: [embed], components: [actionRow] });
   

    // Create a collector to listen for button clicks
    const collector = interaction.channel.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time: 15000 // Collector will expire after 15 seconds
    });

    collector.on('collect', async button => {
      //Convert the button.id back into a member object, and a roles object. Get info on user, and what they have selected
      const member = await interaction.guild.members.fetch(button.user.id);
      const role = await interaction.guild.roles.fetch(button.user.id);
       

       // Check if the user already has the role
       // Check if the user has permission to assign themselves the role
       // Logic goes here etc
        
      if (member.roles.cache.has(button.customId)) {
        await member.roles.remove(button.customId);
        await button.reply({ content: `You no longer have the "${button.label}" role.`, ephemeral: true });
      } else {
        await member.roles.add(button.customId);
        await button.reply({ content: `You now have the "${button.label}" role.`, ephemeral: true });
      }
    });

    collector.on('end', () => {
      // Remove the buttons from the original message
      actionRow.components.forEach(component => component.setDisabled(true));
      interaction.editReply({ components: [actionRow] });
    });
  },
};