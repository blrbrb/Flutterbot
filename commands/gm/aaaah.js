const { ApplicationCommandOptionType } = require('discord.js');
const request = require('request');
const gm = require('gm').subClass({
    imageMagick: true
});

const { findImage } = require('../../utils/findimage.js');

module.exports = {
    name: 'aaaaah',
    description: 'aaaaah',
    options: [
        {
            name: "image",
            description: "image for aaaaahing",
            type: ApplicationCommandOptionType.Attachment,
            required: true
        }
    ],
    async execute(interaction, client) { // eslint-disable-line no-unused-vars
        imageUrl = await findImage(message);
        console.log(imageUrl);
        if (imageUrl !== undefined) {
            gm(request(imageUrl))
                .out("-radial-blur", 10)
                .strip()
                .stream((error, stdout) => {
                    if (error) throw new Error(error);
                    message.channel.send({
                        files: [{
                            attachment: stdout,
                            name: "aaaah.png"
                        }]
                    });
                });
        }
    }
}