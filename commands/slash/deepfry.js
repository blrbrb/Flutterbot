const request = require('request');
const {Flutterbot} = require('../../client/Flutterbot')
const {Interaction} = require('discord.js');
const utilities = require('../../utils/utilities')
const gm = require('gm').subClass({
    imageMagick: true
});

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
    /**
     * @param {Interaction} interaction
     * @param {Flutterbot} Flutterbot
     */
    async execute(interaction, Flutterbot) {

        imageUrl = await interaction.options.getAttachment('image').url;

        const extension = utilities.getExtension(imageUrl);
        if (imageUrl !== undefined) {
            interaction.channel.sendTyping();

                    await gm(request(imageUrl)).colorspace("RGB").out("-brightness-contrast", "30x50").setFormat("jpg").quality(1).stream((error, stdout) => {
                        if (error) throw new Error(error);

                        interaction.reply({
                            files: [{
                                attachment: stdout,
                                name: "deepfry.jpg"
                            }]
                        });
                    });
                }
        }
    }
