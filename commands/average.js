const findImage = require('../utils/findimage.js');
const request = require('request');
const gm = require('gm').subClass({
	imageMagick: true
});


module.exports = {
	name: 'average',
	description: 'Fluttershy Will combine ',
	helpText: `combine and average all of the frames in a gif into a single image \n Use: **/average** <gif embed>`,
	options: [
		{
			type: 11,
			name: "image",
			description: "an image attachment to manipulate",
			required: true
		}
	],
	async execute(Discord, client, interaction) {

		var quality = 1;

		imageUrl = await interaction.options.getAttachment('image').url;
		const extension = findImage.extensionFinder(imageUrl);

		if (interaction.options.getNumber('quality'))
			quality = interaction.options.getNumber('quality');

		if (imageUrl !== undefined) {
			if (extension == 'gif') {
				interaction.channel.sendTyping();
				await gm(request(imageUrl)).size((error, size) => {

					if (size.height > 1200 && size.width > 1200) {
						interaction.reply(`t-that's way too big of an image for me!🖌️🐇`);

						return;
					}

					gm(request(imageUrl)).setFormat("jpg").quality(quality).stream((error, stdout) => {
						if (error) throw new Error(error); //console.log(error);

						interaction.reply({
							files: [{
								attachment: stdout,
								name: "morejpeg.jpg"
							}]
						});

					});
				});
			}
			else
				return interaction.reply('sorry. the image needs to be in a gif format :(');
		}
	}

}