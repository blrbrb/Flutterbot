const request = require('request');
const {Flutterbot} = require('../../client/Flutterbot');
const {interaction} = require('discord.js');
const Utilities = require('../../utils/utilities.js');
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
    /**
     * @param {import('discord.js').Interaction} interaction
     * @param {Flutterbot} Flutterbot
     */
    async execute(interaction, Flutterbot) {
        imageUrl = await interaction.options.getAttachment('image').url;
    
             await gm(request(imageUrl)).implode(Math.random(1)% 0.5).strip().stream((error, stdout) => {
                if (error) throw new Error(error);
               return interaction.reply({
                    files: [{
                        attachment: stdout,
                        name: "destroy.png"
                    }]
                });
            });
     
       
        
    
            
        
    }
}