const request = require('request');
const gm = require('gm').subClass({
	imageMagick: true
});

const findImage = require('../../utils/findimage.js');

module.exports = {
	name: 'circle',
	description: 'Fluttershy Will Circularize an image',
	helpText: `add a radial blurr to an image \n Use: **/circle** <jpeg, png, gif, webm embed>`,
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
	async execute(interaction, client) { // eslint-disable-line no-unused-vars

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