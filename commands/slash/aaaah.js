const { ApplicationCommandOptionType, Interaction, SlashCommandBuilder, ContextMenuCommandBuilder } = require('discord.js');
const {Flutterbot} = require('../../client/Flutterbot');
const request = require('request');
const gm = require('gm').subClass({
    imageMagick: true
});

const {findImage} = require('../../utils/utilities.js');

module.exports = {
    name: 'aaaaah',
    description: 'aaaaah',
    type:ApplicationCommandOptionType.ChatInput,
    cooldown: 1,
    options: [
        {
            name: "image",
            description: "image for aaaaahing",
            type: ApplicationCommandOptionType.Attachment,
            required: true
        }
    ],
    /**
     * @param {Interaction} interaction
     * @param {Flutterbot} Flutterbot
     */
    async execute(interaction,Flutterbot)  { // eslint-disable-line no-unused-vars
        let imageUrl = await interaction.options.getAttachment("image").url;
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