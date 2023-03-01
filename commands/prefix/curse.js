require('dotenv').config();
const request = require('request');
const gm = require('gm').subClass({
    imageMagick: true
});

const fs = require('fs');

const findImage = require('../../utils/findimage.js');

module.exports = {
    name: 'curse',
    description: 'curse an image',
    async execute(client, message, args) {
        imageUrl = await findImage(message);
        message.channel.startTyping();
        const tartarus = fs.readFileSync('assets/images/cursed.png');
        await gm(request(imageUrl)).size((error, size) => {
            if (size.height > 1200 && size.width > 1200) {
                message.channel.send(`t-that's way too big of an image for me!🖌️🐇`);
                message.channel.stopTyping();
                return;
            }

            if (error) throw new Error(error);
            gm(request(imageUrl)).composite(tartarus).gravity("Center").resize(null, size.height).strip().stream((error, stdout) => {
                if (error) throw new Error(error);
                message.channel.stopTyping();
                message.channel.send({
                    files: [{
                        attachment: stdout,
                        name: "curse.png"
                    }]
                });
            });
        });
    }
}