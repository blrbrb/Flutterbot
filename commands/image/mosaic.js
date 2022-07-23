require('dotenv').config();
const request = require("request");
const gm = require("gm").subClass({
	  imageMagick: true
});

const findImage = require('../../utils/findimage.js');

module.exports = {
	name: 'mosaic',
	description: 'Fluttershy Will Turn an image into a mosaic',
	async run(client, message, args, debug) { 
		
		imageUrl = await findImage.imageFinder(message);
		const extension = findImage.extensionFinder(imageUrl);
		console.log(extension); 
	  if (imageUrl !== undefined) {
		      message.channel.startTyping(); 
		       await gm(request(imageUrl)).filesize((error, format) => { 
		     				
		    
		       
		       
		       gm(request(imageUrl)).command("mosaic").out("-duplicate").tile("5x5").geometry("+0+0").stream((error, stdout) => {
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
		       });
		    } 
		    
		    
		    
}

}