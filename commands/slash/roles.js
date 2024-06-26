
const {ActionRow, Embed, EmbedBuilder, ActionRowBuilder, ComponentType, ButtonStyle, ButtonBuilder,PermissionFlagsBits} = require('discord.js');


module.exports = {
  name: 'roles',
  description: 'list all available roles',
  async execute(interaction, Flutterbot) { 
   
    const private_roles = Flutterbot.db.query(`SELECT * FROM PRIVATE_ROLES WHERE guild_id=${interaction.guild.id}`); 
    
    const roles = interaction.guild.roles.cache.filter(role => role.name !== '@everyone' && !role.permissions.has(PermissionFlagsBits.Administrator) && !role.managed && !private_roles.includes(role.id)); // Get all roles except @everyone, administrator roles, and roles that have been registered as private roles 
   
    const roleNames = roles.map(role => role.name); // Get an array of role names
    
  
    // Create an embed to display the available roles
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Available Roles')
      .setDescription(roleNames.join('\n')); 
    
    if(color)
    {
      embed.setColor(color);
    }
   interaction.reply({ embeds: [embed] });
  },
};
