const request = require('request').defaults({encoding: null}); 

const imageType = require('image-type');
const imageCheck = require('file-type');

module.exports = (client) =>
{
    client.getImage = async (message) => {
        const the_channel = message.channel.id;

        // let messageList = await the_channel.fetch().sort(function (a, b) { return b.createdAt - a.createdAt }).array();

        let messageList = (await message.guild.channels.cache.get(the_channel).messages.fetch({ count: 2 })).array();
        for (const messageCheck of messageList) {
            if (messageCheck.attachments.array().length !== 0) {
                const result = await client.fileCheck(messageCheck.attachments.array()[0].url);
                if (result !== "Attachment not found") {
                    return result;
                }
            } else if (messageCheck.embeds.length !== 0) {
                if (messageCheck.embeds[0].thumbnail) {
                    const result = await client.fileCheck(messageCheck.embeds[0].thumbnail.url);
                    if (result !== "Attachment not found") {
                        return result;
                    }
                } else if (messageCheck.embeds[0].image) {
                    const result = await client.fileCheck(messageCheck.embeds[0].image.url);
                    if (result !== "Attachment not found") {
                        return result;
                    }
                }
            }
        }
    };
}