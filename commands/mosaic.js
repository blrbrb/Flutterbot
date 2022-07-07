const request = require("request");
const gm = require("gm").subClass({
	  imageMagick: true
});

const findImage = require('../utils/findimage.js');

module.exports = {
	name: 'mosaic',
	description: 'Fluttershy Will Turn an image into a mosaic',
	async run(client, message, args) { 
		
		imageUrl = await findImage(message);
	  if (imageUrl !== undefined) {
		      message.channel.startTyping(); 
		       await gm(request(imageUrl)).size((error, size) => { 
		       
		       	if(size.height > 1200 || size.width > 1200) 
		       	{
		       		message.channel.send(`t-that's way too big of an image for me!🖌️🐇`);	
		       		return;
		       	}
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
		       });
		    }
}

}