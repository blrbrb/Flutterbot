require('dotenv').config();
const request = require("request");
const fs = require('fs');
const gm = require("gm").subClass({
    imageMagick: true
});

const findImage = require('../../utils/findimage.js');
const sendImage = require('../../utils/sendimage.js');
const clamp = require('../../utils/clamp.js');
let imageUrl;
let { attachment, embed, AttachmentBuilder } = require('discord.js');

module.exports = {
    name: 'jpeg',
    description: 'Fluttershy Will Jpeg-ify an image',
    options: [
        {
            type: 11,
            name: "image",
            description: "The image for Flutterhsy to add more JPEG to ",
            required: true
        },
        {
            type: 10,
            name: "quality",
            description: "increase or decrese the quality of the JPEG from 1 to 10"
        }
    ],
    async execute(Discord, client, interaction, debug) {

        var quality = 1;

        imageUrl = await interaction.options.getAttachment('image').url;
        const extension = findImage.extensionFinder(imageUrl);

        if (interaction.options.getNumber('quality'))
            quality = interaction.options.getNumber('quality');

        if (imageUrl !== undefined) {
            interaction.channel.sendTyping();
            await gm(request(imageUrl)).size((error, size) => {
                if (size.height > 1200 && size.width > 1200) {
                    interaction.reply(`t-that's way too big of an image for me!🖌️🐇`);

                    return;
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