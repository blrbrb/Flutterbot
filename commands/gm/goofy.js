const { ApplicationCommandOptionType } = require('discord.js');
const request = require('request');
const gm = require('gm').subClass({
    imageMagick: true
});

const fs = require('fs');

const { findImage } = require('../../utils/findimage.js');

module.exports = {
    name: 'goofy',
    description: 'Goofy Aaah',
    options: [
        {
            name: "image",
            description: "image for goofying",
            type: ApplicationCommandOptionType.Attachment,
            required: true
        }
    ],
    async execute(interaction, client) {
        const goofy = fs.readFileSync('assets/images/goofynerd.png');
        await gm(request(imageUrl)).size((error, size) => {
            if (size.height > 1200 || size.width > 1200) {
                return message.channel.send(`t-that's way too big of an image for me!🖌️🐇`);
            }
            if (error) throw new Error(error);
            gm(request(imageUrl)).composite(goofy).gravity("Center").resize(null, size.height).strip().stream((error, stdout) => {
                if (error) throw new Error(error);
                message.channel.send({
                    files: [{
                        attachment: stdout,
                        name: "goofy.png"
                    }]
                });
            });
        });
    }
}