const request = require('request');
const gm = require('gm').subClass({
	imageMagick: true
});

const findImage = require('../../utils/findimage.js');
//const fs = require('fs');
module.exports = {
	name: 'circle',
	description: 'Fluttershy Will Circularize an image',
	async execute(client, message, args) { // eslint-disable-line no-unused-vars

		var IOR = 10;
		
		//var url = await message.options.getAttachment("image").url;
		imageUrl = await findImage(message);
		console.log(url);
		const extension = findImage.extensionFinder(url);

		//if (message.options.getNumber('ior')) {
		//	IOR = message.options.getNumber('ior');
		//}
		if (url !== undefined) {
			
			message.channel.sendTyping();
			await gm(request(url)).size((error, size) => {
				if (size.height > 1200 || size.width > 1200) {
					return message.reply(`t-that's way too big of an image for me!🖌️🐇`);
				}
				gm(request(url)).out("-rotational-blur", IOR).strip().stream((error, stdout) => {
					if (error) throw new Error(error);

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