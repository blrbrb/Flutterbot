const fs = require('fs');

module.exports = {
    name: "addtrusted",
    description: "add someone to angel's list of trusted ponies",
    default_member_permissions: "0",
    options: [
        {
            name: "trusted",
            description: "add someone to the trusted list",
            required: true,
            type: 6
        }

    ],
    async execute(client, interaction) {
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