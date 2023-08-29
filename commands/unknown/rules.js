const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'rules',
    description: "Send an embed with the server rules",
    execute(message, args, Discord) {

        //configure the rules information embed
        let embed = new MessageEmbed()
            .setTitle('Big brain common sense Rules').setColor(0xfbfb2b)
            .setDescription(`Don't be fuckin racist.  Be happy loving horse. You are all incapable toddlers, and we MUST remind you off all of the things you should already know aren't cool. Any deviations or compliants will be brutally punished by the Flutterbot AI Skynet terminators`).setThumbnail("https://i.ytimg.com/vi/ZIgo2H8LYsw/hqdefault.jpg");

        //send the embed   
        message.channel.send(embed);
    }
}