const request = require('request');
const gm = require('gm').subClass({
    imageMagick: true
});

const {findImage, frange} = require('../../utils/utilities.js');

module.exports = {
    name: 'destroy',
    description: 'Fluttershy Will Destroy an image for you',
    helpText: `blow somepony up \n Use: **/destroy** <jpeg, png, gif, webm embed>`,
    options: [
        {
            type: 11,
            name: "image",
            description: "the image for fluttershy to destroy",
            required: true
        }
    ],
    async execute(interaction, Flutterbot) {
        imageUrl = await interaction.options.getAttachment('image').url;
        gm(request(imageUrl)).size(async (error, size) => {
            if(error){
                console.log(error)
               // return interaction.reply(error);
            }
            if (size.height > 1200 || size.width > 1200) {
                return interaction.reply(`t-that's way too big of an image for me!🖌️🐇`);
            }
             gm(request(imageUrl)).implode([frange(-50, 0)]).strip().stream((error, stdout) => {
                if (error) throw new Error(error);
                interaction.reply({
                    files: [{
                        attachment: stdout,
                        name: "destroy.png"
                    }]
                });
            });
        });
        const extension = findImage.extensionFinder(imageUrl);
        
            interaction.channel.sendTyping();
            
        
    }
}