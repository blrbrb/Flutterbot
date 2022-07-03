const request = require("request");
const gm = require("gm").subClass({
  imageMagick: true
});
 
const findImage = require('../utils/findimage.js');

module.exports = {
    name: 'deepfry',
    description: 'Fluttershy Will Dip your images into the deepfrier',
 async run(client, message, args) { 
 	
 	
 imageUrl = await findImage(message);

  if (imageUrl !== undefined) {
    message.channel.startTyping();
    gm(request(imageUrl)).colorspace("RGB").out("-brightness-contrast", "30x50").setFormat("jpg").quality(1).stream((error, stdout) => {
      if (error) throw new Error(error);
      message.channel.stopTyping();
      message.channel.send({
        files: [{
          attachment: stdout,
          name: "deepfry.jpg"    
        }]
      });
    });
  }
}

}