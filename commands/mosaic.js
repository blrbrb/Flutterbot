const request = require("request");
const gm = require("gm").subClass({
	  imageMagick: true
});

const findImage = require('../utils/findimage.js');

module.exports = {
	name: 'mosaic',
	description: 'Fluttershy Will Turn an image into a mosaic',
	async run(client, message, args) { // eslint-disable-line no-unused-vars

		imageUrl = await findImage(message);
	  if (imageUrl !== undefined) {
		      message.channel.startTyping();
		      gm(request(imageUrl)).command("montage").out("-duplicate").out(24).tile("5x5").geometry("+0+0").stream((error, stdout) => {
			            if (error) throw new Error(error);
			            gm(stdout).resize("800x800>").stream((error, stdoutFinal) => {
					            if (error) throw new Error(error);
					            message.channel.stopTyping();
					            message.channel.send({
							              files: [{
									                  attachment: stdoutFinal,
									                  name: "mosaic.png"
									                }]
							            });
					          });
			          });
		    }
}

}