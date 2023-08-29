const request = require('request');
const gm = require('gm').subClass({
    appPath: String.raw`C:\Program Files\ImageMagick-7.1.1-Q16-HDRI\magick.exe`
});

const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'circle',
    description: 'Fluttershy Will Circularize an image',
    helpText: `add a radial blurr to an image \n Use: **/circle** <jpeg, png, gif, webm embed>`,
    options: [
        {
            name: "image",
            description: "an image attachment to manipulate",
            type: ApplicationCommandOptionType.Attachment,
            required: true
        },
        {
            name: "ior",
            description: "increase or decrease the IOR of the UV sphere 1 to 10",
            type: ApplicationCommandOptionType.Number
        }
    ],
    async execute(interaction, client) {

        var IOR = 10;

        var url = await interaction.options.getAttachment("image").url;
        console.log(url);

        if (interaction.options.getNumber('ior')) {
            IOR = interaction.options.getNumber('ior');
        }
        if (url !== undefined) {
            interaction.channel.sendTyping();
            console.log(request(url));
            await gm(request(url)).size((error, size) => {
                if (error) throw new Error(error);
                if (size.height > 1200 || size.width > 1200) {
                    return interaction.channel.send(`t-that's way too big of an image for me!🖌️🐇`);
                }
                gm(request(url)).out("-rotational-blur", IOR).strip().stream((error, stdout) => {
                    if (error) throw new Error(error);

                    interaction.reply({
                        files: [{
                            attachment: stdout,
                            name: "circle.png"
                        }]
                    });
                });
            });
        }
    }
}