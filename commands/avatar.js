/*

 Copyright (C) 2022 programmerpony

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as
 published by the Free Software Foundation, either version 3 of the
 License, or (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <https://www.gnu.org/licenses/>.

*/

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


    // If tagged user is Chrysalis, send profile picture artwork source
    //const artwork = 'https://www.deviantart.com/mirroredsea/art/Chrysalis-718716441';
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
