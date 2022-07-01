const request = require("request");

const gm = require("gm").subClass({
  imageMagick: true
});

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const image = await client.getImage(message).catch(error => {
    message.reply("Uhhhh... I need an image...");
    console.log(error);
  });
  const hoohCrop = tempy.file({extension: "png"});
  const hoohFlip = tempy.file({extension: "png"});
  if (image !== undefined) {
    message.channel.startTyping();
    gm(request.get(image)).gravity("South").crop(0, "50%").strip().write(hoohCrop, (error) => {
      if (error) throw new Error(error);
      gm(hoohCrop).flip().strip().write(hoohFlip, (error) => {
        if (error) throw new Error(error);
        gm(hoohFlip).append(hoohCrop).strip().stream((error, stdoutFinal) => {
          if (error) throw new Error(error);
          message.channel.stopTyping();
          message.channel.send({
            files: [{
              attachment: stdoutFinal,
              name: "hooh.png"
            }]
          });
        });
      });
    });
  }
};
