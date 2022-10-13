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
		}
	],
	async execute(Discord, client, interaction, debug) { // eslint-disable-line no-unused-vars

		//imageUrl = await findImage.imageFinder(message);
		imageUrl = await interaction.options.getAttachment("image");
		console.log(interaction.options.getAttachment("image")); 
		const extension = findImage.extensionFinder(imageUrl);


	  if (imageUrl !== undefined) {
		  message.channel.sendTyping();
		  await gm(request(imageUrl)).size((error, size) => {

			  if (size.height > 1200 && size.width > 1200) {
				  message.channel.send(`t-that's way too big of an image for me!🖌️🐇`);
				  message.channel.stopTyping();
				  return;
			  }

			  gm(request(imageUrl)).out("-rotational-blur", 10).strip().stream((error, stdout) => {
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