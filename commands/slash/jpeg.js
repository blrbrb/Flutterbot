const request = require('request');
const gm = require('gm').subClass({
    imageMagick: true
});

const findImage = require('../../utils/findimage.js');
let imageUrl;

module.exports = {
    name: 'jpeg',
    description: 'Fluttershy Will Jpeg-ify an image',
    helpText: `add more jpeg to an image \n Use: **/jpeg** <jpeg, png, gif, webm embed>`,
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
    async execute(interaction, Flutterbot) {

        var quality = 1;

       	const image = interaction.options.getAttachment('image'); 

        if (interaction.options.getNumber('quality'))
            quality = interaction.options.getNumber('quality');

        if (image !== undefined) {
            interaction.channel.sendTyping();
            await gm(request(image)).size((error, size) => {
                if (size.height > 1200 || size.width > 1200) {
                    return interaction.reply(`t-that's way too big of an image for me!🖌️🐇`);
                }
                gm(request(image)).setFormat("jpg").quality(quality).stream((error, stdout) => {
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
