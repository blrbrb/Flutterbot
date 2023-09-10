const fs = require('fs');
const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'roleprivate',
  description: 'Creates a new role with the given name and adds its ID to a JSON file',
  options: [
    {
      name: "role",
      description: "an existing role to add its ID to the file",
      type: 8,
      required: true,
    },
  ],
  async execute(interaction, Flutterbot) {


    // Check if user is an administrator
    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({ content: 'Only administrators can use this command.', ephemeral: true });
    }
   

    const role = interaction.options.getRole('role');
    
    // Check if the roles JSON file exists
    let data;
    try {
      data = Flutterbot.db.getValue(`${interaction.guild.id}.config`); 
         
      // Check if the role is already in the list
      if (data.private_roles.includes(role.id)) {
        return interaction.reply({ content: `Role "${role.name}" is already in the list of private roles`, ephemeral: true });
      }

      // Add the role to the list
      data.private_roles.push(role.id);

      // Write the updated list to the JSON file
      Flutterbot.db.addEntry(`${interaction.guild.id}`, data);

    } catch (error) {
      // If the data doesn't exist, initialize it with an empty roles array
      data = [];
      Flutterbot.db.modifyEntry(`${interaction.guild.id}.config.private_roles`, data);
    
    }

    
    // Reply with a confirmation message
    return interaction.reply(`Added role "${role.name}" with ID "${role.id}" to the list of private roles! 
    ${role} will no longer be accessible with /getRole, modifyable with /removerole, nor will it appear on the list of assignable roles with /roles.
    `);

  },
    
};