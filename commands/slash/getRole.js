
const {format, langRand} = require('../../utils.js');
const { PermissionFlagsBits } = require('discord.js');
const {errorMessage} = require('../../lang/en.js');
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
            const reason = `**You cannot assign yourself** ${role} \n ${private_roles.includes(role.id) ?  errorMessage.roleError.noPermissions(role) :`${role} has been set to hidden, However, to get a list of roles that I'd be happy to assign you use /roles!` }`
            return interaction.reply({
                content: reason,
                ephemeral: true,
            });
        }

        else if (guildMember.roles.cache.has(role.id)) {
          
                return interaction.reply({
                    content: errorMessage.roleError.alreadyHas(role),
                    ephemeral: true,
                });
           
        }
        try {
            await guildMember.roles.add(role);
            interaction.reply({content:`Role '${role.name}' added to you`, ephemeral: true});
        } catch (error) {
            console.error(error);
            interaction.reply({
                content: 'Failed to add role',
                ephemeral: true,
            });
        }
    },
};