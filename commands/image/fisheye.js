require('dotenv').config();
const request = require("request");
const gm = require("gm").subClass({
	imageMagick: true
});

const findImage = require('../../utils/findimage.js');

module.exports = {
	name: 'fisheye',
	description: 'Fluttershy Will Fisheye an image',
	async run(client, message, args) { // eslint-disable-line no-unused-vars

		imageUrl = await findImage.imageFinder(message);
		const extension = findImage.extensionFinder(imageUrl);

		let r = (args[0] && !Number.isNaN(Number(args[0]))) ? Number(args[0]) : 1.6; 
		let scaleFactor = r; 
		if (r <= 1) scaleFactor = 1 / (r * r) * 2; 

		if (imageUrl !== undefined) {
			message.channel.sendTyping();
			await gm(request(imageUrl)).fisheye((error, size) => {

				if (size.height > 1200 && size.width > 1200) {
					message.channel.send(`t-that's way too big of an image for me!?????`);
					message.channel.stopTyping();
					return;
				}

				gm(request(imageUrl)).out("-rotational-blur", 10).strip().stream((error, stdout) => {
					if (error) throw new Error(error);
					message.channel.stopTyping();
					message.channel.send({
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