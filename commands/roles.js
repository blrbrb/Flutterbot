const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord.js');
const { isDisturbed } = require('form-data');


module.exports = {
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
};