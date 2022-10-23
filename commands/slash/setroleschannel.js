const { PermissionFlagsBits } = require('discord.js');



module.exports = {
    name: 'setroleschannel',
    description: 'set the channel for the server to auto-update roles in',
    options: [
        {
            type: 7,
            name: "channel",
            description: "The roles channel",
            required: true
        }
    ],
    default_permission: false,
    default_member_permissions: 0,
    async execute(Discord, client, interaction, debug)
    {
        if (interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {

            const new_roles_channel = interaction.options.getChannel('channel');


            console.log(new_roles_channel);
            const string = `command under construction`;
            await interaction.reply(string);
        }
        else
        {
            await interaction.reply('you must be an administrator to modify bot settings');

        }


    }
}