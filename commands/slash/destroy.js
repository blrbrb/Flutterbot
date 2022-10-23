require('dotenv').config();
const request = require("request");
const gm = require("gm").subClass({
  imageMagick: true
});


const findImage = require('../../utils/findimage.js');

const clamp = require('../../utils/clamp.js');






module.exports = {
    name: 'destroy',
    description: 'Fluttershy Will Destroy an image for you',
    options: [
        {
            type: 11,
            name: "image",
            description: "The image for Fluttershy to destroy",
            required: true
        }
    ],
    async execute(Discord, client, interaction, args, debug) {



        

        imageUrl = await interaction.options.getAttachment('image').url;
		const extension = findImage.extensionFinder(imageUrl);
  if (imageUrl !== undefined) {
    interaction.channel.sendTyping(); 
     await gm(request(imageUrl)).size((error, size) => { 
		       
		       	if(size.height > 1200 && size.width > 1200) 
		       	{
		       		interaction.reply(`t-that's way too big of an image for me!🖌️🐇`);
		       				
		       		return;
         }
         gm(request(imageUrl)).implode([Math.floor(Math.random() * -50)]).strip().stream((error, stdout) => {
      if (error) throw new Error(error);
    
      interaction.reply({
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