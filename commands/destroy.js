const request = require("request");
const gm = require("gm").subClass({
  imageMagick: true
});


const findImage = require('../utils/findimage.js');
const sendImage = require('../utils/sendimage.js');
const clamp = require('../utils/clamp.js');

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  imageUrl = await findImage(message)
  if (imageUrl !== undefined) {
    message.channel.startTyping();
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
  }
};

