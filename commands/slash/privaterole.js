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
    let data = [role.id];
    let existing = Flutterbot.DB.getGuildConfig(interaction.guild, "private_roles");
   
    //data.push(role.id);
    try {
      // Write the updated list to the JSON file
      if(existing.includes(role.id))
      {
        return interaction.reply(`${role} is already a private role in this guild!`);
      }
      else{
      Flutterbot.DB.setGuildConfig(interaction.guild, "private_roles", role.id); 
      }
    } catch (error) {
    
     
      return interaction.reply(`${error}`);
    }

      
    // Reply with a confirmation message
    return interaction.reply(`Added role "${role.name}" with ID "${role.id}" to the list of private roles! 
    ${role} will no longer be accessible with /getRole, modifyable with /removerole, nor will it appear on the list of assignable roles with /roles.
    `);

  },
    
};