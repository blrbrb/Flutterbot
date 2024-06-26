﻿const findImage = require('../../utils/findimage.js');
const request = require('request');
const gm = require('gm').subClass({
    imageMagick: true
});

module.exports = {
    name: 'average',
    description: 'Fluttershy Will combine two or more images into a gif',
    helpText: `combine and average all of the frames in a gif into a single image \n Use: **/average** <gif embed>`,
    options: [
        {
            type: 11,
            name: "image",
            description: "an image attachment to manipulate",
            required: true
        }
    ],
    async execute(interaction, Flutterbot) {
        let quality = 1;

        imageUrl = await interaction.options.getAttachment('image').url;
        const extension = findImage.extensionFinder(imageUrl);

        if (interaction.options.getNumber('quality'))
            quality = interaction.options.getNumber('quality');

       
            if (extension !== 'gif') return interaction.reply('sorry. the image needs to be in a gif format :(');
            interaction.channel.sendTyping();
           await gm(request(imageUrl)).size((error, size) => {


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
