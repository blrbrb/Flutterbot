const request = require('request');
const gm = require('gm').subClass({
    imageMagick: true
});

const { frange } = require('../../utils/numbers.js');
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'destroy',
    description: 'Fluttershy Will Destroy an image for you',
    helpText: `blow somepony up \n Use: **/destroy** <jpeg, png, gif, webm embed>`,
    options: [
        {
            name: "image",
            description: "the image for fluttershy to destroy",
            type: ApplicationCommandOptionType.Attachment,
            required: true
        }
    ],
    async execute(interaction, client) {
        imageUrl = await interaction.options.getAttachment('image').url;
        if (imageUrl !== undefined) {
            interaction.channel.sendTyping();
            await gm(request(imageUrl)).size((error, size) => {
                if (size.height > 1200 || size.width > 1200) {
                    return interaction.reply(`t-that's way too big of an image for me!🖌️🐇`);
                }
                gm(request(imageUrl)).implode([frange(-50, 0)]).strip().stream((error, stdout) => {
                    if (error) throw new Error(error);
                    interaction.reply({
                        files: [{
                            attachment: stdout,
                            name: "destroy.png"
                        }]
                    });
                });
            });
        }
    }
}