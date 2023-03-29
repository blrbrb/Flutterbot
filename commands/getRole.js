const { private_roles } = require('../config/private_roles.json');
const { PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: "getrole", 
    description: "assign yourself one of the availble roles in a server",
    options: [
        {
            type: 8,
            name: "role",
            description: "The name of the role to assign yourself",
            required: true
        }, 
    ],
async execute(Discord, client, interaction) {

    const role = interaction.options.getRole('role');
    const guildMember = interaction.member;

   

    if (guildMember.roles.cache.has(role.id))
    {
        return interaction.reply({
            content: `You already have this role!, I'll remove it for you`,
            ephemeral: true
        });
    }

    //ensure the target role is not privated or admin
    if(private_roles.includes(role.id) || role.permissions.has(PermissionFlagsBits.Administrator) || role.managed)
    {
        return interaction.reply({
            content: 'You do not have permission to give yourself this role :(',
            ephemeral: true
        });
    }


    try {
        await guildMember.roles.add(role);
        interaction.reply(`Role '${role.name}' added to you`);
    } catch (error) {
        console.error(error);
        interaction.reply({
            content: 'Failed to add role',
            ephemeral: true
        });
    }
},
};