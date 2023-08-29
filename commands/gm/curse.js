const request = require('request');
const gm = require('gm').subClass({
    imageMagick: true
});
const fs = require('fs');
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'curse',
    description: 'curse an image',
    options: [
        {
            name: "image",
            description: "an image attachment to manipulate",
            type: ApplicationCommandOptionType.Attachment,
            required: true
        }
    ],
    execute(interaction, client) {
        const tartarus = fs.readFileSync('../../assets/images/cursed.png');
        gm(request(imageUrl)).size((error, size) => {
            if (size.height > 1200 || size.width > 1200) {
                return message.channel.send(`t-that's way too big of an image for me!🖌️🐇`);
            }
            if (error) throw new Error(error);
            gm(request(imageUrl)).composite(tartarus).gravity("Center").resize(null, size.height).strip().stream((error, stdout) => {
                if (error) throw new Error(error);
                message.channel.send({
                    files: [{
                        attachment: stdout,
                        name: "curse.png"
                    }]
                });
            });
        });
    }
}