
const request = require("request");
const fs = require('fs'); 
const gm = require("gm").subClass({
  imageMagick: true
});

const findImage = require('../utils/findimage.js');
const sendImage = require('../utils/sendimage.js');
const clamp = require('../utils/clamp.js');
let imageUrl;
let { attachment, embed, MessageAttachment } = require('discord.js');

module.exports =  {
	name: 'jpeg', 
	description: 'Fluttershy Will Jpeg-ify an image',
 	async run(client, message, args) { 
 	
    imageUrl = await findImage(message)

    //image.catch(
    let extension = imageUrl.split("?")[0].split(".")[imageUrl.split(".").length - 1]; // Get extension of image
    let r = (args[0] && Number.isInteger(Number(args[0]))) ? Number(args[0]) : 10;
     let img = await gm(imageUrl, [["jpg", [clamp(r, 0, 100)]]], message);
   	// sendImage(message, "JPEG", 10, img, (extension == "gif" ? "gif" : "jpg"), false)
    if (imageUrl !== undefined) {
    	message.channel.startTyping();
    	 gm(request(imageUrl)).setFormat("jpg").quality(1).stream((error, stdout) => {
            if (error)  throw new Error(error); //console.log(error);
            
         message.channel.send({
        files: [{
          attachment: stdout,
          name: "morejpeg.jpg"
        }]
      }); 
       
    	 });
       message.channel.stopTyping(); 
     }
}


    
}