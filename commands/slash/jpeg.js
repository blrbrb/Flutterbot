require('dotenv').config();
const request = require("request");
const fs = require('fs'); 
const gm = require("gm").subClass({
  imageMagick: true
});

const findImage = require('../../utils/findimage.js');
const sendImage = require('../../utils/sendimage.js');
const clamp = require('../../utils/clamp.js');
let imageUrl;
let { attachment, embed, AttachmentBuilder } = require('discord.js');

module.exports =  {
	name: 'jpeg', 
    description: 'Fluttershy Will Jpeg-ify an image',
    options: [
        {
            type: 11,
            name: "image",
            description: "The image for Flutterhsy to add more JPEG to ",
            required: true
        }
    ],
 	async execute(Discord, client, interaction, args) { 
 	
   
          imageUrl = await interaction.options.getAttachment('image').url;
	      const extension = findImage.extensionFinder(imageUrl);

    //image.catch(
    //let extension = imageUrl.split("?")[0].split(".")[imageUrl.split(".").length - 1]; // Get extension of image
    let r = (args[0] && Number.isInteger(Number(args[0]))) ? Number(args[0]) : 10;
     let img = await gm(imageUrl, [["jpg", [clamp(r, 0, 100)]]], interaction);
   	// sendImage(interaction, "JPEG", 10, img, (extension == "gif" ? "gif" : "jpg"), false)
    if (imageUrl !== undefined) {
    	interaction.channel.sendTyping();
    	await gm(request(imageUrl)).size((error, size) => { 
    		
    		 if(size.height > 1200 && size.width > 1200) 
		     {
		       interaction.reply(`t-that's way too big of an image for me!🖌️🐇`);	
		      
		        return;
		     }
		     

    	 gm(request(imageUrl)).setFormat("jpg").quality(1).stream((error, stdout) => {
            if (error)  throw new Error(error); //console.log(error);
            
         interaction.reply({
        files: [{
          attachment: stdout,
          name: "morejpeg.jpg"
        }]
      }); 
       
    	 });
    	});
      
     }
}


    
}