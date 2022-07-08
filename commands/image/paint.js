const request = require("request");
const gm = require("gm").subClass({
	  imageMagick: true
});

const findImage = require('../../utils/findimage.js');

module.exports = {
	name: 'paint',
	description: 'Fluttershy WilL Paint An Image',
 async run(client, message, args) { // eslint-disable-line no-unused-vars
	
	 imageUrl = await findImage.imageFinder(message);
		const extension = findImage.extensionFinder(imageUrl);
	  if (imageUrl !== undefined) {
		      message.channel.startTyping();
		       await gm(request(imageUrl)).size((error, size) => { 
		       
		       	if(size.height > 1200 && size.width > 1200) 
		       	{
		       		message.channel.stopTyping();	
		       		message.channel.send(`t-that's way too big of an image for me!🖌️🐇`);	
		       		 
		       		return;
		       	}
		       	
		       gm(request(imageUrl)).paint(15).resize("800x800>").stream((error, stdout) => {
			            if (error) console.log(error); 
			            //console.log(error);
			            message.channel.stopTyping();
			            message.channel.send({
					            files: [{
							              attachment: stdout,
							              name: "paint.png"
							            }]
					          });
			          }); 
		       });
		    }
}
}