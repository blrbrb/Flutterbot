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

		//url = await findImage.imageFinder(interaction);
		var url = await interaction.options.getAttachment("image").url;
		console.log(url);
		const extension = findImage.extensionFinder(url);


	  if (url !== undefined) {
		  interaction.channel.sendTyping();
		  await gm(request(url)).size((error, size) => {

			  if (size.height > 1200 && size.width > 1200)
			  {
			   interaction.channel.send(`t-that's way too big of an image for me!🖌️🐇`);
				
				  return;
			  }

			  gm(request(url)).out("-rotational-blur", 10).strip().stream((error, stdout) => {
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