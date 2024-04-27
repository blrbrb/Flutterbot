const { ApplicationCommandOptionType } = require('discord.js');
const request = require('request');
const gm = require('gm').subClass({
    imageMagick: true
});

const findImage = require('../../utils/findimage.js').imageFinder;

module.exports = {
    name: 'aaaaah',
    description: 'aaaaah',
    cooldown: 1,
    options: [
        
        {
            name: "image",
            description: "image for aaaaahing",
            type: ApplicationCommandOptionType.Attachment,
            required: true
        }
    ],
    async execute(interaction,Flutterbot)  { // eslint-disable-line no-unused-vars
        const image = interaction.options.getAttachment('image'); 
        
      
        if (image !== undefined) {
            gm(request(image))
                .out("-radial-blur", 10)
                .strip()
                .stream((error, stdout) => {
                    if (error) throw new Error(error);
                    interaction.reply({
                        files: [{
                            attachment: stdout,
                            name: "aaaah.png"
                        }]
                    });
                });
        }
    }
}
