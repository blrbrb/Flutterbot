
const {format} = require('../../utils.js');
const { PermissionFlagsBits } = require('discord.js');
const {commandResponses, errorMessage} = require('../../lang/en.js');
module.exports = {
    name: "getrole",
    description: "assign yourself one of the availble roles in a server",
    options: [
        {
            type: 8,
            name: "role",
            description: "The name of the role to assign yourself",
            required: true,
        },
    ],
    async execute(interaction, Flutterbot) {
        const role = interaction.options.getRole('role');
        const guildMember = interaction.member;
        const private_roles = Flutterbot.db.getValue(`${interaction.guild.id}.config.private_roles`);
       
        //ensure the target role is not privated or admin
        if (private_roles.includes(role.id) || role.permissions.has(PermissionFlagsBits.Administrator) || role.managed) {
            
            let exitReason; 
            if(role.managed)
              exitReason = errorMessage.RoleError.managed(role);
            else if(role.permissions.has(PermissionFlagsBits.Administrator))
              exitReason = errorMessage.RoleError.admin(role);
            else(private_roles.includes(role.id))
              exitReason = errorMessage.RoleError.private(role)
            
            return interaction.reply(exitReason);
        }

        else if (guildMember.roles.cache.has(role.id)) {
                return interaction.reply(errorMessage.RoleError.alreadyHas(role));
           
        }
        try {
            await guildMember.roles.add(role);
            interaction.reply(commandResponses.getrole(role));
        } catch (error) {
            console.error(error);
            interaction.reply({
                content: 'Failed to add role',
                ephemeral: true,
            });
        }
    },
};