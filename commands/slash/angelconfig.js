const fs = require('fs');

module.exports = {
    name: "angelconfig",
    description: "set up global variables for fluttershy's anti-abuse backend",
    default_member_permissions: "0",
    options: [
        {
            type: 7,
            name: "channel",
            description: "--MARKED FOR CHANGE",
            required: true
        }
    ],
    async execute(client, interaction) {
        console.log('working');
        let channel = interaction.options.getChannel('channel');
        let data;
        try {
            data = JSON.parse(fs.readFileSync('guardianAngel/config.json'));
            // Check if the role is already in the list
            if (data.always_trusted.includes(user.id)) {
                return interaction.reply({ content: `This person is already in the list`, ephemeral: true });
            }
            else {
                // Add the role to the list
                data.always_trusted.push(user.id);

                // Write the updated list to the JSON file
                fs.writeFileSync('guardianAngel/config.json', JSON.stringify(data, null, 2));

                // Reply with a confirmation message
                return interaction.reply(`Added "${user.username}" with ID "${user.id}" to the list of trusted users!`);
            }
        } catch (error) {
            console.log(error);
        }
    }
};