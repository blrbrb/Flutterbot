

module.exports = function findImage(message) {
    return new Promise(async (resolve, reject) => {
        try {
            // if (message.attachments.size > 0) {
            //   // If message has image attachment
            //   let imgUrl = await message.attachments.first();
            //   resolve(imgUrl.proxyURL); // Resolve image URL
            // } else if (message.embeds[0] && msg.embeds[0].type == "image") {
            //   // If message has image embed
            //   let imgUrl = message.embeds[0].url;
            //   resolve(imgUrl); // Resolve image URL
            // } else {
            // Channel searching (25 messages)
            let messages = await message.channel.messages.fetch({ limit: 25 });
            let attachmentMessages = messages
                .map((message) => {
                    let attachmentURL = undefined;
                    if (message.attachments.first()) {
                        attachmentURL = message.attachments.first().proxyURL; // If message has image attachment set as URL
                    } else {
                        if (message.embeds[0] && message.embeds[0].type == "image") {
                            attachmentURL = message.embeds[0].url; // If message has image embed set as URL
                        }
                        if (message.embeds[0] && message.embeds[0].type == "gifv") {
                            attachmentURL =
                                message.embeds[0].url +
                                (message.embeds[0].url.match(/(\.gif)/gi) ? "" : ".gif"); // If message has gifv embed set as URL (Ensuring it ends with .gif)
                        }
                        if (message.embeds[0] && message.embeds[0].image != null) {
                            attachmentURL = message.embeds[0].image.url; // If message is an embed with an image
                        }
                    }
                    if (attachmentURL) return attachmentURL; // Return image URL for each message
                })
                .filter((a) => a != undefined); // Filter out messages with no image
            if (attachmentMessages[0]) {
                resolve(attachmentMessages[0]); // Resolve image URL
            } else {
                reject("No Image found");
            }
            // }
        } catch (e) {
            reject(e);
        }
    });
}
     










