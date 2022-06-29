
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


exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
    imageUrl = await findImage(message)

    //image.catch(
    let extension = imageUrl.split("?")[0].split(".")[imageUrl.split(".").length - 1]; // Get extension of image
    let r = (args[0] && Number.isInteger(Number(args[0]))) ? Number(args[0]) : 10;
     let img = await gm(imageUrl, [["jpg", [clamp(r, 0, 100)]]], message);
   	// sendImage(message, "JPEG", 10, img, (extension == "gif" ? "gif" : "jpg"), false)
    if (imageUrl !== undefined) {
        message.channel.startTyping();

        extension = await new Promise((resolve, reject) => {
            // Get extension from file type
            gm(img).format({ bufferStream: true }, function (err, format) {
                if (err) {
                    resolve(extension.toLowerCase());
                } else {
                    resolve(extensions[format] || format.toLowerCase());
                }
            });
        });

     
        gm(imageUrl).setFormat("jpg").quality(1).stream((error, stdout) => {
            if (error) throw new Error(error);
            message.channel.stopTyping();
			var writeStream = fs.createWriteStream('image.jpg');
  stdout.pipe(writeStream);
			
			
			fs

            const attachment = new MessageAttachment(
                
                "image.jpg" 
            );

		



            message.channel.send(attachment);
        });
    }
};


    
