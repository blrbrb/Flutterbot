require('dotenv').config();
const request = require("request");
const gm = require("gm").subClass({
	imageMagick: true
});

const findImage = require('../../utils/findimage.js');

module.exports = {
	name: 'circle',
	description: 'Fluttershy Will Circularize an image',
	options: [
		{
			type: 11,
			name: "image",
			description: "an image attachment to manipulate",
			required: true
		},
		{
			type: 10,
			name: "ior",
			description: "increase or decrease the IOR of the UV sphere 1 to 10"
		}
	],
	async execute(Discord, client, interaction, debug) { // eslint-disable-line no-unused-vars

		var IOR = 10;

		var url = await interaction.options.getAttachment("image").url;
		console.log(url);
		const extension = findImage.extensionFinder(url);

		if (interaction.options.getNumber('ior')) {
			IOR = interaction.options.getNumber('ior');
		}
		if (url !== undefined) {
			interaction.channel.sendTyping();
			await gm(request(url)).size((error, size) => {
				if (size.height > 1200 && size.width > 1200) {
					interaction.channel.send(`t-that's way too big of an image for me!🖌️🐇`);

					return;
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