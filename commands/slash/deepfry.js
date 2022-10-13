require('dotenv').config();
const { InteractionCollector } = require('discord.js');
const request = require("request");
const gm = require("gm").subClass({
  imageMagick: true
});
 
const findImage = require('../../utils/findimage.js');

module.exports = {
    name: 'deepfry',
    description: 'Fluttershy Will Dip your images into the deepfrier',
    options: [
        {
            type: 11,
            name: "image",
            description: "The image For Fluttershy to deepfry",
            required: true
        }
    ],
 async execute(Discord, client, interaction, debug) { 
 	

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
		   
		  if(extension == 'gif') 
		  {
		  	gm(request(imageUrl)).colorspace("RGB").out("-brightness-contrast", "30x50").setFormat("jpg").quality(1).stream((error, stdout) => {
      if (error) throw new Error(error);
     ;
      interaction.reply({
        files: [{
          attachment: stdout,
          name: "deepfry.gif"    
        }]
      });
    }); 

		  	
		  }
		 else 
		       	
    gm(request(imageUrl)).colorspace("RGB").out("-brightness-contrast", "30x50").setFormat("jpg").quality(1).stream((error, stdout) => {
      if (error) throw new Error(error);
      
      interaction.reply({
        files: [{
          attachment: stdout,
          name: "deepfry.jpg"    
        }]
      });
    }); 
     });
  }
}

}