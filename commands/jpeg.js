
const request = require("request");
const gm = require("gm"); 


module.exports = {
    name: "jpeg",
    aliases: ["morejpeg",],
    category: "Image",
    description: "Flutters Will try her best to destroy your image",
    async execute(client, message, args) {

        const image = await client.getImage(message).catch(error => {
            message.reply("Could you.. please add an image for me to ruin...");
            console.log(error);
        });
        if (image !== undefined) {
            message.channel.startTyping();
            gm(request(image)).setFormat("jpg").quality(1).stream((error, stdout) => {
                if (error) throw new Error(error);
                message.channel.stopTyping();
                message.channel.send({
                    files: [{
                        attachment: stdout,
                        name: "morejpeg.jpg"
                    }]
                });
            });
        }
    }


}