
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
            await interaction.reply(errorMessage.PermissionError.missing());
            return;
          }
      
          const privateroles = Flutterbot.DB.get(`${interaction.guild.id}.config.private_roles`);
         
        
          // Check if the role has ADMINISTRATOR permission (You can adjust this check as needed)
          if (role && role.permissions.has(PermissionFlagsBits.Administrator)) {
           
                //:`${role} has been set to hidden, However, to get a list of roles that I'd be happy to assign you use /roles!` }`
            await interaction.reply(errorMessage.RoleError.noPermissions(role));
            return;
          } 

          //check if the role is on the list of private roles for the guild 
          if(privateroles.includes(role.id))
          {
            await interaction.reply(errorMessage.RoleError.noPermissions(role))
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