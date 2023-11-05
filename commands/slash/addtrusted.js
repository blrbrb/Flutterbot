const { ApplicationCommandOptionType, Interaction, ApplicationCommandType } = require('discord.js');
const fs = require('fs');
const {Flutterbot} = require('../../client/Flutterbot');
module.exports = {
    name: "addtrusted",
    description: "add someone to angel's list of trusted ponies",
    default_member_permissions: "0",
    cooldown: 1,
    type:ApplicationCommandType.ChatInput,
    options: [
        {
            name: "trusted",
            description: "add someone to the trusted list",
            type: ApplicationCommandOptionType.User,
            required: true,
        }
    ],
    /**
     * @param {Interaction} interaction
     * @param {Flutterbot} Flutterbot
     */
    async execute(interaction,Flutterbot)  {
        console.log('working');
        let user = interaction.options.getUser('trusted');
        let data;
        try {

            raw = JSON.parse(fs.readFileSync('guardianAngel/config.json'));

            data = raw[`${interaction.guild.id}`];
            console.log(data);


            // Check to make sure the server has actually been configured 
            if (data == null) {
                return interaction.reply(`I can't do that, this server hasn't been properly configured yet!`);
            }

            // Check if the role is already in the list
            if (data.always_trusted.includes(user.id)) {
                return interaction.reply({ content: `This person is already in the list`, ephemeral: true });
            }
            else {

                // Add the user to the list
                data.always_trusted.push(user.id);

                // Write the updated list to the JSON file
                fs.writeFileSync('guardianAngel/config.json', JSON.stringify(data, null, 2));
                
                // Reply with a confirmation message
                return interaction.reply(`Added "${user.username}" with ID "${user.id}" to the list of trusted users!`);
            }
        } catch (error) {
            console.log(error);
        }
    },
}