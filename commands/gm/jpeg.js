const request = require('request');
const gm = require('gm').subClass({
    imageMagick: true
});

const { findImage } = require('../../utils/findimage.js');
const { ApplicationCommandOptionType } = require('discord.js');
let imageUrl;

module.exports = {
    name: 'jpeg',
    description: 'Fluttershy Will Jpeg-ify an image',
    helpText: `add more jpeg to an image \n Use: **/jpeg** <jpeg, png, gif, webm embed>`,
    options: [
        {
            name: "image",
            description: "The image for Flutterhsy to add more JPEG to ",
            type: ApplicationCommandOptionType.Attachment,
            required: true
        },
        {
            name: "quality",
            description: "increase or decrese the quality of the JPEG from 1 to 10",
            type: ApplicationCommandOptionType.Number
        }
    ],
    async execute(interaction, client) {

        var quality = 1;

        imageUrl = await interaction.options.getAttachment('image').url;
        const extension = findImage.extensionFinder(imageUrl);

        if (interaction.options.getNumber('quality'))
            quality = interaction.options.getNumber('quality');

        if (imageUrl !== undefined) {
            interaction.channel.sendTyping();
            await gm(request(imageUrl)).size((error, size) => {
                if (size.height > 1200 || size.width > 1200) {
                    return interaction.reply(`t-that's way too big of an image for me!🖌️🐇`);
                }
                gm(request(imageUrl)).setFormat("jpg").quality(quality).stream((error, stdout) => {
                    if (error) throw new Error(error); //console.log(error);
                    interaction.reply({
                        files: [{
                            attachment: stdout,
                            name: "morejpeg.jpg"
                        }]
                    });

                });
            });
        }
    }
}