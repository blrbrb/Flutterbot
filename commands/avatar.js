
const { MessageEmbed } = require('discord.js');
const mention2id = require('../utils/mention2id.js');

module.exports = {
  name: 'avatar',
  alias: ['pfp'],
  run: async (client, message, command, args, lang) => {

    let taggedUser =  mention2id(args[0]) || message.member.user;
    try {
      taggedUser = await message.guild.members.fetch(taggedUser)
    } catch (e) {
      try {
        taggedUser =  client.users.fetch(taggedUser);
      } catch (e) {
        if (message.author) return message.reply('couldn_t_find_that_user');
        else return message.editReply({content:lang.couldn_t_find_that_user})
      }
    }


    // If tagged user is Fluttershy, send profile picture artwork source
    //const artwork = 
    if (taggedUser.id == client.user.id)
    if (message.author) return message.channel.send(artwork);
    else return message.editReply(artwork);

    let avatarembed = new MessageEmbed()
    .setTitle(message.member.user.displayName || message.member.user.username)
    .setImage(message.member.user.displayAvatarURL({dynamic: true}))
    .setColor((message.member.user.displayHexColor && message.member.user.displayHexColor != '#000000'))
    if (message.author) return message.channel.send(avatarembed);
    else return message.editReply({embeds:[avatarembed]});

  }
}
