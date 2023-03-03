const request = require('request');
const gm = require('gm').subClass({
    imageMagick: true
});

const findImage = require('../utils/findimage.js');

module.exports = {
    name: 'deepfry',
    description: 'Fluttershy Will Dip your images into the deepfrier',
    helpText: `deepfry an image \n Use: **/deepfry** <jpeg, png, gif, webm embed>`,
    options: [
        {
            type: 11,
            name: "image",
            description: "The image For Fluttershy to deepfry",
            required: true
        }
    ],
    async execute(Discord, client, interaction) {

        imageUrl = await interaction.options.getAttachment('image').url;

        const extension = findImage.extensionFinder(imageUrl);

        if (imageUrl !== undefined) {
            interaction.channel.sendTyping();
            await gm(request(imageUrl)).size((error, size) => {
                if (size.height > 1200 || size.width > 1200) {
                    return interaction.reply(`t-that's way too big of an image for me!🖌️🐇`);
                }
                if (extension == 'gif') {
                    gm(request(imageUrl)).colorspace("RGB").out("-brightness-contrast", "30x50").setFormat("jpg").quality(1).stream((error, stdout) => {
                        if (error) throw new Error(error);
                        interaction.reply({
                            files: [{
                                attachment: stdout,
                                name: "deepfry.gif"
                            }]
                        });
                    });
                } else {
                    gm(request(imageUrl)).colorspace("RGB").out("-brightness-contrast", "30x50").setFormat("jpg").quality(1).stream((error, stdout) => {
                        if (error) throw new Error(error);

                        interaction.reply({
                            files: [{
                                attachment: stdout,
                                name: "deepfry.jpg"
                            }]
                        });
                    });
                }
            });
        }
    }
}