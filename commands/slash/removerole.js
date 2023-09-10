const { private_roles } = require('../../config/private_roles.json');
const { PermissionFlagsBits } = require('discord.js');
const { errorMessage } = require('../../lang/en');

module.exports = {
    name: "removerole",
    description: "remove a role from yourself",
    options: [
        {
            type: 8,
            name: "role",
            description: "The name of the role to assign yourself",
            required: true,
        },
    ],
    async execute(interaction, Flutterbot)
    {
      const role = interaction.options.getRole('role');

        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageRoles)) {
            await interaction.reply({content: 'You do not have permission to manage roles.',ephemeral: true});
            return;
          }
      
          const privateroles = Flutterbot.db.getValue(`${interaction.guild.id}.config.private_roles`);
         
        
          // Check if the role has ADMINISTRATOR permission (You can adjust this check as needed)
          if (role && role.permissions.has(PermissionFlagsBits.Administrator)) {
           
                //:`${role} has been set to hidden, However, to get a list of roles that I'd be happy to assign you use /roles!` }`
            await interaction.reply({content:errorMessage.roleError.noPermissions(role),ephemeral: true});
            return;
          } 

          //check if the role is on the list of private roles for the guild 
          if(privateroles.includes(role.id))
          {
            await interaction.reply({content:errorMessage.roleError.noPermissions(role), ephemeral: true})
          }
      
          // Remove the role from the user
          try {
            await interaction.member.roles.remove(role);
            await interaction.reply({content: `Removed the ${role.name} role from you.`, ephemeral: true});
          } catch (error) {
            console.error(error);
            await interaction.reply({content: 'An error occurred while removing the role.',ephemeral: true});
          }
        }
    
};