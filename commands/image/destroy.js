const request = require("request");
const gm = require("gm").subClass({
  imageMagick: true
});


const findImage = require('../../utils/findimage.js');
const sendImage = require('../../utils/sendimage.js');
const clamp = require('../../utils/clamp.js');


module.exports = {
    name: 'destroy',
    description: 'Fluttershy Will Destroy an image for you',
    async execute(client, message, args)  { // eslint-disable-line no-unused-vars
  imageUrl = await findImage.imageFinder(message);
		const extension = findImage.extensionFinder(imageUrl);
  if (imageUrl !== undefined) {
    message.channel.startTyping(); 
     await gm(request(imageUrl)).size((error, size) => { 
		       
		       	if(size.height > 1200 && size.width > 1200) 
		       	{
		       		message.channel.send(`t-that's way too big of an image for me!🖌️🐇`);
		       		message.channel.stopTyping();			
		       		return;
		       	}
    gm(request(imageUrl)).implode([-2]).strip().stream((error, stdout) => {
      if (error) throw new Error(error);
      message.channel.stopTyping();
      message.channel.send({
        files: [{
          attachment: stdout,
          name: "destroy.png"
        }]
      });
    });
  });
 }
}

}