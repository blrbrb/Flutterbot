const request = require("request");
const gm = require("gm").subClass({
	  imageMagick: true
});

const findImage = require('../../utils/findimage.js');

module.exports = {
	name: 'text',
	description: 'Fluttershy Will add text to an image',
 async run(client, message, args) { // eslint-disable-line no-unused-vars
 imageUrl = await findImage.imageFinder(message);
 const extension = await findImage.extensionFinder(imageUrl); 
 console.log(extension); 
	  if (imageUrl !== undefined) {
		      message.channel.startTyping(); 
		       await gm(request(imageUrl)).size((error, size) => { 
		       
		       		       const textsizeprecent = Math.round( 4 *(size.width / 100 * size.height /100));		       console.log(textsizeprecent); 
		        const x = size.width / 100 * 21;
		       const y = size.height / 100 * 21;

		       
		       	if(size.height > 1200 && size.width > 1200) 
		       	{
		       		message.channel.send(`t-that's way too big of an image for me!🖌️🐇`);
		       		message.channel.stopTyping();	
		       		return;
		       	}            
		       	
		      	
		       	
		       	
		       	console.log(args[0]);
		       	
		      gm(request(imageUrl)).fill('#000000').font('Arial', textsizeprecent).drawText(x,y,args[0].toString()).stream((error, stdout) => {
			            if (error) throw new Error(error);
			            message.channel.stopTyping();
			            message.channel.send({
					            files: [{
							              attachment: stdout,
							              name: "text.png"
							            }]
					          });
			          });
		       });
		    }
}
}