const request = require('request');
const gm = require('gm').subClass({
	imageMagick: true
});
const findImage = require('../../utils/findimage.js');

module.exports = {
	name: 'paint',
	description: 'Fluttershy Will Paint An Image',
	cooldown: 3, 
	async execute(client, message, args) { // eslint-disable-line no-unused-vars
		imageUrl = await findImage.imageFinder(message);
		if (imageUrl !== undefined) {
			message.channel.sendTyping();
			await gm(request(imageUrl)).size((error, size) => {
				if (size.height > 1200 || size.width > 1200) {
					return message.channel.send(`t-that's way too big of an image for me!🖌️🐇`);
				}
				gm(request(imageUrl)).paint(15).resize(800, 800).stream((error, stdout) => {
					if (error) console.log(error);
					//console.log(error);
					message.channel.send({
						files: [{
							attachment: stdout,
							name: "paint.png"
						}]
					});
				});
			});
		}
	}
}