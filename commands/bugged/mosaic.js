const request = require('request');
const gm = require('gm').subClass({
	imageMagick: true
});

const findImage = require('../../utils/findimage.js');

module.exports = {
	name: 'mosaic',
	description: 'Fluttershy Will Turn an image into a mosaic',
	helpText: `turn an image into a sequence of tiles \n Use: **/mosaic** <jpeg, png, gif, webm embed>`,
	options: [
		{
			type: 11,
			name: "image",
			description: "Image for Fluttershy to turn into a mosaic",
			required: true
		},
		{
			type: 10,
			name: "scale",
			description: "scale factor of the mosaic"
		}
	],
	async execute(Discord, client, interaction) {

		var scale = 5;

		imageUrl = await interaction.options.getAttachment('image').url;

		if (interaction.options.getNumber('scale'))
			scale = interaction.options.getNumber('scale');
		if (scale > 100 || scale <= 0)
			scale = 5;

		const extension = findImage.extensionFinder(imageUrl);

		console.log(extension);
		if (imageUrl !== undefined) {
			interaction.channel.sendTyping();
			gm(request(imageUrl)).filesize((error, format) => {
				gm(request(imageUrl)).command("-mosaic").out("-duplicate").tile(`${scale}x${scale}`).geometry("+0+0").stream((error, stdout) => {
					if (error) throw new Error(error);
					gm(stdout).resize(800, 800).stream((error, stdoutFinal) => {
						if (error) throw new Error(error);
						interaction.reply({
							files: [{
								attachment: stdoutFinal,
								name: "mosaic.png"
							}]
						});
					});
				});
			});
		}
	}
}