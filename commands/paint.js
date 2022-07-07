const request = require("request");
const gm = require("gm").subClass({
	  imageMagick: true
});

const findImage = require('../utils/findimage.js');

module.exports = {
	name: 'paint',
	description: 'Fluttershy WilL Paint An Image',
 async run(client, message, args) { // eslint-disable-line no-unused-vars
	 imageUrl = await findImage(message);
	  if (imageUrl !== undefined) {
		      message.channel.startTyping();
		      await gm(request(imageUrl)).paint(25).stream((error, stdout) => {
			            if (error) throw new Error(error);
			            message.channel.stopTyping();
			            message.channel.send({
					            files: [{
							              attachment: stdout,
							              name: "paint.png"
							            }]
					          });
			          });
		    }
}
}