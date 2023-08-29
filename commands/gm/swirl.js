const request = require('request');
const gm = require('gm').subClass({
    imageMagick: true
});

const { findImage } = require('../../utils/findimage.js');

module.exports = {
    name: 'swirl',
    description: 'Fluttershy Will Swirl an image',
    async execute(client, message, args) { // eslint-disable-line no-unused-vars
        imageUrl = await findImage.imageFinder(message);
        const extension = findImage.extensionFinder(imageUrl);

        if (imageUrl !== undefined) {
            message.channel.sendTyping();
            await gm(request(imageUrl)).size((error, size) => {
                if (size.height > 1200 || size.width > 1200) {
                    return message.channel.send(`t-that's way too big of an image for me!🖌️🐇`);
                }
                gm(request(imageUrl)).swirl(180).strip().stream((error, stdout) => {
                    if (error) throw new Error(error);

                    message.channel.send({
                        files: [{
                            attachment: stdout,
                            name: "swirl.png"
                        }]
                    });
                });
            });
        }
    }
}