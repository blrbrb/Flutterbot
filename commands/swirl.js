const request = require("request");
const gm = require("gm").subClass({
	  imageMagick: true
});

const findImage = require('../utils/findimage.js');

module.exports = {
	name: 'swirl',
	description: 'Fluttershy Will Swirl an image',
 async run(client, message, args) { // eslint-disable-line no-unused-vars
	 imageUrl = await findImage(message);
	  if (imageUrl !== undefined) {
		      message.channel.startTyping(); 
		       await gm(request(imageUrl)).size((error, size) => { 
		       
		       	if(size.height > 1200 || size.width > 1200) 
		       	{
		       		message.channel.send(`t-that's way too big of an image for me!🖌️🐇`);	
		       		return;
		       	}
		      gm(request(imageUrl)).swirl(180).strip().stream((error, stdout) => {
			            if (error) throw new Error(error);
			            message.channel.stopTyping();
			            message.channel.send({
					            files: [{
							              attachment: stdout,
							              name: "swirl.png"
							            }]
					          });
			          });
		       });
		    }
}
}