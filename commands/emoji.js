const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "emoji",
  alias: ["jumbo"],
  admin: false,
  run: async (client, message, command, args, prefix, lang) => {

    if (!args[0] || args[0].split(':')[1] == null)
    if (message.author) return message.reply(lang.couldn_t_find_that_emoji);
    else return message.editReply({content:lang.couldn_t_find_that_emoji});

    //await message.guild.emojis;
    if (args[0].split(':')[2]!=null) {
      emoji = client.emojis.resolve(args[0].split(':')[2].replace('>',''));
    }
    emoji = client.emojis.cache.find((e) => e.name === args[0].split(':')[1]);
    if (!emoji)
    if (message.author) return message.reply(lang.couldn_t_find_that_emoji);
    else return message.editReply({content:lang.couldn_t_find_that_emoji});

    const embed = new MessageEmbed()
    .setTitle(lang.download_emoji)
    .setURL(emoji.url)
    .setImage(emoji.url);
    if (message.author) message.channel.send(embed);
    else message.editReply(embed);
  }
}
