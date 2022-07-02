const request = require("request");
const gm = require("gm").subClass({
	imageMagick: true
});

const fs = require('fs'); 

const findImage = require('../utils/findimage.js');


module.exports = {
	name: 'tartarus',
	description: 'Send an Image to Tartarus',
	async run(client, message, args)
    {
        imageUrl = await findImage(message);
        message.channel.startTyping();
        const tartarus = readFileSync('assets/tartarus.png');
        gm(request(imageUrl)).size((error, size) => {
            if (error) throw new Error(error);
            gm(request(imageUrl)).composite(tartarus).gravity("Center").resize(null, size.height).strip().stream((error, stdout) => {
                if (error) throw new Error(error);
                message.channel.stopTyping();
                message.channel.send({
                    files: [{
                        attachment: stdout,
                        name: "Tartarus.png"
                    }]
                });
            });
        });
    }
	}
	




