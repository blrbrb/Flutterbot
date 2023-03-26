const { SlashCommandBuilder } = require('@discordjs/builders');
const {ActionRow, Embed, EmbedBuilder, ActionRowBuilder, ComponentType, ButtonStyle, ButtonBuilder,PermissionFlagsBits, Role } = require('discord.js');
const { PrivateRoles } = require('../config/config.json')

module.exports = {
  name: 'roles',
  description: 'list all available roles',
  async execute(Discord, client, interaction) {
    const roles = interaction.guild.roles.cache.filter(role => role.name !== '@everyone' && !role.permissions.has(PermissionFlagsBits.Administrator) && !role.managed); // Get all roles except @everyone
    const roleNames = roles.map(role => role.name); // Get an array of role names
    console.log(roles);
    
    // Create an embed to display the available roles
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Available Roles')
      .setDescription(roleNames.join(' '));

    return interaction.reply({ embeds: [embed] });
  },
};